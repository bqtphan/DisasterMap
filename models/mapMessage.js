const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mapMessageSchema = new Schema({
  
    message: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const MapMessage = mongoose.model("MapMessage", mapMessageSchema);

module.exports = MapMessage;