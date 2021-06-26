const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 9000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kv6ok.mongodb.net/servie-master?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const blogCollection = client.db("servie-master").collection("blogs");
  // perform actions on the collection object

  //   add some data
  app.post("/addBlog", (req, res) => {
    const fakeBlog = req.body;
    console.log(fakeBlog);
    blogCollection.insertOne(fakeBlog).then((result) => {
      console.log(result.insertedCount);
    });
  });

  // get some data

  app.get("/getBlog", (req, res) => {
    blogCollection.find({}).toArray((err, document) => {
      res.send(document);
    });
  });

  // delete

  const ObjectId = require("mongodb").ObjectId;

  app.delete("/deletBlog/:id", (req, res) => {
    console.log(req.params.id);
    blogCollection
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => console.log(result));
  });

  // here we'll update our data
  app.patch("/update", (req, res) => {
    // console.log(req.params.id);
    // console.log(req.params.id,req.body.status);
    console.log("four", req.body.status, req.body.id);
    // const ObjectId = require("mongodb").ObjectId;
    bookedServiceCollection
      .updateOne(
        { _id: ObjectId(req.body.id) },
        {
          $set: { status: req.body.status },
        }
      )

      .then((result) => {
        console.log("three", result);
        res.send(result);
      });
  });
});
