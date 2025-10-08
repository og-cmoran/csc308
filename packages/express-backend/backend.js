import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
};

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
};

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
      (user) => user["name"] === name && user["job"] === job
    );
};
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  const id = Math.random().toString(36).substr(2, 9);
  const newUser = { ...user, id };
  users["users_list"].push(newUser);
  return newUser;
};

const deleteUser = (id) => {
  const userIndex = users["users_list"].findIndex((user) => user["id"] === id);
  if (userIndex !== -1) {
    const deletedUser = users["users_list"].splice(userIndex, 1)[0];
    return deletedUser;
  }
  return undefined;
};

app.use(cors());
app.use(express.json());
  
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined) {
      let result = findUserByNameAndJob(name, job);
      result = { users_list: result };
      res.send(result);
    }
    else if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
    }
    else {
      res.send(users);
    }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    if (!userToAdd) {
        return res.status(400).json({ 
            error: "Request body is required" 
        });
    }
    if (!userToAdd.name || !userToAdd.job) {
        return res.status(400).json({ 
            error: "Name and job are required fields" 
        });
    }
    
    const newUser = addUser(userToAdd);
    res.status(201).json(newUser);
});

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const deletedUser = deleteUser(id);
    
    if (deletedUser === undefined) {
        res.status(404).json({ error: "User not found" });
    } else {
        res.status(204).send();
    }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});