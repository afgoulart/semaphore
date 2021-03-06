var resource = require('resource-router-middleware');
var assert = require('assert');
var ObjectID = require('mongodb').ObjectID;
var users = [];
var collectionName = 'application';

module.exports = function(db) {  
  return resource({
    mergeParams: true,
    
    /** Property name to store preloaded entity on `request`. */
    id : 'id',

    /** For requests with an `id`, you can auto-load the entity.
     *	Errors terminate the request, success sets `req[id] = data`.
    */
    load : function(req, id, callback) {
      console.log('>>>>>>>>> load')
      // var user = users.filter(function(user){ return user.id===id; })[0];
      // if (!user) {
      //   callback('Not found');
      // }
      // else {
      //   callback(null, user);
      // }
      callback()
    },
    
    index: function({params}, res) {
      console.log('>>>>>>>>>>> index');
      var collection = db.collection(collectionName);
      collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);

        res.json(docs);
      })
    },

    /** GET / - List all entities */
    list : function(req, res) {
      console.log('>>>>>>> list');
      res.json(users);
    },

    /** POST / - Create a new entity */
    create : function(req, res) {
      console.log('>>>>>>> create');
      var user = req.body;
      user.id = users.length.toString(36);
      users.push(user);
      res.json(user);
    },

    /** GET /:id - Return a given entity */
    read : function({params}, res) {
      var {id} = params;
      console.log('>>>>>>> read', params, id);
      var applications = db.collection(collectionName);
      applications.findOne({'_id': ObjectID(id)}, function(err, doc) {
        assert.equal(err, null);

        res.json(doc);
        // var profiles = db.collection('profile');
        // profiles.find({application: doc.name}).toArray(function(pErr, profiles) {
          // res.json(Object.assign({}, doc, {profiles:profiles}));
        // })
      });
    },

    /** PUT /:id - Update a given entity */
    update : function(req, res) {
      console.log('>>>>>>> update');
      var id = req.params[this.id];

      for (var i=users.length; i--; ) {
        if (users[i].id===id) {
          users[i] = req.body;
          users[i].id = id;
          return res.status(204).send('Accepted');
        }
      }
      res.status(404).send('Not found');
    },

    /** DELETE /:id - Delete a given entity */
    delete : function(req, res) {
      console.log('>>>>>>> delete');
      var id = req.params[this.id];

      for (var i=users.length; i--; ) {
        if (users[i].id===id) {
          users.splice(i, 1);
          return res.status(200);
        }
      }

      res.status(404).send('Not found');
    }
  })
};