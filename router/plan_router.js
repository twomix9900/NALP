const express = require('express');
const planRouter = express.Router();

const PlanController = require('../controllers/plan_ctrl.js');

planRouter.get('/:id', PlanController.show);
planRouter.get('/', PlanController.index);
planRouter.get('/city/:city', PlanController.index);
planRouter.post('/:id', PlanController.create);
planRouter.put('/:id', PlanController.update_plan_info);
planRouter.get('/created/:id', PlanController.index_user);
planRouter.get('/rated', PlanController.index_rated);
planRouter.get('/bookmarks', PlanController.index_bookmark);
planRouter.get('/delete/:id', PlanController.delete_plan);
planRouter.post('/mark-complete/:id', PlanController.mark_plan_complete);
planRouter.post('/mark-incomplete/:id', PlanController.mark_plan_incomplete);
planRouter.post('/bookmark/:id', PlanController.toggle_bookmark);

module.exports = planRouter;
