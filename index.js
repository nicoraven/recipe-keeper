/*
 * ===================================
 * Configurations and set up
 * ===================================
 */

const jsonfile = require('jsonfile');

const file = 'data.json';

const express = require('express');

const app = express();

app.use(express.static(__dirname+'/public/'));

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

const methodOverride = require('method-override')

app.use(methodOverride('_method'));

const reactEngine = require('express-react-views').createEngine();

app.engine('jsx', reactEngine);

app.set('views', __dirname + '/views');

app.set('view engine', 'jsx');

/*
 * ===================================
 * Function Declarations For Routes
 * ===================================
 */


const homepage = (req, res) => {
    res.render('home');
}

/*
 * ===================================
 * Routes
 * ===================================
 */



// default index page
app.get('/', homepage);

/*
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

const port = 3000;

app.listen(port, () => console.log(`~~~ Tuning in to the waves of port ${port} ~~~`));