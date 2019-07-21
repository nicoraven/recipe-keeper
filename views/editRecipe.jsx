var React = require('react');

class EditRecipe extends React.Component {
    render() {
      let recipe = this.props.recipe;
      let url = `/recipe/${recipe.id}?_method=PUT`;
      let ingredients = recipe.ingredients.join("; ");
      let instructions = recipe.instructions.join("; ");

        return(

<html>
<head>
    <title>Edit {recipe.title}</title>
    <link rel="stylesheet" type="text/css" href="/style.css"></link>
</head>

<body>
    <div className="page-wrapper">
        <h1>Edit {recipe.title}</h1>
        <br/>
        <div className="content-wrapper">
            <h4>Edit {recipe.title}'s details here:</h4>
            <p>Separate each ingredient and line of cooking instruction with "; ".</p>
            <form method="POST" action={url}>
                <p className="input-tag">Recipe Title: </p>
                <input className="input-field" type="text" name="title" defaultValue={recipe.title} required/>
                <p className="input-tag">Ingredients: </p>
                <textarea className="input-field" type="text" name="ingredients" defaultValue={ingredients}required/>
                <p className="input-tag">Cooking Instructions: </p>
                <textarea className="input-field" type="text" name="instructions" defaultValue={instructions} required/>
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

module.exports = EditRecipe;