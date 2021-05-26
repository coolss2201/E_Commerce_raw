import { Component, OnInit } from '@angular/core';
import { CommerceService } from '../commerce.service';
import { Profile } from '../profile';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(private commerceservice:CommerceService) { }

  myprofile:Profile={name:'',number:0,email:''};
  public name:String;
  ngOnInit(): void {
    this.commerceservice.getprofile().subscribe(
      data=>{this.myprofile=data[0]
      this.name=data[0].name;
      }
    )
  }
  change(){
    this.commerceservice.editprofile(this.name,this.myprofile).subscribe();
    location.reload();
  }

}
