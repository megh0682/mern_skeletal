// Include React
var React = require("react");

// Creating the Form component
var Form = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { topic: "",
             startYear:"",
             endYear:""
       };
  },

  // This function will respond to the user input
  handleChange: function(e) {

    this.setState({[e.target.name]: e.target.value});

  },

  // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();
    //create a searchObject
    var searchObject = {topic:this.state.topic,startYear:this.state.startYear,endYear:this.state.endYear};
    // Set the parent to have the search term
    this.props.setsearchObject(searchObject);
    this.setState({ topic: "",startYear:"",endYear:"" });
  },
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Query</h3>
        </div>
        <div className="panel-body text-center">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h4 className="text-center">
                <strong>Topic</strong>
              </h4>

              {/*
                Note how each of the form elements has an id that matches the state.
                This is not necessary but it is convenient.
                Also note how each has an onChange event associated with our handleChange event.
              */}
              <input
                value={this.state.topic}
                type="text"
                className="form-control text-center"
                id="topic"
                name="topic"
                onChange={this.handleChange}
                required
              />
              <br />
              <h4 className="text-center">
                <strong>Start Year</strong>
              </h4>
              <input
                value={this.state.startYear}
                type="number"
                className="form-control text-center"
                id="startYear"
                name="startYear"
                onChange={this.handleChange}
                required
              />
              <br />
               <h4 className="text-center">
                <strong>End Year</strong>
              </h4>
              <input
                value={this.state.endYear}
                type="number"
                className="form-control text-center"
                id="endYear"
                name="endYear"
                onChange={this.handleChange}
                required
              />
              <br />
              <button
                className="btn btn-primary"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Form;
