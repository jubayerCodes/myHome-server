const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors());

// Connect Database

const { MongoClient, ServerApiVersion } = require("mongodb");
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

    // My API's
    app.get("/properties", async (req, res) => {
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
  res.send("My Home");
});

app.listen(port);
