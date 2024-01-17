import express from 'express';
import { getAllUsers,getUserById,getUserByEmail,createUser,getUsersForEvent } from '../dataAccess/UserDAO.js';

let userRouter=express.Router();

userRouter.route('/user').post(async (req, res) => {
    return res.status(201).json(await createUser(req.body));
})
userRouter.route('/users').get(async ( req,res) => {
    return res.json(await getAllUsers());
})
userRouter.route('/user/:id').get(async (req, res) => {
    return res.json(await getUserById(req.params.id));
})
userRouter.route('/user/email/:email').get(async (req, res) => {
    return res.json(await getUserByEmail(req.params.email));
})
userRouter.route('/event/:eventId/users').get(async (req, res) => {
    return res.json(await getUsersForEvent(req.params.eventId));
})

export default userRouter;