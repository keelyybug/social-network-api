const User = require('../models');

const userController ={
// !get all user
getUsers(res,req) {
    userController.find()
    .sort({createdAt: -1})
    .then((dbUserData) => {
        res.json(dbUserData);
    })
    .catch((err) =>{
        console.log(err);
        res.status(500).json(err);
    });
},
// ! get single user
getSingleUser(res,req) {
    User.findOne({_id: req.params.userId})
    .then((dbUserData) =>{
        if(!dbUserData){
            return res.status(404).json({message:'No User with this id!'});
        }
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    })
},
//!create user
createUser(req, res){
    User.create(req.body)
    .then((dbUserData)=> {
        return User.findOneAndUpdate(
            {_id: req.body.userId},
            {$push:{ users:dbUserData._id}},
            {new: true}
        );
    }).then((dbUserData)=>{
        return res.json(dbUserData)
    }).catch((err)=> {
        console.log(err);
        res.status(500).json(err);
    })
},
//!update singel user
updateUser(res,req){
    User.findOneAndUpdate(
        {_id: req.body.userId},
        {$set: req.body},
        {new: true}
    ).then((dbUserData) =>{
        return res.json(dbUserData)
    }).catch((err)=> {
        console.log(err);
        res.status(500).json(err);
    })
},
//!delete user
updateUser(res,req){
    User.findOneAndUpdate(
        {_id: req.body.userId},
        {$set: req.body},
        {new: true}
    ).then((dbUserData) =>{
        return res.json(dbUserData)
    }).catch((err)=> {
        console.log(err);
        res.status(500).json(err);
    })
},
   //! add friend 
   addFriend(res,req){
    User.findAndUpdate(
        {_id: req.params.friendId},
        {$addToSet: {friends: req.body}},
        {new: true}
    ).then((dbFriendData) =>{
        return res.json(dbFriendData)
    }).catch((err)=> {
        console.log(err);
        res.status(500).json(err);
    })
},
//! remove Friend
removeFriend(res,req){
    User.findAndUpdate(
        {_id: req.params.friendId},
        {$pull: {friends: {friendId: req.params.friendId}}},
        {new: true}
    ).then((dbFriendData) =>{
        return res.json(dbFriendData)
    }).catch((err)=> {
        console.log(err);
        res.status(500).json(err);
    })
}
}
