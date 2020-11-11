import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
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

  constructor(private createService: CreateService) {}

  ngOnInit(): void {
    const restoreOptions: OptionCreate[] = JSON.parse(
      localStorage.getItem('pollCreate_optionsSimple') || '[]',
    );

    this.form = new FormGroup({
      options: new FormArray(
        restoreOptions.map(
          (option) => new FormGroup({ text: new FormControl(option.text) }),
        ),
      ),
    });
    this.form.valueChanges.subscribe(() => {
      this.removeEmptyOptions();
      this.addEmptyOption();
    });
    this.addEmptyOption();
  }

  ngAfterViewInit(): void {
    this.removeEmptyOptions();
    (this.optionInputs.last as any).nativeElement.focus();
  }

  ngOnDestroy(): void {
    localStorage.setItem(
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
      ...JSON.parse(localStorage.getItem('pollCreate')),
      answerKind: AnswerKind.Simple,
      options: this.form
        .get('options')
        .value.filter((option) => option.text.trim() !== ''),
    };
    this.createService.createPoll(pollCreate).subscribe((response) => {
      localStorage.clear();
      console.log('creating poll successful', response);
    });
  }
}
