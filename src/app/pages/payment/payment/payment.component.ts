import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { 
  ActivatedRoute, 
  Router
} from '@angular/router';

import { Constants } from 'src/app/shared/constants';
import { CreditCardPaymentRequest } from 'src/app/shared/models/credit-card-payment-request.model';
import { District } from 'src/app/shared/models/district.models';
import { KeyValuePair } from 'src/app/shared/models/key-value-pairs.model';
import { LinkPaymentRequest } from 'src/app/shared/models/link-payment-request.model';
import { PaymentIntentionModel } from 'src/app/shared/models/payment-intention.model';
import { PaymentSlipRequest } from 'src/app/shared/models/payment-slip-request.model';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart.model';
import { Tab } from 'src/app/shared/models/tab.model';
import { PaymentService } from 'src/app/shared/services/http/payment.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { CustomValidators } from 'src/app/shared/validators/custom.validators';
import '../../../shared/extensions/form-group.extensions';

@Component({
  selector: 'app-pay',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.less']
})
export class PaymentComponent implements OnInit {  
  barCodeFormGroup: UntypedFormGroup;
  cardBrands: Array<{ [key: string]: any }>;
  constants: any = Constants;
  creditCardFormGroup: UntypedFormGroup;
  disableAddress: boolean = true;
  districts: District[];
  model: PaymentIntentionModel;
  installmentsCreditCard: Array<KeyValuePair<number, string>>;
  installmentsLink: Array<KeyValuePair<number, string>>;
  linkFormGroup: UntypedFormGroup;
  shoppingCart: ShoppingCart[];  
  tabs: Tab[];  
  token: string;      

  constructor(
    private activatedRoute: ActivatedRoute,    
    @Inject(DOCUMENT) private document: Document,
    private fb: UntypedFormBuilder,    
    private paymentService: PaymentService,
    private router: Router,
    private utilsService: UtilsService
  ) { }

  createInstallments(propertyArrayName: string, maxInstallments?: number): void {
    this[propertyArrayName] = [];

    if (maxInstallments) {
      for (let i = 1; i <= maxInstallments; i++) {
        if (i === 1) {
          this[propertyArrayName].push({ key: 1, value: `Crédito à vista` });
        }
        else {
          this[propertyArrayName].push({ key: i, value: `${i}x` });
        }
      }
    }
    else {
      this[propertyArrayName].push({ key: 1, value: `Crédito à vista` });
    }
  }

  ngOnInit(): void {
    this.barCodeFormGroup = this.fb.group({
      idenCondPagm: ['', Validators.required]
    });  

    this.creditCardFormGroup = this.fb.group({    
      idenCondPagm: ['', Validators.required],  
      installments: ['', Validators.required],
      creditCard: this.fb.group({
        holder: [null, [Validators.required]],        
        cardNumber: [null, [Validators.required, CustomValidators.creditCardFlag, CustomValidators.isValidCardNumber]],
        expirationDate: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(7), CustomValidators.creditCardExiry]],
        securityCode: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
        cardBrand: ['', Validators.required]  
      }),          
    });        

    this.linkFormGroup = this.fb.group({
      idenCondPagm: ['', Validators.required],
      installments: ['', Validators.required],
      cardBrand: ['', Validators.required]
    });

    this.tabs = [];
    this.cardBrands = [];
    this.installmentsCreditCard = [];
    this.installmentsLink = [];
    this.shoppingCart = [];
    this.districts = Constants.districts;
    
    this.activatedRoute.paramMap.subscribe(params => {
      this.token = params.get('token');      
    });

    this.activatedRoute.data
    .subscribe(data => {      
      this.model = data.token as PaymentIntentionModel;

      this.shoppingCart.push(
        new ShoppingCart({
          description: this.model.description,
          amount: 1,
          value: this.model.amount,
          total: this.model.amount
        })
      );

      if (this.model.conditions) {
        this.model.conditions.forEach(condition => {
          if (condition.methodCode === Constants.paymentMethod.bole.codiMeioPagm) {
            this.tabs.push(new Tab({
              title: 'Boleto Bancário',
              icon: 'barcode',
              name: condition.methodCode
            }));

            this.barCodeFormGroup.controls.idenCondPagm.setValue(condition.idenCondPagm);

            return;
          }

          if (condition.methodCode === Constants.paymentMethod.cred.codiMeioPagm) {
            this.tabs.push(new Tab({
              title: 'Cartão de Crédito',
              icon: 'credit-card',
              name: condition.methodCode
            }));

            this.creditCardFormGroup.controls.idenCondPagm.setValue(condition.idenCondPagm);
            this.createInstallments('installmentsCreditCard', condition.maxInstallments);

            return;
          }

          if (condition.methodCode === Constants.paymentMethod.link.codiMeioPagm) {
            this.tabs.push(new Tab({
              title: 'Link de Pagamento',
              icon: 'dollar',
              name: condition.methodCode
            }));

            this.cardBrands = Constants.cardBrand;
            this.linkFormGroup.controls.idenCondPagm.setValue(condition.idenCondPagm);
            this.createInstallments('installmentsLink', condition.maxInstallments);

            return;
          }
        });
      }
    });
  }  

  submitBarCodeForm(): void {           
    if (this.barCodeFormGroup.invalid || !this.token) {
      this.barCodeFormGroup.markAllAsDirty();
    }

    let model = this.barCodeFormGroup.value as PaymentSlipRequest;
    this.paymentService.paymentSlip(this.token, model)
    .subscribe(response => {
      //TODO aguardar retorno no serviço...
    });
  }
   
  submitCreditCardForm(): void {    
    let creditCardGroup = this.creditCardFormGroup.controls.creditCard as UntypedFormGroup;
    if (creditCardGroup.controls.cardNumber.valid) {
      creditCardGroup.controls.cardBrand.setValue(this.utilsService.getCardFlag(creditCardGroup.controls.cardNumber.value));
    }

    if (this.creditCardFormGroup.invalid || !this.token) {
      this.creditCardFormGroup.markAllAsDirty();
      return;
    }

    let model = this.creditCardFormGroup.value as CreditCardPaymentRequest;
    this.paymentService.creditCardPay(this.token, model)
    .subscribe(response => {
      this.router.navigate([Constants.routesPath.cieloCallback, this.token]);
    });
  } 
  
  submitLinkForm(): void {      
    if (this.linkFormGroup.invalid || !this.token) {
      this.linkFormGroup.markAllAsDirty();
      return;
    }

    let model = this.linkFormGroup.value as LinkPaymentRequest;
    this.paymentService.createLink(this.token, model)
    .subscribe(response => {
      this.document.location.href = response.url;
    });
  } 
}
