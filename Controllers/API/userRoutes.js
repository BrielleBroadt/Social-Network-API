const router = require("express").Router()
const {User, Thought}= require("../../Models")

router.get("/", async (req, res) =>{
    try {
        const userData = await User.find().select("-__v")
        res.json(userData)
    } catch (error) {
        console.log("error")
        res.status(500).json(error)
    }
})

router.get("/:userId", async (req, res) =>{
    try {
        const userData = await User.findOne({_id:req.params.userId})
        .select("-__v")
        .populate("friends")
        .populate("thoughts")

        if (!userData) {
            return res.status(404).json({message:"no user found"})
        }
        res.json(userData)
    } catch (error) {
        console.log("error")
        res.status(500).json(error)
    }
})

router.post("/", async (req, res) =>{
    try {
       const userData = await User.create(req.body)
       res.json(userData) 
    } catch (error) {
        console.log("error")
        res.status(500).json(error)
    }
})

router.put("/:userId", async (req, res) =>{
    try {
        const userData = await User.findOneAndUpdate(
            {
            _id:req.params.userId
        },
        {
           $set:req.body 
        },
        {
            runValidators: true, 
            new: true
        }
        );
        if (!userData) {
            return res.status(404).json({message:"no user found"})
        }
        res.json(userData)
    } catch (error) {
        console.log("error")
        res.status(500).json(error)
    }
})

router.delete("/:userId", async (req, res) =>{
    try {
        const userData = await User.findOneAndDelete({_id:req.params.userId})
        if (!userData) {
            return res.status(404).json({message:"no user found"})
        }
        await Thought.deleteMany({_id:{$in:userData.thoughts}})
        res.json({message: "user and associated thoughts deleted"})
    } catch (error) {
        console.log("error")
        res.status(500).json(error)
    }
})

router.post("/:userId/friends/:friendId", async (req, res) =>{
    try {
        const userData = await User.findOneAndUpdate(
            {
                _id:req.params.userId

        },
        {
            $addToSet:{friends:req.params.friendId}
        },
        {
            new:true
        }
        )
        if (!userData) {
            return res.status(404).json({message:"no user found"})
        }
        res.json(userData)
    } catch (error) {
        console.log("error")
        res.status(500).json(error)
    }
})

router.delete("/:userId/friends/:friendId", async (req, res) =>{
    try {
        const userData = await User.findOneAndUpdate(
            {
                _id:req.params.userId

        },
        {
            $pull:{friends:req.params.friendId}
        },
        {
            new:true
        }
        )
        if (!userData) {
            return res.status(404).json({message:"no user found"})
        }
        res.json(userData)
    } catch (error) {
        console.log("error")
        res.status(500).json(error)
    }
})

module.exports= router;