var player = require('../models/player');

module.exports = {
	list: function(req, res) {
		player.find({ user: req.user._id }).exec().then(function(players) {
			return res.json(players);
		});
	},

	create: function(req, res) {
		var newPlayer = new player(req.body);
		newPlayer.user = req.user._id;
		newPlayer.save(function(err, player) {
			if (err) {
				return res.status(500).end();
			}
			return res.json(player);
		});
	},

	remove: function(req, res) {
    console.log(req.params.id);
    player.findOne({ id: req.params.id }, function(err, results) {
		    if (err) {
                res.status(401).json(err);
            }
            if (results) {
                player.findOneAndRemove({ id: req.params.id }, function(err, results) {
                    if (err) {
                        console.log(err)
                        res.status(403).json(err);
                    } else {
                        res.send(results);
                    }
                })
            } else {
                console.log("Player does not exist");
                //res.end(); // Not sure if this is necessary to close request if no results
            }
      })
    },
    
	update: function(req, res) {
		player.update({ _id: req.params.id }, req.body).exec(function(err) {
			return res.status(200).end();
		});

	}
};


