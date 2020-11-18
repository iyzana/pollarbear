import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollView } from '../model/poll-view';

@Component({
  selector: 'app-choice',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit {
  poll: PollView;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ poll }) => (this.poll = poll));
  }
}
