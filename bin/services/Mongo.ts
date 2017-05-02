var
   MongoClient = require('mongodb').MongoClient
  ,assert      = require('assert')
  ,Mongodb     = require('mongodb')
  ,Q           = require("q");

/**
 * Mongo Manager
 */
export class Mongo {

    static url: string = 'mongodb://localhost:27017/typeScript';
    dbConnection: any = null;

    constructor() {

    }

    /**
     * Connection to DB
     * @param  {any}    callback callback function
     */
    public connect (callback:any) {
        // Use connect method to connect to the server
        MongoClient.connect(Mongo.url, (err: any, db: any) => {
          assert.equal(null, err);
          console.log("Connected successfully to server");

          this.dbConnection = db;
          callback(this);
        });
    }

    /**
     * personnalize a mongoId
     * @return {string} the token
     */
    public createId() :string {
        return Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2);
    }

    /**
     * insert document using Q
     * @param  {any}    document   the object to insert
     * @param  {string} collection the collection name
     * @return {any}               the promise
     */
    public insert (document: any, collection:string)
    : any {
        var deferred = Q.defer();
        this.dbConnection.collection(collection).insertOne(document, (err:any, result:any) => {
            this.dbConnection.close();
            assert.equal(err, null);
            if (err) {
                deferred.reject(new Error(JSON.stringify(err)));
            }
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    /**
     * remove a document, callback method
     * @param {any}    document   matching document
     * @param {string} collection collection name
     * @param {any}    callback   the callback function
     */
    public remove (document: any, collection:string, callback:any)
    : void {

        this.dbConnection.collection(collection).deleteOne(document, (err:any, result:any) => {
            this.dbConnection.close();
            console.log(result);
            if (!err) {

                callback({
                    status:true,
                    result:result
                });

            } else {
                callback({
                    status:false,
                    result:err
                });
            }
        });

    }

    /**
     * find document using Q
     * @param {any}    document   matching parameter
     * @param {string} collection collection name
     * @return {any}               the promise
     */
    public find (document: any, collection:string)
    : any{
        var deferred = Q.defer();
        this.dbConnection.collection(collection).find(document).toArray( (err:any, result:any) => {
            this.dbConnection.close();
            if (!err) {
                deferred.resolve(result);
            } else {
                deferred.reject(new Error(JSON.stringify(err)));
            }

        });
        return deferred.promise;
    }
}
