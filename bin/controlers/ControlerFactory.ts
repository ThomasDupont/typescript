
import {HTTP}          from "./../interfaces/Interfaces";
import {AjaxControler} from './AjaxControler';

/**
 * MVC factory
 * @param  {HTTP}   request the request
 */
export class ControlerFactory {
    controler: any;
    constructor(request: HTTP) {
        switch(request.controler) {
            case 'ajax':
                this.controler = new AjaxControler(request);
                break;
        }
    }
    /**
     * Execute the method of the controler
     * @param {any} callback callback function
     */
    public execute(callback:any) :void {
        this.controler.executeAction(callback);
    }
}
