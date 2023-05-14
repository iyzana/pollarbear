import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerCreate } from '../model/answer-create';
import { OptionKind } from '../model/enum/option-kind';
import { SecrecyKind } from '../model/enum/secrecy-kind';
import { SelectKind } from '../model/enum/select-kind';
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

  form: FormGroup<{
    selection: FormArray;
    from: FormControl<string>;
  }>;
  poll: PollView;

  // make enums available in template
  SelectionValue = SelectionValue;
  SecrecyKind = SecrecyKind;
  SelectKind = SelectKind;

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

      this.form = new FormGroup({
        selection: new FormArray(
          orderedSelection
            ? orderedSelection.map(([_, value]) => new FormControl(value))
            : this.poll.options.map(() => new FormControl(SelectionValue.No)),
        ),
        from: new FormControl(
          restore?.from,
          this.poll.secrecyKind === SecrecyKind.Open
            ? Validators.required
            : null,
        ),
      });
      this.form.valueChanges.subscribe(() => {
        this.voteService.setVoting(this.formToAnswer());
      });
    });
  }

  get selection(): FormArray {
    return this.form.controls.selection;
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

  toggleSelection(idx: number): void {
    const selection = this.selection;
    const control = selection.at(idx);
    const numOptions = this.poll.optionKind === OptionKind.YesNo ? 2 : 3;

    const currentValue = control.value;
    const currentSelection = Object.keys(SelectionValue).indexOf(currentValue);
    const nextSelection = (currentSelection + 1) % numOptions;
    const nextValue = Object.keys(SelectionValue)[nextSelection];

    if (this.poll.selectKind === SelectKind.Single) {
      selection.setValue(new Array(selection.length).fill(SelectionValue.No));
      if (nextValue === SelectionValue.No) {
        control.patchValue(SelectionValue.Yes);
      } else {
        control.patchValue(nextValue);
      }
    } else if (this.poll.selectKind === SelectKind.Multiple) {
      control.patchValue(nextValue);
    }
  }

  onClick(idx: number): void {
    this.toggleSelection(idx);
  }

  onKey(event: KeyboardEvent, idx: number): void {
    console.log(event.key);
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleSelection(idx);
    }
  }

  vote(): void {
    this.form.disable();
    this.voteService.vote(this.formToAnswer()).subscribe({
      next: () => {
        this.router.navigate(['/results', this.poll.ref]);
      },
      error: () => this.form.enable(),
    });
  }
}
