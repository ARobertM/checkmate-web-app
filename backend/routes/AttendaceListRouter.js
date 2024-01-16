import express from 'express';
import { createAttendace } from '../dataAccess/AttendaceListDAO.js';


let attendaceRouter=express.Router();

attendaceRouter.route('/attendace').post(async (req, res) => {
    return res.status(201).json(await createAttendace(req.body));
})

export default attendaceRouter;