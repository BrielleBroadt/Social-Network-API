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
                username: "userA",
                email: "userA@test.com",
                thought: [],
                friends: [],
            });
        }
    }
}