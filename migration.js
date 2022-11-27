import connection from "./config/db.js";
import Medic from "./models/Medic.js";
import Patient from "./models/Patient.js ";
import User from "./models/User.js";
import Exam from "./models/Exam.js";

const migrate = async () => {
    try {
        const result = await connection.sync();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

migrate();