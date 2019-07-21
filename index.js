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
    // console.log(req.body);

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

const editRecipePage = (req, res) => {
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

                res.render('editRecipe', data);
            } else {
                res.status(404).send("sorry, recipe not found!");
            }
        }
    })
}

const putRecipe = (req, res) => {
    let id = parseInt(req.params.id);

    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            res.status(500).send("Internal server error");
        } else {
            let updatedObj = obj;
            let index = updatedObj.recipes.findIndex(recipe => {
                return recipe.id === id
            });

            updatedObj.recipes[index].title = req.body.title;
            updatedObj.recipes[index].ingredients = req.body.ingredients.split("; ");
            updatedObj.recipes[index].instructions = req.body.instructions.split("; ");

            jsonfile.writeFile(file, updatedObj, (err) => {
                if (err) { console.log(err) };

                res.redirect('/recipe/'+id);
            });
        }
    })
}

const deleteRecipePage = (req, res) => {
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

                res.render('deleteRecipe', data);
            } else {
                res.status(404).send("sorry, recipe not found!");
            }
        }
    })
}

const deleteRecipe = (req, res) => {
    let id = parseInt(req.params.id);

    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            res.status(500).send("Internal server error");
        } else {
            let updatedObj = obj;
            let index = updatedObj.recipes.findIndex(recipe => {
                return recipe.id === id
            });

            updatedObj.recipes.splice(index, 1);

            res.render('deleteRedirect');

            jsonfile.writeFile(file, updatedObj, (err) => {
                if (err) { console.log(err) };

            });
        }
    })
}

// const deletedRedirect = (req, res) => {
//     res.render('deleteRedirect');
// }

const homepage = (req, res) => {
    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            res.status(500).send("Internal server error");
        } else {
            let recipes = obj.recipes;
            let data = {"recipes": recipes};

            res.render('home', data);
        }
    })
}

/*
 * ===================================
 * Routes
 * ===================================
 */

app.get('/recipe/:id/delete', deleteRecipePage);
app.delete('/recipe/:id', deleteRecipe);

app.get('/recipe/:id/edit', editRecipePage);
app.put('/recipe/:id', putRecipe);

app.get('/recipe/new', newRecipePage);
app.post('/recipe', postNewRecipe);

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