const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

// Connect Database

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://myHome:LfJd6cQjvRuaYm6v@cluster0.opkciwj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    client.connect();

    const propertiesCollection = client.db("myHome").collection("properties");
    const usersCollection = client.db("myHome").collection("users");

    // My API's

    app.get("/properties", async (req, res) => {
      const { page, limit } = req.query;

      const skip = (page - 1) * limit;

      const result = await propertiesCollection
        .find()
        .sort({ title: 1 })
        .skip(skip)
        .limit(parseInt(limit))
        .toArray();

      res.send(result);
    });

    app.get("/propertiesFilterOptions", async (req, res) => {
      const properties = await propertiesCollection.find().toArray();

      const types = [
        ...new Set(properties.map((property) => property.listed_in)),
      ];

      const categories = [
        ...new Set(properties.map((property) => property.category)),
      ];

      const cities = [
        ...new Set(properties.map((property) => property.address.city)),
      ];

      res.send({ types, categories, cities });
    });

    app.get("/totalPages", async (req, res) => {
      const { limit } = req.query;

      const filter = {};

      const total = await propertiesCollection.countDocuments(filter);

      const totalPages = Math.ceil(total / limit);

      res.send({ pages: totalPages });
    });

    app.get("/properties/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await propertiesCollection.findOne(query);

      res.send(result);
    });

    app.get("/latestProperties", async (req, res) => {
      const result = await propertiesCollection
        .aggregate([
          {
            $addFields: {
              date: { $toDate: "$available_from" },
            },
          },
          { $sort: { date: -1 } },
        ])
        .limit(6)
        .toArray();

      res.send(result);
    });

    app.get("/featuredProperties", async (req, res) => {
      const result = await propertiesCollection
        .aggregate([
          {
            $match: {
              featured: true,
            },
          },
          {
            $addFields: {
              date: {
                $toDate: "$available_from",
              },
            },
          },
          {
            $sort: {
              date: -1,
            },
          },
        ])
        .toArray();

      const featuredProperties = result.slice(0, 2);

      res.send(featuredProperties);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;

      const exist = await usersCollection.findOne({ email: user?.email });

      if (exist) {
        return res.send({ exist: true });
      }

      const result = await usersCollection.insertOne(user);

      res.send(result);
    });

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
  res.send({ response: "My Home" });
});

app.listen(port);
