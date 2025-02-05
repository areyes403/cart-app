import { Component, EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cartitem';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent {

  items:CartItem[] =[];
  total=0;
  idProductEventEmmiter = new EventEmitter();

  onDeleteCart(id:number){
    this.idProductEventEmmiter.emit(id);
  }

}
