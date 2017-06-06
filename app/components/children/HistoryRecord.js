// Include React
var React = require("react");
// Helper for making AJAX requests to our API
var helpers = require("../utils/helpers");
// Creating the Results component
var HistoryRecord = React.createClass({

removeClickHandler: function(id){
    console.log("I am in removeClickHandler with params as id: "+id);
    
     //fire a post call using helper function to save the result object in DB
    helpers.deleteArticle(id).then(function(err) {
      if(err){  
        throw err;
      }else{
       console.log("removed record from DB");
      }

    });


  },
  // Here we render the function
  render: function() {
            return (
                  <div class="panel panel-default">
                  <div class="panel-body">
                    <div className="col-md-10 pull-left">
                       <b>Date Added</b> - <span id="date">{this.props.date}</span>
                       <br/>
                       <b>Headline</b> - <span id="headline">{this.props.headline}</span>
                       <br/>
                       <b> WebLink </b> - <a id="weblink" href= {this.props.weblink}>{this.props.weblink}</a>
                    </div>
                    <div className="col-md-2 pull-right">
                         <button className="btn btn-default" onClick={this.removeClickHandler.bind(this,this.props.id)}>Remove</button>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <hr/>
              </div>
                         
            );
          }
});

// Export the component back for use in other files
module.exports = HistoryRecord;
