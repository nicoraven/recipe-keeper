var React = require('react');

class Home extends React.Component {
    render() {
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

            </ul>
        </div>
    </div>
</body>
</html>

        );
    }
}

module.exports = Home;