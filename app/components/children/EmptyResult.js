// Include React
var React = require("react");
var EmptyResult = React.createClass({

  // Here we render the function
  render: function() {
            return (
                  <div class="panel panel-default">
                  <div class="panel-body">
                   search articles and get top 10 results per relevance of your search string.
                </div>
                <hr/>
              </div>
                         
            );
          }
});

// Export the component back for use in other files
module.exports = EmptyResult;
