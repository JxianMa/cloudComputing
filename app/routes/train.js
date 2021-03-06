// train routers
var express = require('express');
var TrainHandler = express.Router();

// middleware to use for all requests
TrainHandler.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
TrainHandler.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to ddos world!' });
});

// on routes that end in /bears
// ----------------------------------------------------
TrainHandler.route('/map')

    .post(function(req, res) {

        var map = new Map();		// create a new instance of the Bear model
        map.recordId = req.body.recordId;  // set the bears name (comes from the request)

        map.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'map created!' });
        });


    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Map.find(function(err, result) {
            if (err)
                res.send(err);

            res.json(result);
        });
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
TrainHandler.route('/map/:record_id')

    // get the bear with that id
    .get(function(req, res) {
        Map.findById(req.params.record_id, function(err, map) {
            if (err)
                res.send(err);
            res.json(map);
        });
    });

module.exports = router;
