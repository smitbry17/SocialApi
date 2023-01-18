const { User, Thought } = require('../models');

const userController = {
    getUsers(req,res) {
        User.find()
        .select('-__V')
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    getSingleUser(req,res) {
        User.findOne({_id: req.params.userId})
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
        .then((dbUserData) => {
            if (!dbUserData){
            return res.status(404).json({'No user was found with this id'});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    createUser(req,res) {
        User.create(req.body)
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    updateUser(req,res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {
                $set: req.body,
            },
            {
                runValidators: true,
                new: true,
            }
        )
        .then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({ message: 'No user with this id'});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    deleteUser(req,res) {
        User.findOneAndDelete(
            {_id: req.params.userId},
        )
        .then((dbUserData) => {
            if(!dbUserData){
                return res.status(404).json({ message: 'No user with this id'});
            }
        })
        .then(() => {
            res.json({message: 'User has been found and deleted'});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    addFriend(req,res) {
        User.findOneAndUpdate({_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {new: true},
            )
            .then((dbUserData) => {
                if(!dbUserData){
                    return res.status(404).json({message: 'No User with this id'})
                }
            })
            .then(() => {
                res.json({message: 'User has been added as a friend'})
            })
            .catch(() => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    deleteFriend(req,res) {
        User.findOneAndDelete({_id: req.params.userId},
            {$pull: {friends: req.params.friendId},
        },
        {new: true},)
        .then((dbUserData) => {
            if(!dbUserData){
                return res.status(404).json({message: 'No user with this id'})
            }
        })
        .then(() => {
            res.json({message: 'User has been removed as friend'})
        })
        .catch(() => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};

module.exports = userController;