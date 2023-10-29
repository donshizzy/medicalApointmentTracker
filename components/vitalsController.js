const Vitals = require('../models/vitals.model');
const Profile = require('../models/profile.model');
// const User = require('../models/user.model');

const addUserVitalsDetail = async (req, res) => {
    try {
        const {
            name,
            bloodGroup,
            pulseRate,
            respiratoryRate,
            bloodPressure,
            bodyTemp
        } = req.body;

        if (!name || !bloodGroup || !pulseRate || !respiratoryRate || !bloodPressure || !bodyTemp) {
            return res.status(400).json({ message: 'All data required!' });
        }

        // Find a user profile where the supplied 'name' matches 'firstName' or 'lastName'
        const userProfile = await Profile.findOne({
            $or: [{ firstName: name }, { lastName: name }]
        });

        if (userProfile) {
            const designation = userProfile.designation;

            const vitals = new Vitals({
                name,
                bloodGroup,
                bloodPressure,
                pulseRate,
                respiratoryRate,
                bodyTemp
            });

            await vitals.save();

            return res.status(201).json({ message: 'Success' , designation:designation });
        } else {
            return res.status(201).json({ message: `User with ${name} not found in database`, designation:'Others' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    addUserVitalsDetail
}
