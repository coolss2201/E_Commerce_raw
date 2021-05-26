import { Component, OnInit } from '@angular/core';
import { CommerceService } from '../commerce.service';
import { Product } from '../product';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css'],
})
export class EditListComponent implements OnInit {
  public all_list: Product[];
  public new_ele = new Product();
  public editedQuantity:number;
  public editedPrice:number;
  public nametoedit:String;
  constructor(private commerceservice: CommerceService) {}

  ngOnInit(): void {
    this.commerceservice.getall().subscribe((data) => (this.all_list = data));
  }

  addnew() {
    this.new_ele.incart = false;
    this.commerceservice.addnew(this.new_ele).subscribe();
    location.reload();
  }
  del(event){
    var name=event.srcElement.attributes.title.nodeValue;
    this.commerceservice.del(name).subscribe();
    location.reload();
  }
  edit(){
    this.commerceservice.edit(this.editedQuantity,this.editedPrice,this.nametoedit).subscribe();
    location.reload();
  }
}
