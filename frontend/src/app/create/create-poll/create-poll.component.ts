import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss'],
})
export class CreatePollComponent implements OnInit {
  now = new Date().toISOString().split('T')[0];

  group: FormGroup;
  advanced = false;

  constructor() {}

  ngOnInit(): void {
    this.group = new FormGroup({
      title: new FormControl('', Validators.required),
      results: new FormControl('Top'),
    });
  }
}
