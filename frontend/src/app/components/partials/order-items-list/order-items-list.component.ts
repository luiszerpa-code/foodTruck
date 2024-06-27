import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'order-items-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  providers: [HttpClient],
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.css']
})
export class OrderItemsListComponent implements OnInit {

  @Input()
  order!:Order;
  constructor() { }

  ngOnInit(): void {
  }

}