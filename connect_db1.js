const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "mydatabase.db");

let db = null;

// Function to initialize the database and start the server
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Start the server
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/student/");
    });

  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1); // Stop execution if DB connection fails
  }
};

initializeDBAndServer();

// ✅ API to Add a Student
app.post("/student/", async (request, response) => {
  const studentDetails = request.body;
    const { id, name, tot_marks } = studentDetails;

    
    const addStudentQuery = `
      INSERT INTO student (id, name, tot_marks)
      VALUES (${id} , '${name}' , ${tot_marks});
    `;

    // Use parameterized query to prevent SQL injection
    const dbResponse = await db.run(addStudentQuery);
    const studentId = dbResponse.lastID;
    response.send({studentId:studentId});
    
  }
);
