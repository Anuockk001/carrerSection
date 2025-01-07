import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from '../others/api.service';
import {JobHeaderComponent} from './common/job-header/job-header.component';
import {JobTopSectionComponent} from './common/job-top-section/job-top-section.component';
import {JobFiltersComponent} from './common/job-filter/job-filter.component';
import {JobListingCardComponent} from './common/job-listing-card/job-listing-card.component';
import {PaginationComponent} from './common/pagination/pagination.component';
import {ConnectNowComponent} from './common/connect-now/connect-now.component';
import {JobFooterComponent} from './common/job-footer/job-footer.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'jobpage',
  templateUrl: './jobpage.component.html',
  styleUrls: ['./jobpage.component.css'],
  standalone: true,
  imports: [
    JobHeaderComponent,
    JobTopSectionComponent,
    JobFiltersComponent,
    JobListingCardComponent,
    PaginationComponent,
    ConnectNowComponent,
    JobFooterComponent,
    CommonModule
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class JobpageComponent implements OnInit {
  filtersVisible = true;
  mobileFiltersVisible = false;
  jobs: any[] = [];
  page = 0;
  size = 8;
  totalPages = 1;
  totalElements = 0;
  query = '';
  jobTypes: string[] = [];
  workLocations: string[] = [];
  selectedRanges:[] = [];
  data = {
    heading: 'Work with us',
    description: 'Build your future with a team that values your talent.',
    displayInput: true,
  };
  constructor(
    private service: ApiService,
    private router: Router,
              ) {}

  ngOnInit() {
    this.fetchJobs();
  }

  fetchJobs() {
    this.service.careerPosts(this.page, this.size, this.query,this.selectedRanges ?? [], this.jobTypes, this.workLocations, )
      .subscribe((response:any) => {
        this.jobs = response.content;
        this.totalPages = response.page.totalPages;
        this.page = response.page.number;
        this.size = response.page.size;
        this.totalElements = response.page.totalElements;
      });
  }

  handleFilterChange(filters: any) {
    this.jobTypes = filters.jobTypes;
    this.workLocations = filters.workLocations;
    this.selectedRanges = filters.experienceRanges;
    this.fetchJobs();
  }

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  toggleMobileFilters() {
    this.mobileFiltersVisible = !this.mobileFiltersVisible;
  }

  handleQueryChange(query: string): void {
    console.log('Search Query:', query);
    // Implement search functionality
  }


  handlePageChange(newPage: number) {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.fetchJobs();
    }
  }

  onFilterChange(filters: { jobTypes: string[]; workLocations: string[]; experienceRanges: { min: number; max: number }[] }) {
    console.log('Filters:', filters);
  }

  handleNavigate(id: any) {
    this.router.navigate([`/job`, id]);
  }

}
