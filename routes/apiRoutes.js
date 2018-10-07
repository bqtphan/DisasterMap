const app = require("express")();
const evacuationController = require("../../controllers/evacuationController");
const homeController = require("../../controllers/homeController");


// Matches with "/evacuations"
app.route("/evacuationlists")
  .get(evacuationController.findAll)
  .post(evacuationController.create);

// Matches with "/evacuations/:id"
app
  .route("/evacuationlists/:id")
  .get(evacuationController.findById)
  .put(evacuationController.update)
  .delete(evacuationController.remove);

  // Matches with "/home"
app.route("/homelists/")
.get(homeController.findAll)
.post(homeController.create);

// Matches with "/home/:id"
app
.route("/homelists/:id")
.get(homeController.findById)
.put(homeController.update)
.delete(homeController.remove);


module.exports = app;
