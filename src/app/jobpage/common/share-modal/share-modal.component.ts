import {Component, Inject, OnInit} from '@angular/core';
// import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./share-modal.component.css']
})
export class ShareModalComponent implements OnInit {
  copyLink: string = '';
  buttonText: string = 'Copy Link';

  constructor(
      // @Inject(MAT_DIALOG_DATA) public data: any,
      // private dialogRef: MatDialogRef<ShareModalComponent>
  ) {
  }

  ngOnInit(): void {
    this.setCopyLink();
  }

  ngOnChanges(): void {
    this.setCopyLink();
    // console.log('data',this.data)
  }

  private setCopyLink(): void {
    // const baseUrl = environment.url;
    // this.copyLink = `${baseUrl}job/${this.data.jobId}`;
  }

  copyToClipboard(): void {
    navigator.clipboard
        .writeText(this.copyLink)
        .then(() => {
          this.buttonText = 'Copied!';
          setTimeout(() => (this.buttonText = 'Copy Link'), 2000);
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
  }

  shareOnWhatsApp(): void {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(this.copyLink)}`;
    window.open(whatsappUrl, '_blank');
  }

  shareOnLinkedIn(): void {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.copyLink)}`;
    window.open(linkedInUrl, '_blank');
  }

  closeModal(): void {
    // this.dialogRef.close();
  }
}
