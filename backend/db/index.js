const express = require('express');
const mongoose = require('mongoose');
const { Robot, Manipulator, ControlModule, Floor, Basic, Controller, Additional, Application, Robotware } = require('./your-model-file'); // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://proto_one:BzeZibiazOf8dAVJ@cluster0.y8n2ncf.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());

// Route to get a robot and all associated data
app.get('/robots/:name', async (req, res) => {
    try {
        const robotName = req.params.name;
        const robot = await Robot.findOne({ name: robotName });

        if (!robot) {
            return res.status(404).json({ message: 'Robot not found' });
        }

        const manipulators = await Manipulator.find({ robot: robot._id });
        const controlModules = await ControlModule.find({ robot: robot._id });
        const floors = await Floor.find({ robot: robot._id });
        const basics = await Basic.find({ robot: robot._id });
        const controllers = await Controller.find({ robot: robot._id });
        const additionals = await Additional.find({ robot: robot._id });
        const applications = await Application.find({ robot: robot._id });
        const robotwares = await Robotware.find({ robot: robot._id });

        res.json({
            robot,
            manipulators,
            controlModules,
            floors,
            basics,
            controllers,
            additionals,
            applications,
            robotwares
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
