import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodService } from '../../../services/food.service'; 
import { Tag } from '../../../shared/models/Tag'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule],
  providers: [HttpClient],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags?:Tag[];
  constructor(foodService:FoodService) {
    foodService.getAllTags().subscribe(serverTags => {
      this.tags = serverTags
    });
   }

  ngOnInit(): void {
  }

}
