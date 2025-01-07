import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {convertToWords} from "../../common/function";
// import {CountryISO, PhoneNumberFormat, SearchCountryField} from "ngx-intl-tel-input";
import {fieldsConfig} from "../common/jobFileds/jobFileds";
import {JobTopSectionComponent} from '../common/job-top-section/job-top-section.component';
import {DatePipe, NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {ApiService} from '../../others/api.service';

@Component({
  selector: 'app-job-apply',
  templateUrl: './job-apply.component.html',
  imports: [
    JobTopSectionComponent,
    DatePipe,
    ReactiveFormsModule,
    NgStyle,
    NgForOf,
    NgClass,
    NgIf,
    FormsModule,
  ],
  styleUrls: ['./job-apply.component.css']
})
export class JobApplyComponent implements OnInit {
  form!: FormGroup;
  fieldsConfig = fieldsConfig;
  post: any = {};
  open = false;
  jobId: number | null = null;
  private routeSub!: Subscription;
  @ViewChild('dropdown') dropdownRef!: ElementRef;
  @ViewChild('dropdownSkills') dropdownSkillRef!: ElementRef;
  inputValue: string = '';
  filteredSuggestions: any[] = [];
  filteredSkillSuggestions: any[] = [];
  isDropdownOpen: boolean = false;
  isSkillDropdownOpen: boolean = false;
  convertToWords = convertToWords;
  file: File | null = null;
  value: number = 5;
  skillsRes:any
  // preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  // SearchCountryField = SearchCountryField;
  // CountryISO = CountryISO;
  // PhoneNumberFormat = PhoneNumberFormat;
  MAX_FILE_SIZE = 1048576;
  inputControl = new FormControl('');
  selectedItems: any[] = [];
  selectedSkillItems: { id: number; title: string; level: string; index: number }[] = [];
  selectedLevel: string = 'master';
  constructor(
    private fb: FormBuilder,
    private service: ApiService,
    private route: ActivatedRoute,
    private elRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.initializeForm();
    this.getSkills();
    this.routeSub = this.route.params.subscribe((params) => {
      const newJobId = +params['jobId'];
      if (newJobId !== this.jobId) {
        this.jobId = newJobId;
        this.fetchJob(this.jobId);
      }
    });
  }

  handleItemSelect(item: any): void {
    this.inputValue = item.name;
    this.isDropdownOpen = false;
    const control = this.form.get('currentCity');
    if (control) {
      control.setValue(item.name);
    }
  }

  // @HostListener('document:click', ['$event'])
  // onClickOutside(event: MouseEvent): void {
  //   const target = event.target as HTMLElement;
  //   if (!this.dropdownRef.nativeElement.contains(target)) {
  //     this.isDropdownOpen = false;
  //   }
  //   if (!this.dropdownSkillRef.nativeElement.contains(target)) {
  //     this.isSkillDropdownOpen = false;
  //   }
  // }

  handleSkillSelect(skill: any, index: number): void {
    if (!this.selectedSkillItems.some((selected) => selected.id === skill.id)) {
      this.selectedSkillItems.push({ ...skill, level: this.selectedLevel, index }); // Store index of selection
      // Remove the selected skill from the dropdown list
      this.filteredSkillSuggestions = this.filteredSkillSuggestions.filter((s) => s.id !== skill.id);
    }
  }

  removeSkill(skillId: number): void {
    const removedSkill = this.selectedSkillItems.find((skill) => skill.id === skillId);
    if (removedSkill) {
      this.selectedSkillItems = this.selectedSkillItems.filter((skill) => skill.id !== skillId);
      // Add the removed skill back to the dropdown at its original position
      this.filteredSkillSuggestions.splice(removedSkill.index, 0, removedSkill); // Insert at original index
    }
  }


  handleLevelChange(level: string): void {
    this.selectedLevel = level;
  }

  getSkillColor(level: string): string {
    switch (level) {
      case 'master':
        return 'tw-bg-green-500 tw-text-green-600';
      case 'intermediate':
        return 'tw-bg-blue-500 tw-text-blue-600';
      case 'beginner':
        return 'tw-bg-red-500 tw-text-red-600';
      default:
        return '';
    }
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  fetchJob(id: number): void {
    this.service.careerPost(id).subscribe(
      (response: any) => {this.post = response},
      (error) => {
        console.error(error);
      }
    );
  }

  initializeForm(): void {
    this.fieldsConfig.forEach(section => {
      section.fields.forEach(field => {
        const validators = field.required ? [Validators.required] : [];
        this.form.addControl(field.name, this.fb.control('', validators));
      });
    });
  }

  isInvalidControl(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control?.invalid && control?.touched);
  }

  onSubmit(): void {
    console.log(this.form);
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  skillLevels = [
    { id: 'master', label: 'Master', color: 'tw-bg-green-600' },
    { id: 'intermediate', label: 'Intermediate', color: 'tw-bg-yellow-600' },
    { id: 'beginner', label: 'Beginner', color: 'tw-bg-red-600' },
  ];

  handleInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.inputValue = value;
    if (value.trim().length > 0) {
      this.isDropdownOpen = true;
      this.getCities(value);
    } else {
      this.filteredSuggestions = [];
      this.isDropdownOpen = false;
    }
  }

  handleSkillInputChange(event: any): void {
    const inputValue = event.target.value.toLowerCase();
    if (inputValue) {
      this.filteredSkillSuggestions = this.skillsRes.filter((skill:any) =>
        skill.title.toLowerCase().includes(inputValue)
      );
    } else {
      this.filteredSkillSuggestions = [...this.skillsRes];
    }
  }

  getCities(query: string): void {
    this.service.getAllConsumerCities(query).subscribe(res => {
      this.filteredSuggestions = res;
    });
  }

  getSkills() {
    this.service.getSkillsConsumer().then((res) => {
      this.skillsRes = res;
      this.filteredSkillSuggestions = res;
    });
  }

  async uploadFile(file: File): Promise<void> {
    this.service.uploadResume(file).subscribe((res)=>{
    },error => { })
  }

  handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const selectedFile = input.files[0];
      if (selectedFile.size > this.MAX_FILE_SIZE) return;
      this.file = selectedFile;
      this.uploadFile(selectedFile);
    }
  }

  handleDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const droppedFile = event.dataTransfer.files[0];
      if (droppedFile.size > this.MAX_FILE_SIZE) return;
      this.file = droppedFile;
      this.uploadFile(droppedFile);
    }
  }

  handleDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  handleDragLeave(event: DragEvent): void {
    event.preventDefault();
  }

  getLabel(value: number): string {
    if (value >= 8) {
      return 'Excellent';
    } else if (value >= 5) {
      return 'Good';
    } else if (value >= 3) {
      return 'Average';
    } else {
      return 'Poor';
    }
  }
}
