import { errorCode } from "../../type";

export interface ErrorState {    
    code: errorCode;
    description: string;
    title: string;
}