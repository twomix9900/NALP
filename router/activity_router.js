const express = require('express');
const activityRouter = express.Router();

const ActivityController = require('../controllers/activity_ctrl.js');

activityRouter.get('/bookmarked/:id', ActivityController.bookmarked);
activityRouter.get('/created/:id', ActivityController.created);
activityRouter.get('/completed/:id', ActivityController.completed);

module.exports = activityRouter;
