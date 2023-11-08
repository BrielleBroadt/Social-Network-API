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
                email: "userA@test.com",
                thought: [],
                friends: [],
            });
            const UserB = await User.create({
                username: "userB",
                email: "userB@test.com",
                thought: [],
                friends: [],
            });
            const UserC = await User.create({
                username: "userC",
                email: "userC@test.com",
                thought: [],
                friends: [],
            });
            const UserD = await User.create({
                username: "userD",
                email: "userD@test.com",
                thought: [],
                friends: [],
            });
        }
    }
}