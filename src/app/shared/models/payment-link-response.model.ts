import { GatewayInfo } from "./gateway-info.model";

export interface PaymentLinkResponse {
    createdAt: Date;
    gatewayInfo: GatewayInfo;
    status: string;
    transactionId: string;    
    url: string;
}