import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Food } from '../../../shared/models/food';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  @Input()
  visible = false;
  @Input()
  notFoundMessage = "Nothing Found!";
  @Input()
  resetLinkText = "Reset";
  @Input()
  resetLinkRoute = "/";
  constructor() { }

  ngOnInit(): void {
  }

}