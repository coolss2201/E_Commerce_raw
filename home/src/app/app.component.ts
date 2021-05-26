import { Component, OnInit } from '@angular/core';
import { CommerceService } from './commerce.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public num: Number = 0;
  constructor(private commereceservie: CommerceService) {}
  ngOnInit() {
    setInterval(() => {
      this.commereceservie.getcart().subscribe(
        (data) => {
          this.num = data.length;
          if (this.num == 0) this.commereceservie.isCartEmpty = true;
          else this.commereceservie.isCartEmpty = false;
        },
        (error) => console.log(error)
      );
    }, 100);
  }
}
