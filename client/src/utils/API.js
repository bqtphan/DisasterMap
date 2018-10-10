import axios from "axios";

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
  getUser: (id) => {
    return axios.get("/api/users/" + id);
  },
  saveUser: (userData) => {
    return axios.post("/api/users", userData);
  },
  deleteUser: (id) => {
    return axios.delete("/api/users/" + id);
  },
};

