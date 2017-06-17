const express = require('express');
const planRouter = express.Router();

const PlanController = require('../controllers/plan_ctrl.js');

planRouter.get('/plans/:id', PlanController.show);
planRouter.get('/plans', PlanController.index);
planRouter.post('/plans', PlanController.create);
planRouter.put('/plans', PlanController.update);
planRouter.get('/plans/created/:id', PlanController.index_user);
planRouter.get('/plans/rated', PlanController.index_rated);
planRouter.get('/plans/bookmarks', PlanController.index_bookmark);
planRouter.get('/plans/delete/:id', PlanController.delete_plan);

module.exports = planRouter;
