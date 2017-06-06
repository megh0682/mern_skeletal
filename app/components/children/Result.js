// Include React
var React = require("react");
// Helper for making AJAX requests to our API
var helpers = require("../utils/helpers");
// Creating the Results component
var Result = React.createClass({

saveClickHandler: function(headline,web_url,index) {
    console.log("I am in saveClickHandler with params as headline: "+headline+" and web_url as: "+ web_url);
    
     //fire a post call using helper function to save the result object in DB
    helpers.postHistory(headline,web_url).then(function() {
     console.log("Added record in DB");
     //call getHistoryFromDB method in main component which will trigger render method of main method
    // this.props.doupdateResultList();
     //remove the record from result list
     //this.props.doremoveRecord(index);
    });
  },
  // Here we render the function
  render: function() {
            return (
                  <div class="panel panel-default">
                  <div class="panel-body">
                    <div className="col-md-10 pull-left">
                       <b>Headline</b> - <span id="headline">{this.props.headline}</span>
                       <br/>
                       <b> WebLink </b> - <a id="weblink" href= {this.props.weblink}>{this.props.weblink}</a>
                    </div>
                    <div className="col-md-2 pull-right">
                         <button className="btn btn-default" onClick={this.saveClickHandler.bind(this,this.props.headline,this.props.weblink,this.props.index)}>Save</button>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <hr/>
              </div>
                         
            );
          }
});

// Export the component back for use in other files
module.exports = Result;
