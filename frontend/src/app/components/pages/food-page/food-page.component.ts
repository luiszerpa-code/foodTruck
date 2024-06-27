import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../shared/models/food';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';


@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [CommonModule, NotFoundComponent, RouterLink, StarRatingComponent],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css'
})
export class FoodPageComponent implements OnInit{
  food!: Food;
  constructor(activatedRoute:ActivatedRoute, foodService:FoodService, 
    private cartService:CartService, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if(params.id)
        foodService.getFoodById(params.id).subscribe(serverFood => {
          this.food = serverFood;
        });
    })
   }

  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}

