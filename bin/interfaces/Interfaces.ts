/**
 * Declaration of all interface
 */

export interface HTTP {
    verb:string;
    controler:string;
    method:string;
    request:Array<string>;
}

export interface Return {
    status:boolean;
    result:any;
}
