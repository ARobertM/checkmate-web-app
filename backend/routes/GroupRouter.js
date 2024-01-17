import express from "express";
import { getAllGroups,getGroupsByUserId,getGroupById,createGroup } from "../dataAccess/GroupDAO.js";

let groupRouter=express.Router();

groupRouter.route('/group').post(async (req, res) => {
    return res.status(201).json(await createGroup(req.body));
})
groupRouter.route('/groups').get(async ( req,res) => {
    return res.json(await getAllGroups());
})
groupRouter.route('/group/:id').get(async (req, res) => {
    return res.json(await getGroupById(req.params.id));
})
groupRouter.route('/groups/user/:userId').get(async (req, res) => {
    return res.json(await getGroupsByUserId(req.params.userId));
})

export default groupRouter;