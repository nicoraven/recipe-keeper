var React = require('react');

class DeleteRedirect extends React.Component {
    render() {
        return(

<html>
<head>
    <title>Recipe Deleted</title>
    <link rel="stylesheet" type="text/css" href="/style.css"></link>
</head>

<body>
    <div className="page-wrapper">
        <p>Recipe Deleted! Redirecting...</p>
    </div>
    <script type="text/javascript" src="/triggerRedirect.js"></script>
</body>
</html>

        );
    }
}

module.exports = DeleteRedirect;