const mongoose = require("mongoose");
const { Schema } = mongoose;

const userProfileSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: "String",
    required: true,
  },
  phone: {
    type: "String",
    min: 9,
    required: true,
  },
  designation: {
    type: "String",
    enum: ["Staff", "Patient", "Student", "Others"],
  },
  address: {
    type: "String",
  },
  staffPhysicalId: {
    type: "String",
  },
  dofa: {
    type: "Date",
  },
  dob: {
    type: "Date",
  },
  gender: {
      type: "String",
      enum: ["Female", "Male"]
    },
    department: {
      type:'String'
  }
});

const Profile = mongoose.model("Profile", userProfileSchema);
module.exports = Profile;
