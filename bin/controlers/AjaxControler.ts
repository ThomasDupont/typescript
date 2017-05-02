import {Credential} from './../models/Credential';
import {HTTP} from "./../interfaces/Interfaces";
import {Return} from "./../interfaces/Interfaces";

/**
 * MVC controler
 * @param  {HTTP}   publicrequest the request
 */
export class AjaxControler {
    constructor(public request: HTTP) {
    }

    /**
     * Http verb manager
     * @param  {any}    callback the callback function
     */
    public executeAction(callback:any) :void {
        var retour;
        switch(this.request.verb) {
            case 'POST':
                switch(this.request.method) {
                    case 'setCredentials':
                        this.setCredentials(callback);
                        break;
                }
                break;
            case 'GET':
                switch(this.request.method) {
                    case 'getCredentials':
                        this.getCredentials(callback);
                        break;
                }
                break;
            case 'DELETE':

                switch(this.request.method) {
                    case 'deleteCredential':
                        this.deleteCredentials(callback);
                        break;
                }
                break;
        }
    }

    private setCredentials(callback:any): any {
        var credential = new Credential(callback);
        return credential.addCredential(this.request.request);
    }

    private deleteCredentials(callback:any) :any {
        var credential = new Credential(callback);
        return credential.removeCredential(this.request.request);
    }

    private getCredentials(callback:any): any {
        var credential = new Credential(callback);
        return credential.getCredentials();
    }
}
