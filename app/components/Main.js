// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var History = require("./children/History");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return { searchObject: {topic:"",startYear:"",endYear:""}, 
             results: [{index:1,
                        headline:"Is It O.K. to Tinker With the Environment to Fight Climate Change?",
                        web_url:"https://www.nytimes.com/2017/04/18/magazine/is-it-ok-to-engineer-the-environment-to-fight-climate-change.html"
                       }],
             history: [{
                         "_id": "5936273df1979d1bf8202ebc",
                         "date": "2017-06-06T03:53:33.102Z",
                         "weblink": "https://www.nytimes.com/2017/04/20/magazine/why-the-menace-of-mosquitoes-will-only-get-worse.html",
                          "headline": "Why the Menace of Mosquitoes Will Only Get Worse"
                       }
                       ]
           };
  },
  getHistoryFromDB:function(){
        // Get the latest history.
    helpers.getHistory().then(function(response) {
      console.log(response);
      if (response !== this.state.history && response!==null && response!=="" ) {
         console.log("History", response.data);
         this.setState({ history: response.data });
     }
     }.bind(this));
  },
  
  removeFromTempResults:function(index){
    var resultsData = this.state.results;
    resultData.forEach(function(i,item){
      if((i+1)===index){
        resultData.splice(i,1);
      }
    });
    this.setState({results: resultData});
      
   },

  // The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    this.getHistoryFromDB();
    console.log("Display search form and Saved Search results from mongo dB");
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {
    console.log("searchObject UPDATED");
    console.log("topic as: "+ this.state.searchObject.topic);
    console.log("startYear as: "+ this.state.searchObject.startYear);
    console.log("endYear as: "+ this.state.searchObject.endYear);
    console.log("results as: "+ this.state.results.toString());
    console.log("history as: "+ this.state.history.toString());
    // Run the query for the article search
    helpers.runQuery(this.state.searchObject).then(function(data) {
      if (data !== this.state.results && data !== "" && data !==null) {
         var top5resultsArray = [];
         data.forEach(function(i,item,array){
          if(i<5){
            var resultObj ={ index : (i+1),headline:item.headline.main,web_url: item.web_url};
            console.log(resultObj);
            top5resultsArray.push(resultObj);
            }
         });
         console.log("top5results: " + top5resultsArray);
         this.setState({ results:top5resultsArray });

       }
    }.bind(this));
  },
  // This function allows childrens to update the parent.
  setsearchObject: function(searchObject) {
    this.setState({ searchObject: searchObject });
  },
 // This function allows childrens to update the parent.
  sethistoryObject: function(searchObject) {
    this.setState({ searchObject: searchObject });
  },
  
  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">News Scrubber!</h2>
            <p className="text-center">
              <em>Enter your search criteria</em>
            </p>
          </div>

          <div className="col-md-12">

            <Form setsearchObject={this.setsearchObject} />

          </div>

          </div>

       <div className="row">

          <div className="col-md-12">

            <Results 
            top5results={this.state.results}
            getHistoryFromDB={this.getHistoryFromDB}
            removeFromTempResults={this.removeFromTempResults}
             />

          </div>

      </div>

      <div className="row">
        
          <div className="col-md-12">

        {/* <History history={this.state.history} /> */}
        <History history={this.state.history} />
       
          </div>

     </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
