import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../shared/models/food';

//import { AppModule } from '../../../app.component';
import { SearchComponent } from '../../partials/search/search.component'; 
import { TagsComponent } from '../../partials/tags/tags.component';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { Tag } from '../../../shared/models/Tag'; 
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { StarRatingComponent } from '../../partials/star-rating/star-rating.component';

//import { AppRoutingModule } from "../../../app.routes";


@Component({
    selector: 'app-home',
    standalone: true,
    imports: [SearchComponent, RouterLink, TagsComponent, NotFoundComponent, 
      ToastrModule, CommonModule, StarRatingComponent],
    providers: [HttpClient],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {
    let foodsObservable:Observable<Food[]>;
    
    activatedRoute.params.subscribe((params) => {
      
      if (params.searchTerm)
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      else if (params.tag)
        foodsObservable = this.foodService.getAllFoodsByTag(params.tag);
      else 
        foodsObservable = foodService.getAll(); 

      foodsObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      })
    })
  }

  ngOnInit(): void {
  }

}
