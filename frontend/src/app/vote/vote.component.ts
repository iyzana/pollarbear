import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerCreate } from '../model/answer-create';
import { SelectionValue } from '../model/enum/selection-value';
import { PollView } from '../model/poll-view';
import { VoteService } from './vote.service';

@Component({
  selector: 'app-choice',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit {
  @ViewChildren('voteOption')
  voteOptions: QueryList<ElementRef>;

  form: FormGroup;
  poll: PollView;

  SelectionValue = SelectionValue;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voteService: VoteService,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ poll }) => {
      this.poll = poll;

      let restore = this.voteService.getVoting();
      if (restore && restore.pollRef !== this.poll.ref) {
        restore = null;
      }

      const orderedSelection = restore
        ? Object.entries(restore.selection)
        : null;
      if (orderedSelection) {
        orderedSelection.sort(
          ([keyA], [keyB]) =>
            this.poll.options.findIndex(
              (option) => option.id.toString() === keyA,
            ) -
            this.poll.options.findIndex(
              (option) => option.id.toString() === keyB,
            ),
        );
      }

      console.log(orderedSelection);
      this.form = new FormGroup({
        selection: new FormArray(
          orderedSelection
            ? orderedSelection.map(([_, value]) => new FormControl(value))
            : this.poll.options.map(() => new FormControl(SelectionValue.No)),
        ),
        from: new FormControl(restore?.from),
      });
      this.form.valueChanges.subscribe(() => {
        this.voteService.setVoting(this.formToAnswer());
      });
    });
  }

  get selection(): FormArray {
    return this.form.get('selection') as FormArray;
  }

  formToAnswer(): AnswerCreate {
    const options = this.poll.options;
    const values = this.selection.value;
    const selection = {};
    options.forEach((option, idx) => {
      selection[option.id] = values[idx];
    });
    return {
      pollRef: this.poll.ref,
      selection,
      from: this.form.get('from').value,
    };
  }

  toggle(idx: number) {
    const control = this.selection.at(idx);
    const currentValue = control.value;
    const currentSelection = Object.keys(SelectionValue).indexOf(currentValue);
    const nextSelection = (currentSelection + 1) % 3;
    const nextValue = Object.keys(SelectionValue)[nextSelection];
    control.patchValue(nextValue);
  }

  vote() {
    this.router.navigate(['/']);
  }
}
