const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middlewere

app.use(cors());
app.use(express.json());

console.log(process.env.DB_PASS);

// 0JNrScj9pyQq3wmC

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mimqwr5.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const toyCollection = client.db("toysWorld").collection("toystoe");

    app.post("/signgleToys", async (req, res) => {
      const toysbooking = req.body;
      // console.log(toysbooking);
      const result = await toyCollection.insertOne(toysbooking);
      res.send(result);
    });

    app.get("/signgleToys", async (req, res) => {
      const cursor = toyCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // app.get("/signgleToyByEmail", async (req, res) => {
    //   console.log(req.query.email);
    //   let query = {};
    //   if (req.query?.email) {
    //     query = { sellerEmail: req.query.email };
    //   }
    //   const result = await toyCollection.find(query).toArray();
    //   res.send(result);
    // });

    // app.get("/signgleToys/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: new ObjectId(id) };

    //   // const options = {
    //   //   projection: {
    //   //     picture: 1,
    //   //     name: 1,
    //   //     sellerName: 1,
    //   //     sellerEmail: 1,
    //   //     Price: 1,
    //   //     Rating: 1,
    //   //     Quantity:1,
    //   //     Description:1
    //   //   },
    //   // };
    //   const result = await toyCollection.findOne(query);
    //   res.send(result);
    // });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("toy is running");
});

app.listen(port, () => {
  console.log(`Toystore server is running on port ${port}`);
});
