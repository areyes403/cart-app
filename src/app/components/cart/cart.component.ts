import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartitem';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnChanges {

  @Input() items:CartItem[] =[];
  total=0;
  @Output() idProductEventEmmiter = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    let itemsChanges = changes['items'];
    this.calculateTotal();
    if(!itemsChanges.firstChange){
      this.saveSession();
    }
    this.saveSession();
  }

  onDeleteCart(id:number){
    this.idProductEventEmmiter.emit(id);
    if(this.items.length == 0) {
      sessionStorage.removeItem('cart');
      sessionStorage.clear();
    }
  }

  calculateTotal():void{
    this.total = this.items.reduce((accumulator,item) => accumulator + item.quantity *item.product.price, 0);
  }

  saveSession():void{
    sessionStorage.setItem('cart',JSON.stringify(this.items));
  }
}
