import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root"
})
export class UsuarioAutenticadoService {

    private menuUserChange = false;
    private menuUser = new BehaviorSubject<any[] | null>(null);

    constructor(
        private http: HttpClient) { }

    getUsuarioAutenticado(): any {

    }

    isAuthenticated(): boolean {
        return true;
    }

    logout(): void {

    }
    
}