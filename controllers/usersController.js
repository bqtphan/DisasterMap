const db = require('../models');

// include: [{
//   model: db.MapMessage,
// }]

module.exports = {
    findAll: (req, res) => {
        db.User
          .findAll(req.query)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      findById: (req, res) => {
        db.User
          .findById(req.params.id)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      create: (req, res) => {
        db.User
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      update: (req, res) => {
        db.User
          .update(
              req.body, 
              { where: {
                  id: req.params.id 
                } 
            })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      remove: (req, res) => {
        db.User
          .destory({ 
              where: {
                  id: req.params.id 
                }
            })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      }
}