const mongoose = require("mongoose");
const DataSchema = mongoose.Schema({
    FirstName: { type: String },
    LastName: { type: String },
    EmailAddress: { type: String },
    MobileNumber: { type: String },
    City: { type: String },
    Username: { type: String, unique: true },
    Password: { type: String }




}, {timestamps: true, versionKey: false,autoIndex: true });
const UserProfileModel = mongoose.model("UserProfiles", DataSchema)
module.exports = UserProfileModel;