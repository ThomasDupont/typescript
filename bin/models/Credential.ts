import {Mongo} from './../services/Mongo';


export class Credential {
    constructor(public callback:any) {

    }
    /**
     * Add credential to the db
     * @param {Array<string>} credentials
     */
    public addCredential(credentials: Array<string>)
    : void {
        var insert:any ={};
        for(var i=0;i<credentials.length;i++) {
            var t = credentials[i].split('=');
            insert[t[0]] = t[1];
        }

        var m = new Mongo();
        insert.id=m.createId();
        var _this = this;
        m.connect(function(db:Mongo) {
            db.insert(insert, 'credentials').then(function ()
            {
                _this.callback({
                    status:true,
                    result:insert.id
                });
            });

        });
    }

    /**
     * get Credential from de DB
     */
    public getCredentials()
    :void {
        var m = new Mongo();
        var _this = this;
        m.connect(function(db:Mongo) {
            var result = db.find({}, 'credentials').then(function(result:any){
                _this.callback({
                    status:true,
                    result:result
                });
            }, function(error: any) {
                _this.callback({
                    status:false,
                    result:error
                });
            });
        });
    }
    /**
     * Remove crendential in the Mongo db
     * @param {Array<string>} par matching parameters
     */
    public removeCredential(par: Array<string>)
    :void {
        var id = par[0].split('=')[1];

        var m = new Mongo();
        var _this = this;
        m.connect(function(db:Mongo) {

            var result = db.remove({'id':id}, 'credentials',_this.callback);
        });
    }
}
