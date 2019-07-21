var React = require('react');

class Home extends React.Component {
    render() {

        let recipes = this.props.recipes.map((recipe, index) => {
            let url = "/recipe/" + recipe.id;
            return (<li key={index}><a href={url}>{recipe.title}</a></li>);
        });

        return(

<html>
<head>
    <title>Recipe Keeper</title>
    <link rel="stylesheet" type="text/css" href="/style.css"></link>
</head>

<body>
    <div className="page-wrapper">
        <h1>Welcome to the Recipe Keeper!</h1>
        <div className="content-wrapper">
            <h3>List of recipes below:</h3>
            <ul>
                {recipes}
            </ul>
        </div>
    </div>
</body>
</html>

        );
    }
}

module.exports = Home;