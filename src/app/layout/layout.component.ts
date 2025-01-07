import { Component } from '@angular/core';
import {JobHeaderComponent} from "../jobpage/common/job-header/job-header.component";
import {JobFooterComponent} from '../jobpage/common/job-footer/job-footer.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    JobHeaderComponent,
    JobFooterComponent,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
