let express = require('express');
let session = require('express-session');
let path = require('path');
const routes = require('./routes/phone.js');
let app = express();
const helmet = require("helmet");
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(helmet());
var dotenv = require('dotenv');
dotenv.config();

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: '123456789',
    cookie: {
        expires: new Date(Date.now() + 60000),
        httpOnly: true,
        sameSite: 'strict',
        secure: true
    }
}));

var whitelist = process.env.WHITELIST;
var allowedOrigins = whitelist.split(',');

app.use(cors({
    origin: function(origin, callback){
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(express.static (path.join (__dirname, '')));
app.set('views', path.join(__dirname, 'public/'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


routes.getRoutes(app)

/*var http = require('http');
var PORT = process.env.PORT || 8080;
http.createServer(app).listen(PORT, function(){
    console.log('Server listening on ' + PORT + '...');
});*/

module.exports = app;
