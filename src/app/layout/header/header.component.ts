import { Component, OnInit } from '@angular/core';
import { UsuarioAutenticadoService } from '../services/usuario.autenticado.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {


    constructor() { }

    ngOnInit(): void {

    }

    logout():void {
    }

}
