var React = require('react');

class DeleteRecipe extends React.Component {
    render() {
      let recipe = this.props.recipe;
      let url = `/recipe/${recipe.id}?_method=DELETE`;
      let cancelPath = `/recipe/${recipe.id}`;
      let ingredients = recipe.ingredients.join("; ");
      let instructions = recipe.instructions.join("; ");

        return(

<html>
<head>
    <title>Delete {recipe.title}</title>
    <link rel="stylesheet" type="text/css" href="/style.css"></link>
</head>

<body>
    <div className="page-wrapper">
        <h1>Delete {recipe.title}</h1>
        <br/>
        <div className="content-wrapper">
            <form method="POST" action={url}>
                <h4>Are you sure you want to delete {recipe.title}?</h4>
                <div className="submit">
                    <input type="submit" value="Submit"/>
                </div>
            </form>
            <div className="submit">
                <button><a href={cancelPath}>Cancel</a></button>
            </div>
        </div>
    </div>
</body>
</html>

        );
    }
}

module.exports = DeleteRecipe;