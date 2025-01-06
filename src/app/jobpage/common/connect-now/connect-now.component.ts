import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

interface FormData {
  name: string;
  email: string;
  company: string;
  mobile: string;
  message: string;
}

export interface ConnectNowData {
  section: string;
  heading: string;
  description: string;
  buttonText: string;
}

@Component({
  selector: 'app-connect-now',
  templateUrl: './connect-now.component.html',
  styleUrls: ['./connect-now.component.css'],
})

export class ConnectNowComponent {
  @Input() data!: ConnectNowData;

  isModalOpen = false;

  constructor(private router: Router) {}

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  handleModalSubmit(formData: FormData): void {
    console.log('Form Submitted:', formData);
    this.closeModal();
  }

  handleButtonClick(): void {
    if (this.data.section === 'jobListing') {
      this.router.navigate(['/job/apply']);
    } else {
      this.openModal();
    }
  }
}
