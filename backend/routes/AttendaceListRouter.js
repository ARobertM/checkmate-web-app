import express from 'express';
import { createAttendace,getAllAttendaces } from '../dataAccess/AttendaceListDAO.js';


let attendaceRouter=express.Router();

attendaceRouter.route('/attendace').post(async (req, res) => {
    return res.status(201).json(await createAttendace(req.body));
})
attendaceRouter.route('/attendaces').get(async (req, res) => {
    return res.json(await getAllAttendaces());
})

export default attendaceRouter;