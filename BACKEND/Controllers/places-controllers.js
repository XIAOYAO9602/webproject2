const { validationResult } = require("express-validator");
const { MongoClient } = require("mongodb");
const objectID = require("mongodb").ObjectID;
const createError = require("http-errors");
const localDb = "mongodb://localhost:27017";

const getPlaceById = async (req, res, next) => {
  const uri = process.env.MONGO_URL || localDb;
  const client = await new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  const db = client.db("posts");
  const posts = db.collection("places");
  const placeId = req.params.pid;
  const mongoId = new objectID(placeId);
  posts.findOne({ _id: mongoId }, function (error, result) {
    if (error !== undefined && error !== null) {
      res.status(500);
      client.close();
      res.send("server errors, cannot ind the place");
    } else if (result === null) {
      res.status(404);
      client.close();
      res.send("cannot find the place to the provided id!");
    } else {
      client.close();
      res.send({
        title: result.title,
        description: result.description,
        address: result.address,
        location: result.location,
        url: result.url,
        creator: result.creator,
      });
    }
  });
};

const getPlacesByUserId = async (req, res, next) => {
  const uri = process.env.MONGO_URL || localDb;
  const client = await new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  const db = client.db("posts");
  const posts = db.collection("places");
  const userId = req.params.uid;
  // const mongoId = new objectID(userId);
  posts.findOne({ uid: userId }, function (error, result) {
    if (error !== undefined && error !== null) {
      res.status(500);
      client.close();
      res.send("server errors, cannot ind the place");
    } else if (result === null) {
      res.status(404);
      client.close();
      res.send("cannot find the place to the provided id!");
    } else {
      client.close();
      res.send({
        title: result.title,
        description: result.description,
        address: result.address,
        location: result.location,
        url: result.url,
        creator: result.creator,
      });
    }
  });
};

const createPlace = async (req, res, next) => {
  const uri = process.env.MONGO_URL || localDb;
  const client = await new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  const db = client.db("posts");
  const posts = db.collection("places");

  const data = req.body;
  posts.insert(
    {
      title: data.title,
      description: data.description,
      address: data.address,
      location: data.location,
      url: data.url,
      user_id: new objectID(data._id),
    },
    function (error, result) {
      if (error !== undefined && error !== null) {
        client.close();
        res.status(500);
        res.send("Server errors, cannot add new picture" + error.message);
      } else if (result == null) {
        client.close();
        res.status(400);
        res.send("Cannot add new picture:" + data.title);
      } else {
        client.close();
        res.status(200).end();
      }
    }
  );
};

const updatePlace = async (req, res, next) => {
  const uri = process.env.MONGO_URL || localDb;
  const client = await new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  const db = client.db("posts");
  const posts = db.collection("places");
  const placeId = req.params.pid;
  const mongoId = new objectID(placeId);
  const data = req.body;
  posts.findOneAndUpdate(
    { _id: mongoId },
    { $set: { title: data.title, description: data.description } },
    function (error) {
      if (error !== undefined && error !== null) {
        client.close();
        res.status(500);
        res.send(
          "Because of server errors, cannot update the information of the picture." +
            error.message
        );
      } else {
        client.close();
        res.status(200).end();
      }
    }
  );
};

const deletePlace = async (req, res, next) => {
  const uri = process.env.MONGO_URL || localDb;
  const client = await new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  const db = client.db("posts");
  const posts = db.collection("places");
  const placeId = req.params.pid;
  const mongoId = new objectID(placeId);

  // posts.delete({_id: mongoId});
  posts.deleteOne({ _id: mongoId }, function (error, result) {
    if (error !== undefined && error !== null) {
      client.close();
      res.status(500);
      res.send("Because of server errors, cannot delete the picture.");
    } else {
      client.close();
      res.status(200).end();
    }
  });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
