const connection = require(".//Config/Connection");
const { Thought, User } = require("../Models");
const mongoose = require("mongoose");

const seedData = async () => {
    try {
        const existingUser = await User.find();
        const existingThought = await Thought.find();
// Creating a user for db
        if (existingUser.length === 0){
            const UserA = await User.create({
                username: "UserA",
                email: "UserA@test.com",
                thought: [],
                friends: [],
            });
            const UserB = await User.create({
                username: "userB",
                email: "UserB@test.com",
                thought: [],
                friends: [],
            });
            const UserC = await User.create({
                username: "UserC",
                email: "UserC@test.com",
                thought: [],
                friends: [],
            });
            const UserD = await User.create({
                username: "UserD",
                email: "UserD@test.com",
                thought: [],
                friends: [],
            });
// establishing friends relationship 
UserA.friends.push(UserB, UserC, UserD);
UserB.friends.push(UserA, UserC, UserD);
UserC.friends.push(UserA, UserB, UserD);
UserD.friends.push(UserA, UserB, UserC);
// saving changes made
await UserA.save();
await UserB.save();
await UserC.save();
await UserD.save();
// console logging answers
console.log("Data was created sucessfully");
        }else{
            console.log("data already exists")
        }
// making thoughts with reactions
if (existingThought.length === 0){
const thoughtUserA = await User.findOne({username: "UserA"});
const thoughtUserB = await User.findOne({username: "UserB"});
const thoughtUserC = await User.findOne({username: "UserC"});
const thoughtUserD = await User.findOne({username: "UserD"});

const thoughtA = await Thought.create({
    thoughtText: "Here is a thought A",
    username: thoughtUserA.username,
    createdAt: new Date(),
    reactions:[
        {
        reactionBody: "I aknowledge your thought.",
        username: thoughtUserB.username,
        createdAt: new Date(),
        reactionID: newmongoose.Types.ObjectID
        
    }
})
}



        }
    }
}