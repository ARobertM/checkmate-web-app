import Event from "../entities/Event.js"

async function getAllEvents(){
    return await Event.findAll();
}

async function getEventById(id){
    return await Event.findByPk(id);
}

async function createEvent(event){
    return await Event.create(event);
}

export {
    getAllEvents,
    getEventById,
    createEvent
}