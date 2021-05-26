import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
declare var $: any;
import { CommerceService } from '../commerce.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'home';
  numb: number = 1;
  public str: String;
  public category: String[];
  public find: String;
  public found: boolean =true ;
  public alldata: Product[] = [
    { name: '', price: 0, link: '', cat: '', quantity: 0, incart: false },
  ];
  public clonedata: Product[];

  constructor(private commerceservice: CommerceService) {}

  ngOnInit(): void {
    this.commerceservice.getall().subscribe(
      (data) => {
        this.alldata = data;
        this.clonedata = data;
        this.category = data
          .map((item) => item.cat)
          .filter((value, index, self) => self.indexOf(value) === index);
      },
      (error) => console.log(error)
    );
  }

  addtocart(event) {
    var id = event.srcElement.attributes.id.nodeValue; /** To get the id*/
    this.str = id.toString().replaceAll(' ', '_') + 'div';
    $('#' + this.str).html(`
    <a
                  style="width: 100%"
                  class="btn btn-success"
                  role="button"
                  href="/cart"
                  >GO TO CART</a
                >
    `);
    this.commerceservice.addtocart(id).subscribe();
  }
  sort(str: String) {
    if (str == 'all') this.alldata = this.clonedata;
    else {
      this.alldata = [];
      for (let i = 0; i < this.clonedata.length; i++) {
        if (this.clonedata[i].cat == str) {this.alldata.push(this.clonedata[i]);
      }}
    }
  }
  search() {
    this.found=false;
    for(let i=0;i<this.category.length;i++){
      if(this.find.toLowerCase().split(" ").join("-")==this.category[i].toLowerCase().split(" ").join("-")){
        this.sort(this.category[i]);
        this.found=true;
        break;
      }
    }
    if(!this.found){
      for(let i=0;i<this.clonedata.length;i++){
        this.alldata=[];
        if(this.find.toLowerCase().split(" ").join("-")==this.clonedata[i].name.toLowerCase().split(" ").join("-")){
          this.alldata.push(this.clonedata[i]);
          this.found=true;
          break;
        }
      }
    }
    if(!this.found){
      this.found=false;
    }
  }
}
