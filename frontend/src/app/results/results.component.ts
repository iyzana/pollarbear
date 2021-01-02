import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  faCheckSquare,
  faCircleNotch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { pluck } from 'rxjs/operators';
import { OptionKind } from '../model/enum/option-kind';
import { SecrecyKind } from '../model/enum/secrecy-kind';
import { SelectKind } from '../model/enum/select-kind';
import { SelectionValue } from '../model/enum/selection-value';
import { PollView } from '../model/poll-view';
import { Result } from './result.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  poll: PollView;
  results: Result[] = [];

  SelectKind = SelectKind;
  OptionKind = OptionKind;
  SecrecyKind = SecrecyKind;
  faTimes = faTimes;
  faCircleNotch = faCircleNotch;
  faCheckSquare = faCheckSquare;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.pipe(pluck('poll')).subscribe((poll) => {
      this.poll = poll;
      this.results = this.computeResults(poll);
    });
  }

  computeResults(poll: PollView): Result[] {
    const options = poll.options;

    return options.map((option) => {
      const yes = poll.answers
        .filter(({ selection }) => selection[option.id] === SelectionValue.Yes)
        .map(({ from }) => from);
      const no = poll.answers
        .filter(({ selection }) => selection[option.id] === SelectionValue.No)
        .map(({ from }) => from);
      const maybe = poll.answers
        .filter(
          ({ selection }) => selection[option.id] === SelectionValue.Maybe,
        )
        .map(({ from }) => from);
      return {
        ...option,
        yes,
        no,
        maybe,
      };
    });
  }
}
