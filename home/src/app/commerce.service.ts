import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order';
import { PlacedOrder } from './placedOrder';
import { Product } from './product';
import { Profile } from './profile';

@Injectable({
  providedIn: 'root',
})
export class CommerceService {
  public url: string = 'http://localhost:4000/';
  getallurl = this.url + 'getall';
  getcarturl = this.url + 'getcart';
  addtocartUrl = this.url + 'addtocart';
  removecartUrl = this.url + 'removecart';
  addnewUrl = this.url + 'addnew';
  deleteUrl = this.url + 'delete';
  editUrl = this.url + 'edit';
  placeOrderUrl = this.url + 'placeOrder';
  getOrderUrl = this.url + 'getorder';
  getprofileUrl = this.url + 'getprofile';
  editprofileUrl = this.url + 'editprofile';
  orderList: Order[] = [];
  discountAmount: number;
  totalamount: number;
  discountedamount: number;
  isCartEmpty: boolean;
  constructor(private http: HttpClient) {}

  getall() {
    return this.http.get<Product[]>(this.getallurl);
  }

  getcart() {
    return this.http.get<Product[]>(this.getcarturl);
  }

  getorders() {
    return this.http.get<PlacedOrder[]>(this.getOrderUrl);
  }

  addtocart(name) {
    return this.http.post(this.addtocartUrl, { name: name });
  }
  removecart(name) {
    return this.http.post(this.removecartUrl, { name: name });
  }

  addnew(product) {
    return this.http.post(this.addnewUrl, { product: product });
  }

  del(product) {
    return this.http.post(this.deleteUrl, { product: product });
  }

  edit(quant, price, name) {
    return this.http.post(this.editUrl, {
      quantity: quant,
      price: price,
      name: name,
    });
  }

  placeOrder(data) {
    return this.http.post(this.placeOrderUrl, { data: data });
  }
  getprofile() {
    return this.http.get<Profile[]>(this.getprofileUrl);
  }
  editprofile(name, profile) {
    return this.http.post(this.editprofileUrl, {
      name: name,
      profile: profile,
    });
  }
}
