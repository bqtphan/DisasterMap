// var db = require("../models");

// module.exports = function (app) {
//   // Load index page
//   app.get("/", function (req, res) {
//     db.Example.findAll({}).then(function (dbExamples) {
//       res.render("index");
//     });
//   });

//   app.get('/login', function (req, res) {
//     res.render('login');
//   });

//   app.get('/signup', function (req, res) {
//     res.render('new_account');
//   });

//   app.get('/wishlist/yourlists', function (req, res) {
//     res.render("your_lists");
//   })

//   app.get('/wishlist/admin/:id', function (req, res) {

//     db.wishlists.findAll({
//       where: {
//         id: req.params.id
//       }
//     }).then(function (result) {
//       var wishlist = result;

//       db.items.findAll({
//         where: {
//           wishlistID: wishlist[0].dataValues.id
//         }
//       }).then(function (result) {
//         var items = result;
//         db.comments.findAll({
//           where: {
//             wishlistID: wishlist[0].dataValues.id
//           }
//         }).then(function (result) {
//           var comments = result;
//           db.users.findAll({
//             where: {
//               id: wishlist[0].dataValues.creatorID
//             }
//           }).then(function (result) {
//             let creatorName = result[0].uname;
//             let allItems = new Array()
//             items.forEach(element => {
//               allItems.push(element.dataValues);
//             });
//             let allComments = new Array()
//             comments.forEach(element => {
//               console.log("-----------------" + JSON.stringify(result))
//               db.users.findAll({
//                 where: {
//                   id: element.dataValues.poster
//                 }
//               }).then(function (result) {
//                 pname = result[0].uname
//                 let com = {
//                   id: element.dataValues.id,
//                   msg: element.dataValues.msg,
//                   poster: element.dataValues.poster,
//                   createdAt: element.dataValues.createdAt,
//                   updatedAt: element.dataValues.updatedAt,
//                   posterName: pname
//                 }
//                 allComments.push(com);
//               })
//             });
//             var obj = {
//               wishlist: wishlist[0].dataValues,
//               comments: allComments,
//               items: allItems,
//               creatorName: creatorName
//             }
//             res.render('wishlist_admin', obj);
//           })
//         })
//       })
//     })
//   })

//   app.get("/wishlist/search", function (req, res) {
//     res.render('search');
//   })

//   app.get("/wishlist/new_list", function (req, res) {
//     res.render('new_list');
//   })

//   //need a route for the wishlist. probably looks like "/wishlists/:id"
//   app.get("/wishlist/:id", function (req, res) {
//     db.wishlists.findAll({
//       where: {
//         id: req.params.id
//       }
//     }).then(function (result) {
//       var wishlist = result;

//       db.items.findAll({
//         where: {
//           wishlistID: wishlist[0].dataValues.id
//         }
//       }).then(function (result) {
//         var items = result;
//         db.comments.findAll({
//           where: {
//             wishlistID: wishlist[0].dataValues.id
//           }
//         }).then(function (result) {
//           var comments = result;
//           db.users.findAll({
//             where: {
//               id: wishlist[0].dataValues.creatorID
//             }
//           }).then(function (result) {
//             let creatorName = result[0].uname;
//             let allItems = new Array()
//             items.forEach(element => {
//               allItems.push(element.dataValues);
//             });
//             let allComments = new Array()
//             comments.forEach(element => {
//               console.log("-----------------" + JSON.stringify(result))
//               db.users.findAll({
//                 where: {
//                   id: element.dataValues.poster
//                 }
//               }).then(function (result) {
//                 pname = result[0].uname
//                 let com = {
//                   id: element.dataValues.id,
//                   msg: element.dataValues.msg,
//                   poster: element.dataValues.poster,
//                   createdAt: element.dataValues.createdAt,
//                   updatedAt: element.dataValues.updatedAt,
//                   posterName: pname
//                 }
//                 allComments.push(com);
//               })
//             });
//             var obj = {
//               wishlist: wishlist[0].dataValues,
//               comments: allComments,
//               items: allItems,
//               creatorName: creatorName
//             }
//             res.render('wishlist', obj);
//           })
//         })
//       })
//     })
//   });

//   app.get("/wishlists/subscriptions", function (req, res) {
//     res.render('subscriptions');
//   });

//   // Render 404 page for any unmatched routes
//   app.get("*", function (req, res) {
//     res.render("404");
//   });
// };