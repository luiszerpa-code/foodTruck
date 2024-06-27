import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { Order } from '../../../shared/models/Order';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../partials/title/title.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderItemsListComponent } from '../../partials/order-items-list/order-items-list.component';
import { MapComponent } from '../../partials/map/map.component';


@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TitleComponent,
    TextInputComponent, DefaultButtonComponent, RouterLink, OrderItemsListComponent, MapComponent],
  providers: [HttpClient],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  order:Order = new Order();
  checkoutForm!: FormGroup;
  constructor(cartService:CartService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private toastrService: ToastrService) {
                const cart = cartService.getCart();
                this.order.items = cart.items;
                this.order.totalPrice = cart.totalPrice;
              }

  ngOnInit(): void {
    let {name, address} = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name:[name, Validators.required],
      address:[address, Validators.required]
    });
  }

  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder(){
    if(this.checkoutForm.invalid){
      this.toastrService.warning('Please fill the inputs', 'Invalid Inputs');
      return;
    }

    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    console.log(this.order);
  }
}