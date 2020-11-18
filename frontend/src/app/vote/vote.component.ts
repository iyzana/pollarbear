import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollView } from '../model/poll-view';

@Component({
  selector: 'app-choice',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit {
  @ViewChildren('voteOption')
  voteOptions: QueryList<ElementRef>;

  poll: PollView;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ poll }) => (this.poll = poll));
  }

  toggle(optionId: number) {
    const input = this.voteOptions.find(
      (e) => e.nativeElement.id === `option-${optionId}`,
    );
    console.log('toggle');
    input.nativeElement.checked = !input.nativeElement.checked;
  }
}
