import { 
  Component, 
  OnInit, 
  ChangeDetectionStrategy, 
  Input, 
  OnChanges, 
  SimpleChanges 
} from '@angular/core';

import { UtilsService } from '../../services/utils.service';

@Component({
selector: 'app-credit-card-flag',
templateUrl: './credit-card-flag.component.html',
styleUrls: ['./credit-card-flag.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditCardFlagComponent implements OnInit, OnChanges {
@Input()
creditCardNumber: string;

@Input()
class: string;

isMasterCard: boolean = false;
isVisa: boolean = false;
isAmex: boolean = false;
isHipercard: boolean = false;
isElo: boolean = false;
flag: string;

readonly allFlags = ['mastercard', 'visa', 'amex', 'elo', 'hipercard'];
constructor(private utilsService: UtilsService) { }

ngOnInit(): void {
}

ngOnChanges(changes: SimpleChanges): void {
  if (changes.creditCardNumber.currentValue) {
    this.flag = this.utilsService.getCardFlag(changes.creditCardNumber.currentValue);

    if (this.flag) {
      this.isVisa = this.flag === 'visa';
      this.isMasterCard = this.flag === 'mastercard';
      this.isAmex = this.flag === 'amex';
      this.isHipercard = this.flag === 'hipercard';
      this.isElo = this.flag === 'elo';
    } else {
      this.init();
    }
  } else {
    this.init();
  }
}

init(): void {    
  this.isVisa = false;
  this.isMasterCard = false;
  this.isAmex = false;
  this.isHipercard = false;
  this.isElo = false;
  this.flag = '';
}
}
