const { validationResult } = require("express-validator");
const { MongoClient, ObjectID } = require("mongodb");
const createError = require("http-errors");
const localDb = "mongodb://localhost:27017";

const getUsers = async (req, res, next) => {
  const uri = process.env.MONGO_URL || localDb;
  const client = await new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  const data = req.body.data;
  const db = client.db("posts");
  const User = db.collection("user");
  const Places = db.collection("places");
  let users;
  let usersArr;
  let finalUsers = [];
  try {
    users = await User.find(
      {},
      { first_name: 1, last_name: 1, email: 0, password: 0 }
    );
    usersArr = await users.toArray();
    for (const user of usersArr) {
      console.log(user.first_name);

      const places = await Places.find({ user_id: user._id });
      const placesFound = await places.toArray();
      // console.log(placesFound)
      user.places = placesFound;
      finalUsers.push(user);
    }

    res.json(finalUsers);
  } catch (err) {
    console.log(err);
    return next(err);
  }

  // res.json(finalUsers);
};

const getUserById = async (req, res, next) => {
  const uri = process.env.MONGO_URL || localDb;
  const client = await new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  const data = req.body.data;
  const db = client.db("posts");
  const User = db.collection("user");
  const Places = db.collection("places");
  let users;

  try {
    const id = new ObjectID(req.params._id);
    user = await User.findOne({ _id: id });
    console.log(req.params._id);
    console.log(user);
    const places = await Places.find({ user_id: user._id });
    const placesFound = await places.toArray();
    user.places = placesFound;
    res.json(user);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

const signup = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next(error);
  // }
  const uri = process.env.MONGO_URL || localDb;
  const client = await new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  const db = client.db("posts");
  const user = db.collection("user");
  const data = req.body.data;
  user.findOne({ _id: data.email }, function (error, result) {
    if (error !== undefined && error !== null) {
      res.status(500);
      client.close();
      res.send("Registration failed, please try again later");
    } else if (result != null) {
      response.status(400);
      client.close();
      res.send("User exists already, login instead");
    } else {
      user.insertOne(
        { _id: data.email, name: data.name, password: data.password },
        function (error, result) {
          res.send(result);
        }
      );
    }
  });
};

const login = async (req, res, next) => {
  const uri = process.env.MONGO_URL || localDb;
  const client = await new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  const data = req.body;
  const db = client.db("posts");
  const user = db.collection("user");
  user.findOne({ email: data.email }, function (error, result) {
    if (result === null || result.password !== data.password) {
      client.close();
      res.status(403);
      res.send("Incorrect username or password.");
    } else {
      client.close();
      res.send(result);
    }
  });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.signup = signup;
exports.login = login;
