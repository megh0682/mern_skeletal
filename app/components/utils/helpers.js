// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var nytimesAPI = "12ebf3cda6384cc9a2762d31543e660c";

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to nytimes article search api.
  runQuery: function(searchObj) {
    var topic = searchObj.topic;
    var beginDate = searchObj.startYear.trim() + "01" + "01";
    var endDate = searchObj.endYear.trim() + "31" + "12";
    console.log(topic + " : "+ beginDate + " : "+ endDate);

    // Figure out the geolocation
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="  
                   + topic + "&api-key=" + nytimesAPI  + "&begin_date=" + beginDate + "&end_date=" + endDate;
    return axios.get(queryURL).then(function(response) {
      // If you get a result, return that result's formatted address property
      console.log(response);
      if (response.data.response.docs.length > 0) {
        console.log("ny api result set is not empty");
        console.log(response.data.response.docs);
        return response.data.response.docs;

      }
      // If we don't get any results, return an empty string
      console.log("API return status code: "+response.status);
      return "";
    });
  },
  // This function hits our own server to retrieve the saved search article list
  getHistory: function() {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postHistory: function(headline,web_url) {
    return axios.post("/api", {headline: headline,weblink:web_url});
  },


  // This function posts new searches to our database.
  deleteArticle: function(id) {
    return axios.delete("/api/"+ id);
  }
};

// We export the API helper
module.exports = helper;
