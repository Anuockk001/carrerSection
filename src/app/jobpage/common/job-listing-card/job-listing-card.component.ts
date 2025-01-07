import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
// import {NgDialogAnimationService} from "ng-dialog-animation";
import {ShareModalComponent} from "../share-modal/share-modal.component";
import {DatePipe, NgForOf} from '@angular/common';
export interface Job {
  id: number;
  jobId: string;
  title: string;
  minExperience: number;
  maxExperience: number;
  description: string;
  notes: string;
  createdDate: number;
  updatedDate: number
  skills: Skill[];
  active: boolean;
  tentativeStartDate: string;
  duration: number;
  createdBy: CreatedBy;
  workTimeZone: string;
  status: string;
  customerContact: CustomerContact;
  createdByClient: boolean;
  jobTypes: [];
  workLocations: [];
}

export interface Skill {
  id: number;
  title: string;
  active: boolean;
}

export interface CreatedBy {
  id: number;
  firstName: string;
  theme: {
    id: number;
    name: string;
    colour: string;
    active: boolean;
    custom: boolean;
  };
  active: boolean;
}

export interface CustomerContact {
  id: number;
  createdOn: number;
  updatedOn: number;
  firstName: string;
  name: string;
  designation: string;
  email: string;
  mobile: string;
  linkedIn: string;
  vertical: string;
  spoc: {
    id: number;
    firstName: string;
    lastName: string;
    active: boolean;
  };
  customer: {
    id: number;
    customerId: string;
    companyName: string;
    ceoName: string;
    ceoContact: string;
    email: string;
    website: string;
    createdBy: {
      id: number;
      firstName: string;
      lastName: string;
      theme: {
        id: number;
        name: string;
        colour: string;
        active: boolean;
        custom: boolean;
      };
      active: boolean;
    };
    address: {
      streetAddress: string;
      postalCode: string;
      country: {
        id: number;
        name: string;
        formattedAddress: string;
      };
      state: {
        id: number;
        name: string;
        formattedAddress: string;
        stateCode: string;
        countryId: number;
      };
      city: {
        id: number;
        name: string;
        formattedAddress: string;
      };
    };
    createdDate: number;
    updateDate: number;
    active: boolean;
  };
  user: {
    id: number;
    firstName: string;
    theme: {
      id: number;
      name: string;
      colour: string;
      active: boolean;
      custom: boolean;
    };
    active: boolean;
  };
  createdBy: string;
  active: boolean;
  sentEmailStatus: boolean;
  theme: {
    id: number;
    name: string;
    colour: string;
    active: boolean;
    custom: boolean;
  };
}

@Component({
  selector: 'app-job-listing-card',
  templateUrl: './job-listing-card.component.html',
  styleUrls: ['./job-listing-card.component.css'],
  imports: [
    DatePipe,
    NgForOf
  ]
})
export class JobListingCardComponent implements OnInit {
  @Input() jobs!: Job;
  open = false;

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jobs'] && changes['jobs'].currentValue) {
      // The jobs input has changed, and we have a new value
      const newJob = changes['jobs'].currentValue;
      console.log('Job updated:', newJob);
      // You can perform any additional logic here, such as updating local state
    }
  }

  constructor(
    // public dialog: NgDialogAnimationService,
  ) {
  }

  toggleShareModal(): void {
    this.open = !this.open;
  }

  closeModal(): void {
    this.open = false;
  }

  openModal(job:any) {
    // const dialogRef = this.dialog.open(ShareModalComponent, {
    //   data: {
    //     jobId:job
    //   }
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //
    // });
  }

}
