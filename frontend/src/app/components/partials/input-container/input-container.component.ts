import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../text-input/text-input.component';

@Component({
  selector: 'input-container',
  standalone: true,
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css'],
  imports: [CommonModule, TextInputComponent]
})
export class InputContainerComponent implements OnInit {

  @Input()
  label!:string;
  @Input()
  bgColor = 'white';

  constructor() { }

  ngOnInit(): void {
  }

}