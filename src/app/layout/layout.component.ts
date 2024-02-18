import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {

  title = 'cadastro-nacional-oab';
  isCollapsed = false;
  isLogin = false;

  year = (new Date()).getFullYear();
  breadcrumbPage = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.breadcrumbPage = this.formatBreadcrumb(this.router.url);
    this.router.events.subscribe((rota: any) => {
      if (rota['url']) {
        this.breadcrumbPage = this.formatBreadcrumb(rota['url']);
      }
    });

  }

  formatBreadcrumb = (url: string) => {
    let currentPage = url === '/' ? '' : url;
    let currentPageArray = currentPage.split('/').filter(x => x);
    let currentPageArrayFinal = currentPageArray;

    if (currentPageArray.length > 2) {
      currentPageArrayFinal = currentPageArray.slice(0, -1);
    }

    return currentPageArrayFinal.map((url) => {

      if(url == 'login' || url == 'register-user') {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }

      switch (url) {
        case 'aluno':
          url = 'Alunos'
          break;
        case 'dashboard':
          url = 'Dashboard'
          break;  
      }
      return this.capitalize(url);
    })
      .join(' > ');

  }
  capitalize(str: string) {
    if (typeof str !== 'string') {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1, str.length);
  }

}

