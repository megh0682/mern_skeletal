// Include React
var React = require("react");
var helpers = require("../utils/helpers");
var Result = require("./Result.js");

// Creating the Results component
var Results = React.createClass({

removeRecord:function(index){
  //remove the record from result list
     this.props.removeFromTempResults(index);

},

updateResultList:function(){
 //call getHistoryFromDB method in main component which will trigger render method of main method
     this.props.getHistoryFromDB();

},
 
  // Here we render the function
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Top Results</h3>
        </div>
        <div className="panel-body verticalScroll">
          {/* Here we use a map function to loop through an array in JSX */}
          {this.props.top5results.map(function(search, i) {
            console.log(" search headline: "+ search.headline + " search web url: "+search.web_url+" search.index: "+search.index);
            return (

                 <Result 

                   headline = {search.headline}
                   weblink = {search.web_url}
                   index = {search.index}
                   doremoveRecord={this.removeRecord}
                   doupdateResultList={this.updateResultList}

                 />      
            );
         })}
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;
