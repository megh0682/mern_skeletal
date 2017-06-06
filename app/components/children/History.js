// Include React
var React = require("react");
var helpers = require("../utils/helpers");
var HistoryRecord = require("./HistoryRecord");


// Creating the Results component
var History = React.createClass({

  // Here we render the function
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Saved Results</h3>
        </div>
        <div className="panel-body verticalScroll">
          {/* Here we use a map function to loop through an array in JSX */}
          {this.props.history.map(function(search, i) {
            console.log("index: " +i+" search.headline: "+ search.headline + " search.weblink: "+search.weblink+" search.date: "+
            search.date+" search._id: "+search._id);
            return (

                 <HistoryRecord 
                 
                   headline = {search.headline}
                   weblink = {search.weblink}
                   date={search.date}
                   id={search._id}
                  
                 />      
            );
         })}
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = History;
