import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';

export const experienceRanges: { [key: string]: { min: number; max: number } } = {
  '0-1 years': { min: 0, max: 1 },
  '1-3 years': { min: 1, max: 3 },
  '3-5 years': { min: 3, max: 5 },
  '5-8 years': { min: 5, max: 8 },
  '8-10 years': { min: 8, max: 10 },
  '10+ years': { min: 10, max: Infinity },
};

@Component({
  selector: 'app-job-filters',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class JobFiltersComponent implements OnInit {
  @Input() jobTypes: string[] = [];
  @Input() workLocations: string[] = [];
  @Input() selectedRanges: { min: number; max: number }[] = [];
  @Output() filterChange = new EventEmitter<{
    jobTypes: string[];
    workLocations: string[];
    experienceRanges: { min: number; max: number }[];
  }>();

  localJobTypes: string[] = [];
  localWorkLocations: string[] = [];
  localSelectedRanges: { min: number; max: number }[] = [];

  ngOnInit(): void {
    this.localJobTypes = [...this.jobTypes];
    this.localWorkLocations = [...this.workLocations];
    this.localSelectedRanges = [...this.selectedRanges];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jobTypes']) {
      this.localJobTypes = [...this.jobTypes];
    }
    if (changes['workLocations']) {
      this.localWorkLocations = [...this.workLocations];
    }
    if (changes['selectedRanges']) {
      this.localSelectedRanges = [...this.selectedRanges];
    }
  }

  handleJobTypeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const { checked, value } = target;
    this.localJobTypes = checked
      ? [...this.localJobTypes, value]
      : this.localJobTypes.filter((type) => type !== value);

    this.emitFilterChange();
  }

  handleWorkLocationChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const { checked, value } = target;
    this.localWorkLocations = checked
      ? [...this.localWorkLocations, value]
      : this.localWorkLocations.filter((location) => location !== value);

    this.emitFilterChange();
  }

  handleExperienceRangeChange(event: Event, rangeKey: string): void {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;
    const rangeObject = experienceRanges[rangeKey];

    this.localSelectedRanges = isChecked
      ? [...this.localSelectedRanges, rangeObject]
      : this.localSelectedRanges.filter(
        (item) => item.min !== rangeObject.min || item.max !== rangeObject.max
      );

    this.emitFilterChange();
  }

  private emitFilterChange(): void {
    this.filterChange.emit({
      jobTypes: this.localJobTypes,
      workLocations: this.localWorkLocations,
      experienceRanges: this.localSelectedRanges,
    });
  }

  // Method to get all experience keys
  experienceKeys() {
    return Object.keys(experienceRanges);
  }

  // Check if the experience range is selected
  isRangeSelected(range: string) {
    // const rangeObject = experienceRanges[range];
    // return this.localSelectedRanges.some(
    //   (item) => item.min === rangeObject.min && item.max === rangeObject.max
    // );
  }

  protected readonly Object = Object;
  protected readonly experienceRanges = experienceRanges;
}
