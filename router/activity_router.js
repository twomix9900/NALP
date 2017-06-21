const express = require('express');
const activityRouter = express.Router();

const ActivityController = require('../controllers/activity_ctrl.js');

activityRouter.get('/:id', ActivityController.bookmarked);
activityRouter.get('/:id', ActivityController.created);
activityRouter.get('/:id', ActivityController.completed);

module.exports = activityRouter;
