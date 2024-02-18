import { District } from './models/district.models';

export class Constants {
    public static readonly cardBrand = [
        { key: 'amex', value: 'Amex' },
        //{ key: 'aura', value: 'Aura' },
        //{ key: 'diners', value: 'Diners' },
        //{ key: 'discover', value: 'Discover' },
        { key: 'elo', value: 'Elo' },
        { key: 'hipercard', value: 'Hipercard' },        
        //{ key: 'jcb', value: 'JCB' },
        { key: 'mastercard', value: 'Mastercard' },        
        { key: 'visa', value: 'Visa' },
    ];

    public static readonly defaultDateFormat = 'dd/MM/yyyy';

    public static readonly defaultErrorMessage: string = 'Erro ao executar requisição.';    

    public static get districts(): District[] {
        const districts = [];
        districts.push(new District({ districtCode: 'AC', name: 'Acre', value: 1 }));
        districts.push(new District({ districtCode: 'AL', name: 'Alagoas', value: 2 }));
        districts.push(new District({ districtCode: 'AM', name: 'Amazonas', value: 3 }));
        districts.push(new District({ districtCode: 'AP', name: 'Amapá', value: 4 }));        
        districts.push(new District({ districtCode: 'BA', name: 'Bahia', value: 5 }));
        districts.push(new District({ districtCode: 'CE', name: 'Ceará', value: 6 }));
        districts.push(new District({ districtCode: 'DF', name: 'Distrito Federal', value: 7 }));
        districts.push(new District({ districtCode: 'ES', name: 'Espírito Santo', value: 8 }));
        districts.push(new District({ districtCode: 'GO', name: 'Goiás', value: 9 }));
        districts.push(new District({ districtCode: 'MA', name: 'Maranhão', value: 10 }));
        districts.push(new District({ districtCode: 'MT', name: 'Mato Grosso', value: 11 }));
        districts.push(new District({ districtCode: 'MS', name: 'Mato Grosso do Sul', value: 12 }));
        districts.push(new District({ districtCode: 'MG', name: 'Minas Gerais', value: 13 }));
        districts.push(new District({ districtCode: 'PA', name: 'Pará', value: 14 }));
        districts.push(new District({ districtCode: 'PB', name: 'Paraíba', value: 15 }));
        districts.push(new District({ districtCode: 'PE', name: 'Pernambuco', value: 16 }));
        districts.push(new District({ districtCode: 'PI', name: 'Piauí', value: 17 }));
        districts.push(new District({ districtCode: 'PR', name: 'Paraná', value: 18 }));                
        districts.push(new District({ districtCode: 'RJ', name: 'Rio de Janeiro', value: 19 }));
        districts.push(new District({ districtCode: 'RN', name: 'Rio Grande do Norte', value: 20 }));
        districts.push(new District({ districtCode: 'RO', name: 'Rondônia', value: 21 }));
        districts.push(new District({ districtCode: 'RR', name: 'Roraima', value: 22 }));
        districts.push(new District({ districtCode: 'RS', name: 'Rio Grande do Sul', value: 23 }));                
        districts.push(new District({ districtCode: 'SC', name: 'Santa Catarina', value: 24 }));
        districts.push(new District({ districtCode: 'SE', name: 'Sergipe', value: 25 }));
        districts.push(new District({ districtCode: 'SP', name: 'São Paulo', value: 26 }));        
        districts.push(new District({ districtCode: 'TO', name: 'Tocantins', value: 27 }));

        return districts;
    }  
    
    public static readonly headerKeyIgnoreError = 'x-ignore-error';

    public static readonly masks = {
        cnpj: {
            mask: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
        },
        cpf: {
            mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
        },
        cpfCnpj: {
            mask: function (rawValue: any) {
                const value = rawValue.replace(/[^0-9]*/g, '');
                if (!value || value.length <= 11) {
                    return Constants.masks.cpf.mask;
                } else {
                    return Constants.masks.cnpj.mask;
                }
            },
            guide: false
        },
        date: {
            mask: [/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/]
        },
        vehiclePlate: {
            mask: [/\w/, /\w/, /\w/, '-', /\d/, /[\d\w]/, /\d/, /\d/]
        },
        renavam: {
            mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
        },
        zipCode: {
            mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
        }
    }

    public static paymentMethod = {
        bole: { codiMeioPagm: 'BOLE', descMeioPagm: 'Boleto' },
        cred: { codiMeioPagm: 'CRED', descMeioPagm: 'Cartão de Crédito' },
        link: { codiMeioPagm: 'LINK', descMeioPagm: 'Página do Parceiro' }
    };

    public static routesPath = {        
        cieloCallback: 'pagamento/cielo-callback',
        cieloUrlReturn: 'pagamento/retorno',
        error: '/error'
    };

    public static readonly salesStatus = {
        waitingPayment: { description: 'Aguardando Pagamento', value: 1 },
        inAnalysis: { description: 'Em Análise', value: 2 },
        paid: { description: 'Pago', value: 3 },
        refunded: { description: 'Reembolsado', value: 4 },
        cancelled: { description: 'Cancelado', value: 5 },
    }

    public static readonly transactionStatus = {
        criada: 0,
        emProcessamento: 1,
        autenticada: 2,
        naoAutenticada: 3,
        autorizada: 4,
        naoAutorizada: 5,
        capturada: 6,
        cancelada: 9,
        emAutenticacao: 10,
        emCancelamento: 12
    };
}