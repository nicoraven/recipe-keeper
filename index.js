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

const newRecipePage = (req, res) => {
    res.render('createRecipe')
}

const postNewRecipe = (req, res) => {
    console.log(req.body);

    jsonfile.readFile(file, (err, obj) => {
        let newRecipe = req.body;
        let id = obj.lastIndex+1;
        let updatedObj = obj;

        newRecipe.id = id;
        newRecipe.ingredients = newRecipe.ingredients.split("; ");
        newRecipe.instructions = newRecipe.instructions.split("; ");

        updatedObj.recipes.push(newRecipe);
        updatedObj.lastIndex = id;

        jsonfile.writeFile(file, updatedObj, (err) => {
            if (err) { console.log(err) };

            res.redirect('/recipe/'+id)
        });
    })
}

const showRecipePage = (req, res) => {
    let id = parseInt(req.params.id);

    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            res.status(500).send("Internal server error");
        } else {
            let recipe = obj.recipes.find(recipe => {
                return (recipe.id === id ? recipe : null)
            });

            if (recipe) {
                let data = {"recipe": recipe};

                res.render('showRecipe', data);
            } else {
                res.status(404).send("sorry, recipe not found!");
            }
        }
    })
}

const homepage = (req, res) => {
    res.render('home');
}

/*
 * ===================================
 * Routes
 * ===================================
 */

app.post('/recipe', postNewRecipe);
app.get('/recipe/new', newRecipePage);

app.get('/recipe/:id', showRecipePage);

// default index page
app.get('/', homepage);

/*
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

const port = 3000;

app.listen(port, () => console.log(`~~~ Tuning in to the waves of port ${port} ~~~`));