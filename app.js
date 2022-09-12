const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const databasePath = path.join(__dirname, "todoApplication.db");

const app = express();

app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

app.get("/todo/", (request, response) => {
  const { status } = request.query;
  if (status !== undefined) {
    getTodoStatusQuery = `
        select * from todo where status like '${status}'; `;
    getTodoStatus = database.all(getTodoStatusQuery);
    response.send(getTodoStatus);
  } else {
    response.status = 400;
    response.send("Invalid todo Status");
  }
});
