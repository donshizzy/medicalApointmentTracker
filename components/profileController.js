const Profile = require("../models/profile.model");
const { toCapitalize } = require("../utils/formatter");
const mongoose = require("mongoose");

const addUserProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      designation,
      address,
      staffPhysicalId,
      dofa,
      dob,
      gender,
      department
    } = req.body;

    if (!name || !phone || !designation || !address || !staffPhysicalId || !dofa || !dob || !gender || !department) {
      return res.status(400).json({ message: "all inputs required" });
    }

    const alreadyRegistered = await Profile.findOne({
      name,
      phone,
      staffPhysicalId
    });

    if (alreadyRegistered) {
      return res.status(400).json({ message: "data already registered" });
    }

    const userId = req.user._id;
    const profile = new Profile({
      userId,
      name:name,
      phone,
      designation: toCapitalize(designation),
      address,
      staffPhysicalId,
      dofa,
      dob,
      gender,
      department
    });

    await profile.save();

    return res.status(201).json({
      message: "Profile saved successfully",
      data: {
        ...profile.toObject(),
        userId,
      },
      designation: profile.designation,
    });
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = {
  addUserProfile,
};
