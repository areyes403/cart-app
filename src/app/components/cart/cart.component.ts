import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartitem';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { ItemsState } from '../store/items.reducer';
import { total } from '../store/items.actions';

@Component({
  selector: 'cart',
  imports: [],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit{

  items:CartItem[] =[];
  total=0;

  constructor(
    private sharingDataService:SharingDataService,
    private store:Store<{items:ItemsState}>
  ){
    this.store.select('items').subscribe(state=>{
      this.items = state.items;
      this.total = state.total;
    })
  }

  ngOnInit(): void {
    this.store.dispatch(total())
  }

  onDeleteCart(id:number){
    this.sharingDataService.idProductEventEmmiter.emit(id);
  }

}
