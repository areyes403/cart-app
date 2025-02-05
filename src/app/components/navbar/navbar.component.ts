import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartitem';

@Component({
  selector: 'navbar',
  imports: [],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  @Input() items:CartItem[] = [];

  @Output() openCartEmitter = new EventEmitter();

  openCart():void{
    this.openCartEmitter.emit()
  }
}
