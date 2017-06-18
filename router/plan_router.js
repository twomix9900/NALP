const express = require('express');
const planRouter = express.Router();

const PlanController = require('../controllers/plan_ctrl.js');

planRouter.get('/:id', PlanController.show);
planRouter.get('/', PlanController.index);
planRouter.post('/:id', PlanController.create);
planRouter.put('/:id', PlanController.update_plan_info);
planRouter.get('/created/:id', PlanController.index_user);
planRouter.get('/rated', PlanController.index_rated);
planRouter.get('/bookmarks', PlanController.index_bookmark);
planRouter.get('/delete/:id', PlanController.delete_plan);

module.exports = planRouter;
