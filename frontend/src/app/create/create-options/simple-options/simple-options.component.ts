import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AnswerKind } from '../../../model/enum/answer-kind';
import { OptionCreate } from '../../../model/option-create';
import { PollCreate } from '../../../model/poll-create';
import { CreateService } from '../../create.service';

@Component({
  selector: 'app-simple-options',
  templateUrl: './simple-options.component.html',
  styleUrls: ['./simple-options.component.scss'],
})
export class SimpleOptionsComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('optionInput')
  optionInputs: QueryList<HTMLElement>;
  form: FormGroup;

  constructor(private createService: CreateService, private router: Router) {}

  ngOnInit(): void {
    const restore: OptionCreate[] = JSON.parse(
      sessionStorage.getItem(CreateService.POLL_CREATE_OPTIONS_SIMPLE) || '[]',
    );

    this.form = new FormGroup({
      options: new FormArray(
        restore.map(
          (option) => new FormGroup({ text: new FormControl(option.text) }),
        ),
      ),
    });
    this.form.valueChanges.subscribe(() => {
      this.removeEmptyOptions();
      this.addEmptyOption();
    });
    this.addEmptyOption();

    const poll = this.createService.getPollInCreation();
    poll.answerKind = AnswerKind.Simple;
    this.createService.setPollInCreation(poll);
  }

  ngAfterViewInit(): void {
    this.removeEmptyOptions();
    (this.optionInputs.last as any).nativeElement.focus();
  }

  ngOnDestroy(): void {
    sessionStorage.setItem(
      'pollCreate_optionsSimple',
      JSON.stringify(this.options.value),
    );
  }

  get options(): FormArray {
    return this.form.get('options') as FormArray;
  }

  removeEmptyOptions() {
    const options = this.options;
    const emptyOptions = [];

    const penultimate =
      options.length > 1 ? options.at(options.length - 2) : null;

    for (let i = 0; i < options.length; i++) {
      const option = options.at(i);

      if (
        option.value.text === '' &&
        (i !== options.length - 1 ||
          (penultimate && penultimate.value.text === '')) &&
        (this.optionInputs.toArray()[i] as any).nativeElement !==
          document.activeElement
      ) {
        emptyOptions.push(i);
      }
    }
    emptyOptions.reverse();
    emptyOptions.forEach((emptyOption) => options.removeAt(emptyOption));
  }

  addEmptyOption() {
    const options = this.options;
    if (
      options.length === 0 ||
      options.at(options.length - 1).value.text !== ''
    ) {
      options.push(
        new FormGroup({
          text: new FormControl(''),
        }),
      );
    }
  }

  createPoll() {
    const pollCreate: PollCreate = {
      ...this.createService.getPollInCreation(),
      options: this.form
        .get('options')
        .value.filter((option: OptionCreate) => option.text.trim() !== ''),
    };
    this.createService.createPoll(pollCreate).subscribe((response) => {
      sessionStorage.clear();
      console.log('creating poll successful', response);
      this.router.navigate(['vote', response.ref]);
    });
  }
}
