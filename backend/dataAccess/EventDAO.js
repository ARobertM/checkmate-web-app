import Event from "../entities/Event.js";
import User from "../entities/User.js";

async function getAllEvents() {
  try {
    const events = await Event.findAll();
    return { success: true, events: events };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false};
  }
}

async function getEventById(id) {
  try {
    const event = await Event.findByPk(id);
    return { success: true, event: event };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false};
  }
}

async function createEvent(event) {
  try {
    const createdEvent = await Event.create(event);

    return { success: true, event: createdEvent };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false };
  }
}

//select pe toate eventurile create de un anumit user
async function getEventsByUserId(userId) {
  try {
    const events = await Event.findAll({
      where: {
        UserId: userId,
      },
    });
    return { success: true, events: events };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false };
  }
}

//select pe toate eventurile care apartin de un group
async function getEventsByGroup(groupId) {
  try {
    const events = await Event.findAll({
      where: {
        GroupId: groupId,
      },
    });

    return { success: true, events: events };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false};
  }
}

//update pentru enumul din event(OPEN/CLOSED)
async function updateEventStatus(status, eventId) {
  try {
    const updatedEvent = await Event.update(
      { EventStatus: status },
      { where: { EventId: eventId } }
    );

    if (updatedEvent[0] === 1) {
      return { success: true, message: "Actualizare cu succes." };
    } else {
      return {
        success: false,
        message: "Evenimentul nu a fost găsit sau nu a fost actualizat.",
      };
    }
  } catch (error) {
    console.error("Eroare la actualizare:", error);
    return { success: false, message: "Eroare la actualizare." };
  }
}

async function deleteEventById(eventId) {
  try {
    const event = await Event.destroy({
      where: {
        EventId: eventId,
      },
    });
    if(event>0)
    return { success: true};
  else return {success:false}
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false};
  }
}


//select pentru toate evenimentele la care participa un user
async function getEventsForUser(id) {
  try {
    const user = await User.findByPk(id, {
      include: [
        {
          model: Event,
          as: "Events", // Asocierea definită în model
        },
      ],
    });

    const events = user.Events;

    return { success: true, events:events };
  } catch (error) {
    console.error("Eroare ", error);
    return {
      success: false,
    };
  }
}
async function getEventsByAccess(code) {
  try {
    const events = await Event.findAll({
      where: {
        EventCodAccess: code,
      },
    });

    return { success: true, events: events };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false};
  }
}

export {
  getAllEvents,
  getEventById,
  createEvent,
  getEventsByUserId,
  getEventsByGroup,
  updateEventStatus,
  deleteEventById,
  getEventsForUser,
  getEventsByAccess
};
