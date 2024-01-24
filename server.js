#!/usr/bin/env node
require('dotenv').config();
var prerender = require('./lib');
var prerenderOpts = {
    chromeFlags: ['--no-sandbox', '--headless', '--disable-gpu', '--hide-scrollbars'],
}
if (process.env.CHROME_LOCATION) prerenderOpts.chromeLocation = process.env.CHROME_LOCATION;

var server = prerender();

server.use(require('prerender-memory-cache'));
server.use(prerender.sendPrerenderHeader());
server.use(prerender.browserForceRestart());
// server.use(prerender.blockResources());
server.use(prerender.addMetaTags());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.start();
