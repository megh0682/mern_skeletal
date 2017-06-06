var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var HistorySchema = new Schema({
  headline: {type: String,default:'N/A'},
  weblink: {type: String,default:'N/A'},
  date: {type: Date,default:new Date()}
});

HistorySchema.virtual('articleId').get(function() {
    return this._id;
});

var History = mongoose.model("History", HistorySchema);
module.exports = History;
