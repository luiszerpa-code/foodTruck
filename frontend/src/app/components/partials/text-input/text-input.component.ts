import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { InputContainerComponent } from '../input-container/input-container.component';
import { InputValidationComponent } from '../input-validation/input-validation.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'text-input',
  standalone: true,
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  imports: [CommonModule, InputContainerComponent, InputValidationComponent, ReactiveFormsModule]
})
export class TextInputComponent implements OnInit {
@Input()
control!:AbstractControl;
@Input()
showErrorsWhen:boolean = true;
@Input()
label!: string;
@Input()
type: 'text' | 'password' | 'email' = 'text';

get formControl(){
  return this.control as FormControl;
}
  constructor() { }

  ngOnInit(): void {
  }

}