import axios from "axios";

const googleApiKey = " &key=AIzaSyC5ApuYk2-uT8q3_l9WQn9ENdNFANtc3eg"


export default {
  // Gets all items
  getAllHomelists: function() {
    return axios.get("/api/homelists");
  },
  // Gets the homelist with the given id
  gethomelists: function(id) {
    return axios.get("/api/homelists/" + id);
  },
  // Deletes the homelist with the given id
  deletehomelists: function(id) {
    return axios.delete("/api/homelists/" + id);
  },
  updatehomelists: function(id, data) {
    return axios.put("/api/homelists/" + id, data);
  },
  // Saves a homelist to the database
  savehomelists: function(homelists) {
    return axios.post("/api/homelists", homelists);
  },
  // get all evaction list
  getAllEvacuationLists: function() {
    return axios.get("/api/evacuationlists/");
  },
  // Gets the evacuation list with the given id
  getevacuationlists: function(id) {
    return axios.get("/api/evacuationlists/" + id);
  },
  // Deletes the evacuation list with the given id
  deletelists: function(id) {
    return axios.delete("/api/evacuationlists/" + id);
  },
  // Saves a evacuation list to the database
  saveevacuationlists: function(evacuationlists) {
    return axios.post("/api/evacuationlists", evacuationlists);
  },
  updateevacuationlists: function(id, evacuationlists) {
    return axios.put("/api/evacuationlists/" + id, evacuationlists);
  },
  getMapMessages: () => {
    return axios.get("/api/mapmessages");
  },
  getMapMessage: (id) => {
    return axios.get("/api/mapmessages/" + id);
  },
  saveMapMessage: (mapMessageData) => {
    return axios.post("/api/mapmessages", mapMessageData);
  },
  deleteMapMessage: (id) => {
    return axios.delete("/api/mapmessages/" + id);
  },
  getUsers: () => {
    return axios.get("/api/users");
  },
  getUserByEmail: (email) => {
    return axios.get("/api/users?email=" + email);
  },
  getUser: (id) => {
    return axios.get("/api/users/" + id);
  },
  saveUser: (userData) => {
    return axios.post("/api/users", userData);
  },
  deleteUser: (id) => {
    return axios.delete("/api/users/" + id);
  },
  getHouseholdByOwner: (owner) => {
    return axios.get("/api/households?createdBy=" + '5bc7a2198f2a825480781d0f');
  },
  saveHousehold: (householdData) => {
    return axios.post("/api/households", householdData);
  },
  updateHousehold: (id, data) => {
    return axios.put("/api/households/" + id, data);
  },
  getShelters: function(lat, lng, filter) {
    return axios.get("https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&rankby=distance&type=" + filter + googleApiKey);
  }
};

