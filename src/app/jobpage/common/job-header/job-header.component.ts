import { Component, OnInit } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-job-header',
  templateUrl: './job-header.component.html',
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  styleUrls: ['./job-header.component.css']
})
export class JobHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
