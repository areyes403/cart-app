import { Component, EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cartitem';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent {

  items:CartItem[] =[];
  total=0;

  constructor(
    private router:Router,
    private sharingDataService:SharingDataService
  ){
    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }

  onDeleteCart(id:number){
    this.sharingDataService.idProductEventEmmiter.emit(id);
  }

}
