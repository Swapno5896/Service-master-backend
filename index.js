const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 9000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://swapno:5896@cluster0.kv6ok.mongodb.net/curd?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const dataCollection = client.db("curd").collection("one");
  // perform actions on the collection object

  //   add some data
  app.post("/addData", (req, res) => {
    const users = req.body;
    console.log(users);
    dataCollection.insertMany(users).then((result) => {
      console.log(result);
    });
  });

  // get some data

  app.get("/getData", (req, res) => {
    dataCollection.find({}).toArray((err, document) => {
      res.send(document);
    });
  });

  // delete

  const ObjectId = require("mongodb").ObjectId;

  app.delete("/deleteData/:id", (req, res) => {
    console.log(req.params.id);
    dataCollection
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
