import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import {ShareModalComponent} from "../common/share-modal/share-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.css']
})
export class JobDescriptionComponent implements OnInit {
  post: any = {};
  open = false;
  jobId: number | null = null;
  private routeSub: Subscription;

  constructor(
    private service: ApiService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      const newJobId = +params['jobId'];
      if (newJobId !== this.jobId) {
        this.jobId = newJobId;
        this.fetchJob(this.jobId);
      }
    });
  }


  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  fetchJob(id: number): void {
    this.service.careerPost(id).subscribe(
      (response: any) => {
        this.post = response;
        console.log(this.post);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openModal(job:any) {
    const dialogRef = this.dialog.open(ShareModalComponent, {
      data: {
        jobId:job
      }
    });
    dialogRef.afterClosed().subscribe((result) => {

    });
  }
}
