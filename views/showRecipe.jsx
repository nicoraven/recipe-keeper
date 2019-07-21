var React = require('react');

class ShowRecipe extends React.Component {
    render() {

        let recipe = this.props.recipe;

        let ingredients = recipe.ingredients.map((item, index) => {
            return (
                <li key={index}>{item}</li>
            )
        });

        let instructions = recipe.instructions.map((item, index) => {
            return (
                <li key={index}>{item}</li>
            )
        });

        return (

<html>
<head>
    <title></title>
    <link rel="stylesheet" type="text/css" href="/style.css"></link>
</head>
<body>

    <h1>{recipe.title}</h1>

    <h2>Ingredients</h2>
    <ul>
        {ingredients}
    </ul>

    <h2>Cooking Instructions</h2>
    <ol>
        {instructions}
    </ol>

</body>
</html>

        )
    }
}

module.exports = ShowRecipe;