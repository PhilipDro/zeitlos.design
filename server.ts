import 'zone.js/dist/zone-node';
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

// import { nodeMailer } from 'nodemailer';
const nodemailer = require('nodemailer');
import * as express from 'express';
import {join} from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

// const PORT = process.env.PORT || 4000;
const PORT = 1024;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');
// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// Send mail API enpoint
// app.post('/send-mail', (req, res) => {
//   transporter.sendMail(mailOptions);
// });
// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

app.route('/sitemap.html')
.get((req, res) => {
  res.render('sitemap', { req });
});

// Start up the Node server
app.listen(PORT, '0.0.0.0');

// app.listen(PORT, () => {
//   console.log(`Node Express server listening on http://localhost:${PORT}`);
// });

// const transporter = nodemailer.createTransport({
//   service: 'imap.strato.de',
//   auth: {
//     user: 'me@philipdrozd.com',
//     pass: 'Patta95+'
//   }
// });
//
// const mailOptions = {
//   from: 'me@philipdrozd.com',
//   to: 'junk@philipdrozd.comm',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };
//
// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
