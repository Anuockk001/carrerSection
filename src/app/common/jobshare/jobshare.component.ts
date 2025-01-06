import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-jobshare',
  templateUrl: './jobshare.component.html',
  styleUrls: ['./jobshare.component.css']
})
export class JobshareComponent implements OnInit {
  copyLink: string = '';
  buttonText: string = 'Copy Link';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<JobshareComponent>
  ) {
  }

  ngOnInit(): void {
    this.setCopyLink();
  }

  ngOnChanges(): void {
    this.setCopyLink();
  }

  private setCopyLink(): void {
    const baseUrl = environment.shareUrl;
    this.copyLink = `${baseUrl}apply/${this.data}`;
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
    this.dialogRef.close();
  }
}
