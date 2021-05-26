import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommerceService } from '../commerce.service';
import { Order } from '../order';
import { PlacedOrder } from '../placedOrder';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private commerservice:CommerceService,private router:Router) { }

  public orderlist:Order[]
  public discount:number;
  public total:number;
  public discounted:number;
  public address1:string;
  public address2:string;
  public orderDetails:PlacedOrder={name:'',address:'',city:'',product:[],amount:0};
  ngOnInit(): void {
    this.orderlist=this.commerservice.orderList;
    this.discount=this.commerservice.discountAmount;
    this.total=this.commerservice.totalamount;
    this.discounted=this.commerservice.discountedamount;
  }

  placeOrder(){
    this.orderDetails.product=this.orderlist;
    this.orderDetails.address=this.address1.concat(" " +this.address2);
    this.orderDetails.amount=this.commerservice.discountedamount;
    this.commerservice.placeOrder(this.orderDetails).subscribe();
    this.router.navigateByUrl('/order-successful');
  }
}
