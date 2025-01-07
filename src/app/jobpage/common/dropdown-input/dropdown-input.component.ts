import {Component, Input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-dropdown-input',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass,
    NgForOf
  ],
  templateUrl: './dropdown-input.component.html',
  styleUrl: './dropdown-input.component.css'
})
export class DropdownInputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() control!: FormControl;
  @Input() options: any[] = [];
  @Input() required: boolean = false;

  get isInvalid() {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }
}
