import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-successfull',
  template: ` <h3>Your Order has been successfully placed!!!</h3> `,
  styles: [],
})
export class OrderSuccessfullComponent implements OnInit {
  constructor(private location: LocationStrategy) {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

  ngOnInit(): void {}
}
