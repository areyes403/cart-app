import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItem } from '../models/cartitem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2'
import { ReducerManager, Store } from '@ngrx/store';
import { ItemsState } from './store/items.reducer';
import { add, remove, total } from './store/items.actions';

@Component({
  selector: 'cart-app',
  imports: [CatalogComponent,NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {

  items: CartItem[]=[];

  showCart:boolean=false;

  constructor(
    private router:Router,
    private sharingDataService:SharingDataService,
    private store:Store<{items:ItemsState}>
  ){
    this.store.select('items').subscribe(state=>{
      this.items = state.items;
      this.saveSession();
    })
  }

  ngOnInit(): void {
    //this.store.dispatch(total());
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(): void {
    this.sharingDataService.productEventEmmiter.subscribe( product=> {
    this.store.dispatch(add({ product }));
    this.router.navigate(['/cart']);
    Swal.fire({
      title: 'Shopping',
      text: 'Nuevo producto agregado',
      icon: 'success',
    })
    });
  }

  onDeleteCart(){
    this.sharingDataService.idProductEventEmmiter.subscribe(id => {
      Swal.fire({
        title: "Desea eliminar?",
        text: "Item se eliminara del carrito",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(remove({id:id}));
          this.store.dispatch(total());
          this.router.navigate(['/cart']);

          Swal.fire({
            title: "Eliminado!",
            text: "Se ha eliminado",
            icon: "success"
          });
        }
      });

    });
  }

  saveSession():void{
    sessionStorage.setItem('cart',JSON.stringify(this.items));
  }

}
