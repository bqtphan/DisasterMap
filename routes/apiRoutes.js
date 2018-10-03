const router = require('express').Router();
const usersController = require('../controllers/usersController') 

router.route("/users")
    .get(usersController.findAll)
    .post(usersController.create);


router.route("/users/:id")
    .get(usersController.findById)
    .put(usersController.update)
    .delete(usersController.remove);

module.exports = router;

// module.exports = (app) => {
//     // GET: /api/users
//     // Get all users
//     app.get('/api/users', (req, res) => {
//         db.User.findAll({})
//             .then(dbUser => res.json(dbUser))
//     });
    
//     // GET: /api/mapmessages
//     // Get all map messages
//     app.get('/api/mapmessages', (req, res) => {
//         db.MapMessage.findAll({})
//             .then(dbMapMessage => res.json(dbMapMessage));
//     });

//     // GET: /api/mapmessages/:id
//     // Get all map message for specific id
//     app.get('/api/mapmessages/:id', (req, res) => {
//         db.MapMessage.findAll({
//             where: {
//                 id: req.params.id
//             }
//         }).then(dbMapMessage => res.json(dbMapMessage));
//     });

    
// }

//   //get route to search for wishlist with specific name
//   app.get("/api/wishlists/:name", function (req, res) {
//     db.wishlists.findAll({
//       where: {
//         _name: req.params.name
//       }
//     }).then(function (result) {
//       res.json(result);
//     })
//   })
//   //get route to search for wishlist with specific id
//   app.get("/api/wishlists/id/:id", function (req, res) {
//     db.wishlists.findAll({
//       where: {
//         id: req.params.id
//       }
//     }).then(function (result) {
//       res.json(result);
//     })
//   })
//   //get route to grab all the items for a particular wishlist
//   app.get("/api/items/:id", function (req, res) {
//     let id = req.params.id;
//     db.items.findAll({
//       where: {
//         wishlistID: id
//       }
//     }).then(function (result) {
//       res.json(result);
//     });
//   });
//   //get route to grab all the comments for a particular wishlist
//   app.get("/api/comments/:id", function (req, res) {
//     let id = req.params.id;
//     db.comments.findAll({
//       where: {
//         wishlistID: id
//       }
//     }).then(function (result) {
//       res.json(result);
//     });
//   });
//   //get route to grab all the wishlists created by a particular user
//   app.get("/api/wishlists/byCreator/:creatorID", function (req, res) {
//     let id = req.params.creatorID;
//     db.wishlists.findAll({
//       where: {
//         creatorID: id
//       }
//     }).then(function (result) {
//       console.log("==-=-=-=--=-=" + result)
//       res.json(result);
//     });
//   });

//   app.get("/api/user/:name", function (req, res) {
//     let name = req.params.name
//     db.users.findAll({
//       where: {
//         uname: name
//       }
//     }).then(function (result) {
//       obj = {
//         id: result[0].dataValues.id,
//         error: false
//       }
//       res.json(obj);
//     }).catch(function (err) {
//       res.json({
//         error: true
//       })
//     })
//   })

//   app.get("/api/userbyeamil/:email", function (req, res) {
//     let email = req.params.email;
//     db.users.findAll({
//       where: {
//         email: email
//       }
//     }).then(function (result) {
//       res.json({
//         result
//       })
//     })
//   })

//   //post route to create a new wishlist
//   app.post("/api/wishlists", function (req, res) {
//     db.wishlists.create(req.body).then(function (result) {
//       res.json(result);
//     });
//   });

//   //post route to create a new item and assign it to a wishlist
//   app.post("/api/items", function (req, res) {
//     db.items.create(req.body).then(function (result) {
//       res.json(result);
//     });
//   });

//   //post route to create a new comment and assign it to a wishlist
//   app.post("/api/comments", function (req, res) {
//     // console.log(req.body)
//     db.comments.create(req.body).then(function (result) {
//       res.json(result);
//     });
//   });

//   //post route to create a new user
//   app.post("/api/users", function (req, res) {
//     db.users.findAll({
//       where: {
//         uname: req.body.uname
//       }
//     }).then(function (result) {
//       if (result.length == 0) {
//         db.users.create(req.body).then(function (result) {
//           const msg = {
//             to: req.body.email,
//             from: 'welcome@wishlistproject.com',
//             subject: 'Welcome to wishlist!',
//             text: 'thank you for signing up :)  your username: ' + req.body.uname,
//             html: '<strong>thank you for signing up :)<hr>your username: ' + req.body.uname + '</strong>',
//           };
//           sgMail.send(msg);
//           res.json({
//             result: result,
//             redundantname: false
//           });
//         })
//       } else {
//         res.json({
//           result: result,
//           redundantname: true
//         })
//       }
//     })
//   });

//   //post route to create new subscription
//   app.post("/api/subscriptions", function (req, res) {
//     //pass in userID and wishlistID
//     db.subscriptions.create(req.body).then(function (result) {
//       res.json(result);
//     })

//   })

//   //get route for subscriptions
//   app.get("/api/subscriptions/:userid", function (req, res) {
//     db.subscriptions.findAll({
//         where: {
//           userID: req.params.userid
//         }
//       })
//       .then(function (result) {

//         res.json(result);
//       })
//   })

//   //unsubscribe/delete subscription
//   app.delete("/api/unsubscribe", function (req, res) {
//     //pass in subscription id through body
//     db.subscriptions.destroy({
//         where: {
//           id: req.body.id
//         }
//       })
//       .then(function (result) {
//         res.json(result);
//       })
//   })

//   //put route that will change the checked value from true to false or false to true
//   app.put("/api/items", function (req, res) {

//     if (req.body.checked == 'true') {
//       db.items.update({
//           checked: false,
//           checked_by: req.body.checked_by
//         }, {
//           where: {
//             id: req.body.id
//           }
//         })
//         .then(function (result) {
//           res.json(result);

//         });
//     } else {
//       db.items.update({
//           checked: true,
//           checked_by: null
//         }, {
//           where: {
//             id: req.body.id
//           }
//         })
//         .then(function (result) {
//           res.json(result);

//         });
//     }
//   });

//   //optional(not mvp): put route to change a users password

//   //delete route to delete an item from a wishlist
//   app.delete("/api/items", function (req, res) {
//     db.items.destroy({
//       where: {
//         id: req.body.id
//       }
//     }).then(function (result) {
//       res.json(result);
//     });
//   });


//   app.delete("/api/comment", function (req, res) {
//     db.comments.destroy({
//       where: {
//         id: req.body.id
//       }
//     }).then(function (result) {
//       res.json(result);
//     })
//   })
// };