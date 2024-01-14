import express from 'express';
import {getAllEvents,getEventById,createEvent} from '../dataAccess/EventDAO.js';

let eventRouter = express.Router();

eventRouter.route('/event').post(async (req, res) => {
    return res.status(201).json(await createEvent(req.body));
})
eventRouter.route('/events').get(async (req, res) => {
    return res.json(await getAllEvents());
})
eventRouter.route('/event/:id').get(async (req, res) => {
    return res.json(await getEventById(req.params.id));
})

export default eventRouter;