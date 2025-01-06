// NoticePeriod and JobType Data
export const NoticePeriod = [
  { value: 'ZERO_DAYS', label: 'Immediate' },
  { value: 'SEVEN_DAYS', label: 'One Week' },
  { value: 'FIFTEEN_DAYS', label: 'Two Week' },
  { value: 'THIRTY_DAYS', label: 'One Month' },
  { value: 'THIRTY_PLUS_DAYS', label: 'More Than One Month' },
];

export const JobType = [
  { value: 'HYBRID', label: 'Hybrid' },
  { value: 'REMOTE', label: 'Remote' },
  { value: 'ONSITE', label: 'Onsite' }
];

// Field Configuration
export interface FieldConfig {
  label: string;
  name: string;
  type: 'text' | 'email' | 'number' | 'url' | 'password' | 'file' | 'dropdown' | 'autoComplete' | 'skills' | 'textarea' | 'language' | 'phoneNumber';
  placeholder: string;
  required: boolean;
  displayErrorMessage: boolean;
  options?: { value: string; label: string, id?: string, title?: string, }[];
}

export interface SectionConfig {
  section: string;
  fields: FieldConfig[];
}

export const fieldsConfig: SectionConfig[] = [
  {
    section: 'Basic Info',
    fields: [
      {
        label: 'First Name',
        name: 'firstName',
        type: 'text',
        placeholder: 'First Name',
        required: true,
        displayErrorMessage: true
      },
      {
        label: 'Last Name',
        name: 'lastName',
        type: 'text',
        placeholder: 'Last Name',
        required: false,
        displayErrorMessage: true
      },
      {
        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        required: true,
        displayErrorMessage: true
      },
      {
        label: 'Phone Number',
        name: 'phoneNumber',
        type: 'phoneNumber',
        placeholder: 'Phone Number',
        required: true,
        displayErrorMessage: true
      },
    ],
  },
  {
    section: 'Address',
    fields: [{
      label: 'Current City',
      name: 'currentCity',
      type: 'autoComplete',
      placeholder: 'Current City',
      required: true,
      displayErrorMessage: true
    }],
  },
  {
    section: 'Professional Information',
    fields: [
      {
        label: 'Job Title',
        name: 'jobTitle',
        type: 'text',
        placeholder: 'Job Title',
        required: true,
        displayErrorMessage: true
      },
      {
        label: 'Experience Years',
        name: 'experienceYears',
        type: 'number',
        placeholder: 'Experience Years',
        required: true,
        displayErrorMessage: true
      },
      {
        label: 'Experience Months',
        name: 'experienceMonths',
        type: 'number',
        placeholder: 'Experience Months',
        required: true,
        displayErrorMessage: true
      },
      {
        label: 'Primary Skills',
        name: 'primarySkills',
        type: 'skills',
        placeholder: 'Primary Skills',
        required: false,
        displayErrorMessage: true
      },
      {
        label: 'Job Type',
        name: 'jobType',
        type: 'dropdown',
        placeholder: 'Job Type',
        required: true,
        displayErrorMessage: true,
        options: JobType
      },
      {
        label: 'Notice Period',
        name: 'noticePeriod',
        type: 'dropdown',
        placeholder: 'Notice Period',
        required: true,
        displayErrorMessage: true,
        options: NoticePeriod
      },
      {
        label: 'Current CTC',
        name: 'currentCTC',
        type: 'number',
        placeholder: 'Current CTC',
        required: true,
        displayErrorMessage: true
      },
      {
        label: 'Expected CTC',
        name: 'expectedCTC',
        type: 'number',
        placeholder: 'Expected CTC',
        required: true,
        displayErrorMessage: true
      },
    ],
  },
  {
    section: 'Socials',
    fields: [{
      label: 'LinkedIn URL',
      name: 'linkedinUrl',
      type: 'url',
      placeholder: 'LinkedIn URL',
      required: true,
      displayErrorMessage: true
    }],
  },
  {
    section: 'Attachments',
    fields: [{
      label: 'Resume',
      name: 'resume',
      type: 'file',
      placeholder: 'Upload Resume',
      required: true,
      displayErrorMessage: true
    }],
  },
  {
    section: 'Others',
    fields: [{
      label: 'Rate Your English Communication Skills',
      name: 'language',
      type: 'language',
      placeholder: '',
      required: false,
      displayErrorMessage: true
    }],
  },
  {
    section: 'Notes',
    fields: [{
      label: 'Notes',
      name: 'notes',
      type: 'textarea',
      placeholder: 'Notes',
      required: false,
      displayErrorMessage: true
    }],
  },
];
