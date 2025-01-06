import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
interface Data {
  heading: string;
  description: string;
  inputPlaceHolder?: string;
  displayInput?: boolean;
}

@Component({
  selector: 'app-job-top-section',
  templateUrl: './job-top-section.component.html',
  styleUrls: ['./job-top-section.component.css']
})
export class JobTopSectionComponent implements OnInit {
  @Input() data!: Data;
  @Output() queryChange = new EventEmitter<string>();
    @Input() heading!: string | undefined | null | HTMLTitleElement | SVGTitleElement;
  @Input() description!: any;

  onQueryChange(query: string): void {
    this.queryChange.emit(query);
  }

  ngOnInit(): void {
  }

}
