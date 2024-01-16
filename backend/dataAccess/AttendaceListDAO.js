import AttendaceList from "../entities/AttendanceList.js";

async function createAttendace(attendace) {
    try {
      const attendaceCreated= await AttendaceList.create(attendace);
      return{ succes:true,attendace:attendaceCreated}
  
    } catch (error) {
      console.error("Eroare :", error);
      return {succes:false};
    }
  }

  export{
    createAttendace
  }