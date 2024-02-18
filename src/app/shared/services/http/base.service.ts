import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UtilsService } from '../utils.service';

@Injectable()
export abstract class BaseService {
    abstract getApiEndpoint(): string;
    
    constructor(
        protected http: HttpClient,        
        protected utilsService: UtilsService
    ) { }

    protected buildPath(resource?: string): string {
        return `${this.getApiEndpoint()}${resource || ''}`;
    }
}