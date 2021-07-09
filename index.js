const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("doctors"));
app.use(fileUpload());
const port = process.env.PORT || 9000;

app.get("/", (req, res) => {
  res.send("Hello service mastaer!");
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
  // portfolio
  const portfoliosCollection = client.db("servie-master").collection("portfolios");
  // products
  const productsCollection = client.db("servie-master").collection("products");




  // post single blogs
  app.post("/addBlog", (req, res) => {
    blogCollection.insertOne(req.body).then((result) => {
      console.log(result.insertedCount);
    });
  });

  // post single Portfolio
  app.post("/addPortfolio", (req, res) => {
    portfoliosCollection.insertOne(req.body).then((result) => {
      console.log(result.insertedCount);
    });
  });


  // post single products
  app.post("/addProducts", (req, res) => {
    productsCollection.insertOne(req.body).then((result) => {
      console.log(result.insertedCount);
    });
  });

  //  get all blogs
  app.get("/getBlog", (req, res) => {
    blogCollection.find({}).toArray((err, document) => {
      res.send(document);
    });
  });

  //  get all portfolio
  app.get("/getPortfolio", (req, res) => {
    portfoliosCollection.find({}).toArray((err, document) => {
      res.send(document);
    });
  });


  //  get all product
  app.get("/getProduct", (req, res) => {
    productsCollection.find({}).toArray((err, document) => {
      res.send(document);
    });
  });



  // get spacafic blog
  const ObjId = require('mongodb').ObjectID
  app.get('/getBlog/:id', (req, res) => {
    blogCollection.find({ _id: ObjId(req.params.id) })
      .toArray((err, doc) => {
        res.send(doc)
      })
  })

  // get specific portfolio
  app.get('/getProduct/:id', (req, res) => {
    portfoliosCollection.find({ _id: ObjId(req.params.id) })
      .toArray((err, doc) => {
        res.send(doc)
      })
  })


  // get spacafic Product
  // const ObjId = require('mongodb').ObjectID
  app.get('/getProduct/:id', (req, res) => {
    productsCollection.find({ _id: ObjId(req.params.id) })
      .toArray((err, doc) => {
        res.send(doc)
      })
  })


















});

// jkdslklasdlk
