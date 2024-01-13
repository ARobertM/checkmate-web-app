import express from 'express';
import {getEvent,getEventById,createEvent} from '../dataAccess/EventDAO.js';

let eventRouter = express.Router();

eventRouter.route('/events').post(async (req, res) => {
    return res.status(201).json(await createEvent(req.body));
})
eventRouter.route('/events').get(async (req, res) => {
    return res.json(await getEvent());
})
eventRouter.route('/events/:id').post(async (req, res) => {
    return res.json(await getEventById(req.params.id));
})

export default eventRouter;