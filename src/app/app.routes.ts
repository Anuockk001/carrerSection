import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { JobpageComponent } from './jobpage/jobpage.component';
import { JobDescriptionComponent } from './jobpage/job-description/job-description.component';
import { JobApplyComponent } from './jobpage/job-apply/job-apply.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'job', component: JobpageComponent },
      { path: 'job/:jobId', component: JobDescriptionComponent },
      { path: 'job/:jobId/apply', component: JobApplyComponent },
    ],
  },
];
