
var express = require('express');
var router = express.Router();
const Celebrity = require('../models/Celebrity');

// Celebrities List  READ
router.get('/', (req, res, next) => { // It represent /celebrities => it is defined in app.js
  // Iteration #2
  Celebrity.find({}, (err, celebrities) => {
    if (err) {
      return next(err);
    } else {
      res.render('celebrity', {
        celebrities: celebrities
      });
    }
  });
});
//  Show template form adding
router.get('/new', function(req, res, next) {
    res.render('new',{title: 'New Celebrity'});
});

//  Adding new celebrity CREATE
router.post('/', function(req, res, next) {
  let celeb = new Celebrity({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  });
  celeb.save((err, obj) => {
    res.redirect('/celebrities');
  });
});

// Celebrity detail
router.get('/:id', function(req, res, next) {
  Celebrity.findById(req.params.id, (err, celeb) => {
    if(err){
      console.log(err);
    }
    res.render('celebrityDetail', {
      title: 'Celebrity Detail',
      celeb: celeb
    });
  });
});


// Update a product
router.post('/:id', function(req, res, next) {

  let updates = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  };
  console.log(updates);
  Celebrity.findByIdAndUpdate(req.params.id, updates, (err, celeb) => {
    if(err){
      console.log(err);
    }
    res.redirect(`/celebrities/${celeb._id}`);
  });
});

// Update Celebrity detail template form
router.get('/:id/edit', function(req, res, next) {
  Celebrity.findById(req.params.id, (err, celeb) => {
    if(err){
      console.log(err);
    }
    res.render('edit', {
      title: 'Update Celebrity',
      celeb: celeb
    });
  });
});

// Delete a product
router.get('/:id/delete', function(req, res, next) {
  let id = req.params.id;
  Celebrity.findByIdAndRemove(id, (err, obj) => {
    if (err){ return next(err); }
    res.redirect("/celebrities");
  });
});








module.exports = router;
