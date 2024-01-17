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
  async function getAllAttendaces() {
    try {
      const attendaces = await AttendaceList.findAll();
      return { success: true, attendaces: attendaces };
    } catch (error) {
      console.error("Eroare :", error);
      return { success: false};
    }
  }

  export{
    createAttendace,
    getAllAttendaces
  }