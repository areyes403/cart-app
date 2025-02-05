import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartitem';

@Component({
  selector: 'cart-modal',
  imports: [CartComponent],
  templateUrl: './cart-modal.component.html',
})
export class CartModalComponent {
    @Input() items:CartItem[] =[];
   // @Input() total=0;

    @Output() idProductEventEmmiter = new EventEmitter();
    
    @Output() closeCartEmitter = new EventEmitter();

    closeCart():void{
      this.closeCartEmitter.emit()
    }
    
    onDeleteCart(id:number){
      this.idProductEventEmmiter.emit(id);
    }

}
