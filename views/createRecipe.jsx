var React = require('react');

class NewRecipe extends React.Component {
    render() {
        return(

<html>
<head>
    <title>Add new recipe</title>
    <link rel="stylesheet" type="text/css" href="/style.css"></link>
</head>

<body>
    <div className="page-wrapper">
        <h1>Add a new recipe:</h1>
        <br/>
        <div className="content-wrapper">
            <h4>Provide your new recipe's details here:</h4>
            <p>Separate each ingredient and line of cooking instruction with "; ".</p>
            <form method="POST" action="/recipe">
                <p className="input-tag">Recipe Title: </p>
                <input className="input-field" type="text" name="title" required/>
                <p className="input-tag">Ingredients: </p>
                <textarea className="input-field" type="text" name="ingredients" required/>
                <p className="input-tag">Cooking Instructions: </p>
                <textarea className="input-field" type="text" name="instructions" required/>
                <div className="submit">
                    <input type="submit" value="Submit"/>
                </div>
            </form>
        </div>
    </div>
</body>
</html>

        );
    }
}

module.exports = NewRecipe;