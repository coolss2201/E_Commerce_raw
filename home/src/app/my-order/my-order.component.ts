import { Component, OnInit } from '@angular/core';
import { CommerceService } from '../commerce.service';
import { PlacedOrder } from '../placedOrder';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
})
export class MyOrderComponent implements OnInit {
  constructor(private commerceservice: CommerceService) {}
  public orders: PlacedOrder[];
  ngOnInit(): void {
    this.commerceservice.getorders().subscribe(
      data=>{
        this.orders=data;
      }
    )
  }
}
