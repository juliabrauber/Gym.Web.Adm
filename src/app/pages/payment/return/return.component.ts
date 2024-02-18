import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cielo-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ReturnComponent implements OnInit {     
  token: string;      

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.token = params.get('token');      
    });    
  }
}
