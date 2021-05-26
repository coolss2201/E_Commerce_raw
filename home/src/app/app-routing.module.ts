import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { EditListComponent } from './edit-list/edit-list.component';
import { HomeComponent } from './home/home.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { OrderSuccessfullComponent } from './order-successfull/order-successfull.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'edit-list', component: EditListComponent },
  { path: 'order', component: OrderComponent },
  { path: 'my-order', component: MyOrderComponent },
  { path: 'order-successful', component: OrderSuccessfullComponent },
  { path: 'my-account', component: MyProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const componentlist = [
  HomeComponent,
  CartComponent,
  EditListComponent,
  OrderComponent,
  MyOrderComponent,
  OrderSuccessfullComponent,
  MyProfileComponent,
];
