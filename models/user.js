const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
},
middleName: {
    type: String
},
lastName: {
    type: String,
    required: true
},
address: {
    type: String,
    // required: true
},
phoneNumber: {
    type: String,
    // required: true
},
email: {
    type: String,
    required: true
},
// password: {
//     type: String,
//     required: true
// },
isAdmin: {
    type: Boolean,
    default: false
}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;