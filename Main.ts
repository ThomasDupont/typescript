
///<reference path="node_modules/@types/jquery/index.d.ts" />

/**
 * Simple front exemple
 */

interface Person {
    firstName: string;
    lastName: string;
}

abstract class CrudManager {
    input1: JQuery;
    input2: JQuery;
    pfirstName: JQuery;
    plastName: JQuery;
    constructor() {
        this.input1 = (<JQuery>$("#firstname"));
        this.input2 = (<JQuery>$("#lastname"));
        this.pfirstName = (<JQuery>$("#firstnameRead"));
        this.plastName = (<JQuery>$("#lastnameRead"));
    }
    abstract savePerson(person:Person): void;
}

class CredentialManager extends CrudManager {

    firstName:string;
    lastName:string;
    id:string;

    constructor(id: string) {
        super();
        this.addListener(id);
        var __this = this;
        $.get('api/ajax/getCredentials/', function(r) {
            if(r.result.length > 0) {
                __this.firstName = r.result[0].firstName;
                __this.lastName = r.result[0].lastName;
                __this.id = r.result[0].id;
                __this.pfirstName.text(r.result[0].firstName);
                __this.plastName.text(r.result[0].lastName);
            }


        }, 'JSON');
    }
    /**
     * simple listener
     * @param {string} id id of the save credential button
     */
    private addListener(id: string)
    : void {
        document.getElementById(id).addEventListener('click', this.saveCredentials);
        document.getElementById('delete').addEventListener('click', this.deleteCredentials);
    }

    /**
     * save crendential arrow
     * @return {object} the success operation
     */
    public saveCredentials = ()
    : {'success': boolean} =>  {

        var firstName = this.input1.val();
        var lastName = this.input2.val();

        this.savePerson({firstName: firstName, lastName: lastName});
        return {'success': true};
    }

    /**
     * save crendential to the database
     * @param {Person} person The credential intarface
     */
    public savePerson(person: Person)
    : void {
        //add to node
        $.post('api/ajax/setCredentials/', person);
        this.firstName = person.firstName;
        this.lastName = person.lastName;
        this.pfirstName.text(this.firstName);
        this.plastName.text(this.lastName);
    }

    /**
     * Delete credential of the database
     */
    public deleteCredentials = ()
    : void => {
        $.ajax({
            url: 'api/ajax/deleteCredential/',
            type: 'DELETE',
            data: {id:this.id}
        });
        this.firstName = this.lastName = "";
        this.input1.val(""); this.input2.val("");
        this.pfirstName.text(""); this.plastName.text("");
    }

 }
 var credentialManager = new CredentialManager('formSubmit');
