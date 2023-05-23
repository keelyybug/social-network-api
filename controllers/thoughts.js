const { Thought, User } = require('../models');

const thoughtController = {
    getThoughts(res,req) {
        thoughtController.find()
        .sort({createdAt: -1})
        .then((dbThoughtData) => {
            res.json(dbThoughtData);
        })
        .catch((err) =>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    getSingleThought(res,req) {
        Thought.findOne({_id: req.params.thoughtId})
        .then((dbThoughtData) =>{
            if(!dbThoughtData){
                return res.status(404).json({message:'No thought with this id!'});
            }
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        })
    },
    createThought(req, res){
        Thought.create(req.body)
        .then((dbThoughtData)=> {
            return User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push:{ thoughts:dbThoughtData._id}},
                {new: true}
            );
        }).then((dbUserData)=>{
            return res.json(dbUserData)
        }).catch((err)=> {
            console.log(err);
            res.status(500).json(err);
        })
    },
    //! delete thought
    deleteThought(res,req){
        Thought.findOneAndRemove(
            {_id: req.body.userId},
            {$pull:{ thoughts:dbThoughtData._id}},
            {new: true}
        ).then((dbThoughtData)=> {
        return res.json(dbThoughtData)
        }).catch((err)=> {
            console.log(err);
            res.status(500).json(err);
        })
    },
    //!update thought
    updateThought(res,req){
        Thought.findOneAndUpdate(
            {_id: req.body.userId},
            {$set: req.body},
            {new: true}
        ).then((dbThoughtData) =>{
            return res.json(dbThoughtData)
        }).catch((err)=> {
            console.log(err);
            res.status(500).json(err);
        })
    },
    //! add reaction 
    addReaction(res,req){
        Reaction.findAndUpdate(
            {_id: req.params.reactionId},
            {$addToSet: {reactions: req.body}},
            {new: true}
        ).then((dbReactionData) =>{
            return res.json(dbReactionData)
        }).catch((err)=> {
            console.log(err);
            res.status(500).json(err);
        })
    },
    //! remove reaction
    deleteReaction(res,req){
        Thought.findAndUpdate(
            {_id: req.params.reactionId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {new: true}
        ).then((dbReactionData) =>{
            return res.json(dbReactionData)
        }).catch((err)=> {
            console.log(err);
            res.status(500).json(err);
        })
    },
}
