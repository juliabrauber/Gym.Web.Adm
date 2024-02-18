import {
  Component,
  OnInit
} from '@angular/core';

import { Constants } from 'src/app/shared/constants';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart.model';
import { Transactions } from 'src/app/shared/models/transactions.model';
import { EventEmitterService } from 'src/app/shared/services/event-emitter.service';

@Component({
  selector: 'app-cielo-callback',
  templateUrl: './cielo-callback.component.html',
  styleUrls: ['./cielo-callback.component.less']
})
export class CieloCallbackComponent implements OnInit {
  shoppingCart: ShoppingCart[];
  transactions: Transactions[];
  userName: string;
  statusPayment: number;

  constructor() { }

  ngOnInit(): void {
    this.userName  = 'Cláudio';

    this.shoppingCart = [];
    this.shoppingCart.push(
      new ShoppingCart({
        description: 'Inscrição de Advocacia - Curso Formação da Advocacia em Mediação e Conciliação',
        amount: 1,
        value: 200,
        total: 200
      })
    );

    this.transactions = [];
    this.transactions.push(
      new Transactions({
        status: Constants.salesStatus.paid.description,
        tid: '00000000000000000000000000',
        date: new Date()
      })
    );

    this.statusPayment = Constants.transactionStatus.autorizada;    
  }
}
