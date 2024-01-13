import Event from "../entities/Event.js"
import User from "../entities/User.js"
//+ altii ca sa facem query-uri (sem 9)


async function getEvent(){
    return await Event.findAll({include : ["Evenimente"]});
}

async function getEventById(id){
    return await Event.findByPk(id, {include : ["Evenimente"]});
}

async function createEvent(event){
    return await Event.create(event, {include : [{model : User, as : "Evenimente"}]});
}

export {
    getEvent,
    getEventById,
    createEvent
}