const router = require("express").Router();
const {evacuationController, homeController, mapMessagesController, usersController } = require('../controllers');


// Matches with "/evacuations"
router
  .route("/evacuationlists")
  .get(evacuationController.findAll)
  .post(evacuationController.create);

// Matches with "/evacuations/:id"
router
  .route("/evacuationlists/:id")
  .get(evacuationController.findById)
  .put(evacuationController.update)
  .delete(evacuationController.remove);

// Matches with "/home"
router
  .route("/homelists")
  .get(homeController.findAll)
  .post(homeController.create);

// Matches with "/home/:id"
router
  .route("/homelists/:id")
  .get(homeController.findById)
  .put(homeController.update)
  .delete(homeController.remove);

  
router
  .route("/mapmessages")
  .get(mapMessagesController.findAll)
  .post(mapMessagesController.create);


router
  .route("/mapmessages/:id")
  .get(mapMessagesController.findById)
  .put(mapMessagesController.update)
  .delete(mapMessagesController.remove);

router
  .route("/users")
  .get(usersController.findAll)
  .post(usersController.create);

router
  .route("/users/:id")
  .get(usersController.findById)
  .put(usersController.update)
  .delete(usersController.remove);



module.exports = router;
