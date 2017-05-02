// server.ts

import http = require('http');
import os   = require('os');
import fs   = require('fs');
import url  = require('url');
import {ControlerFactory} from './controlers/ControlerFactory';
import {HTTP}             from './interfaces/Interfaces';
import {Return}           from './interfaces/Interfaces';

/**
 * Node server
 * @param  {number} port port of the server
 */
class HttpServer {
    nodePort: number;

    constructor (port: number) {
        this.nodePort = port;
    }

    /**
     * Invoke on request received
     * @param {http.ServerRequest}  request  input
     * @param {http.ServerResponse} response output
     */
    public onRequest(request: http.ServerRequest, response: http.ServerResponse)
    : void {
        console.log('New request: ' + request.url);
        var parse = request.url.split('/');
        if(request.url == "/") {
            //INDEX
            fs.readFile(__dirname+"/../../index.html", (err: Error, data: Buffer) => {
                if (err) {
                    throw err;
                }
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data);
                response.end();
            });
        } else if (request.url.split('.').pop() == "js") {
            //JS

            fs.readFile(__dirname+"/../.."+request.url, (err: Error, data: Buffer) => {
                if (err) {
                    throw err;
                }
                response.writeHead(200, {'Content-Type': 'text/javascript'});
                response.write(data);
                response.end();
            });
        } else if(parse[1] == "api") {
            //REQUEST
            var body = '';
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function () {
                var r = {
                    verb: request.method,
                    controler:parse[2],
                    method:parse[3],
                    request: body.split('&')
                };
                var cont = new ControlerFactory(r);
                cont.execute(function (retour:Return) {
                    response.writeHead(200, {'Content-Type': 'text/json'});
                    response.write(JSON.stringify(retour));
                    response.end();
                });

            });
        }


    }
    /**
     * Starting server
     */
    public onStart()
    : void {
        let httpServer = http.createServer(this.onRequest);
        httpServer.listen(this.nodePort);
        console.log('Server listenning on http://localhost:' + this.nodePort + '/');
    }
}

let server = new HttpServer(8080).onStart();
