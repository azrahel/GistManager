var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var app           = express();
var cors          = require('cors');

var webpack           = require('webpack');
var WebpackDevServer  = require('webpack-dev-server');
var config            = require('./webpack.config');

var app = express();

var corsOptions = {
  origin: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src/client/public')));

var server = app.listen(3001, 'localhost', function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server app listening at http://%s:%s', host, port);
});

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Client app Listening at http://localhost:3000/');
});
