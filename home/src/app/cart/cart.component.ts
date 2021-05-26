import { Component, OnInit } from '@angular/core';
import { CommerceService } from '../commerce.service';
import { Product } from '../product';
import * as $ from 'jQuery';
import { Order } from '../order';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [],
})
export class CartComponent implements OnInit {
  public data: Product[] = [
    { name: '', price: 0, link: '', cat: '', quantity: 0, incart: true },
  ];
  quantity: number = 1;
  total: number = 0;
  discount: number = 0;
  discountedtotal: number = 0;
  constructor(public commereceservie: CommerceService) {}

  ngOnInit(): void {
    if (!this.commereceservie.isCartEmpty) {
      this.commereceservie.getcart().subscribe(
        (data) => {
          this.data = data;
          for (let i = 0; i < data.length; i++) {
            this.total += data[i].price;
            this.discountedtotal = parseFloat(
              this.calculate_discounted_total().toFixed(2)
            );
          }
        },
        (error) => console.log(error)
      );
      this.commereceservie.orderList = [];
      this.commereceservie.discountedamount = 0;
      this.commereceservie.totalamount = 0;
      this.commereceservie.discountAmount = 0;
    }
  }

  remove(event) {
    var name = event.srcElement.attributes.id.nodeValue;
    this.commereceservie.removecart(name).subscribe();
  }

  plus(event) {
    var name = event.srcElement.attributes.name.nodeValue;
    var value = event.srcElement.attributes.value.nodeValue;
    var ar = value.toString().split(' ');
    var price = ar[1];
    var val = parseInt($("span[title='" + name + "']").text());
    if (val < ar[0]) {
      val++;
      $("span[title='" + name + "']").text(val);
      this.total += parseFloat(price);
      this.discountedtotal = parseFloat(
        this.calculate_discounted_total().toFixed(2)
      );
    } else alert('maximum quantity reached');
  }
  minus(event) {
    var name = event.srcElement.attributes.name.nodeValue;
    var value = event.srcElement.attributes.value.nodeValue
      .toString()
      .split(' ');
    var val = parseInt($("span[title='" + name + "']").text());
    if (val > 1) {
      val--;
      $("span[title='" + name + "']").text(val);
      this.total -= parseFloat(value[1]);
      this.discountedtotal = parseFloat(
        this.calculate_discounted_total().toFixed(2)
      );
    }
  }
  checkdiscount() {
    var coupon = $('#coupon').val().toString().toLowerCase();
    if (coupon == 'ss10') {
      $('#coupon').css('border', '5px solid green');
      this.discount = 10;
      this.discountedtotal = parseFloat(
        this.calculate_discounted_total().toFixed(2)
      );
    } else {
      $('#coupon').css('border', '5px solid red');
    }
  }
  calculate_discounted_total() {
    return this.total * (1 - this.discount / 100);
  }

  order() {
    for (let i = 0; i < this.data.length; i++) {
      var name = this.data[i].name;
      var quant = parseInt($("span[title='" + name + "']").html());
      this.commereceservie.orderList.push(
        new Order(name, quant, this.data[i].price)
      );
    }
    this.commereceservie.discountAmount = this.discount;
    this.commereceservie.totalamount = this.total;
    this.commereceservie.discountedamount = this.discountedtotal;
  }
}
