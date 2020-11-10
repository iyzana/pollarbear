import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-options',
  templateUrl: './create-options.component.html',
  styleUrls: ['./create-options.component.scss'],
})
export class CreateOptionsComponent implements OnInit {
  title: string;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.title = JSON.parse(localStorage.getItem('pollCreate')).title;
  }
}
