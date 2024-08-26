const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

// Connect Database

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.opkciwj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    const agentsCollection = client.db("myHome").collection("agents");

    // My API's

    app.get("/properties", async (req, res) => {
      const { page, limit, type, category, city, sort: sortBy } = req.query;

      let skip = 0;

      if (page && limit) {
        skip = (page - 1) * limit;
      }

      let query = {};

      if (type) {
        query.listed_in = type;
      }

      if (category) {
        query.category = category;
      }
      if (city) {
        query["address.city"] = city;
      }

      let sort = { title: 1 };

      if (sortBy === "price_high_low") {
        sort = { price: -1 };
      } else if (sortBy === "price_low_high") {
        sort = { price: 1 };
      } else if (sortBy === "newest_first") {
        sort = { date: -1 };
      } else if (sortBy === "oldest_first") {
        sort = { date: 1 };
      } else if (sortBy === "bedrooms_high_low") {
        sort = { bedrooms: -1 };
      } else if (sortBy === "bedrooms_low_high") {
        sort = { bedrooms: 1 };
      } else if (sortBy === "bathrooms_high_low") {
        sort = { bathrooms: -1 };
      } else if (sortBy === "bathrooms_low_high") {
        sort = { bathrooms: 1 };
      }

      // const result = await propertiesCollection
      //   .find(query)
      //   .sort()
      //   .skip(skip)
      //   .limit(parseInt(limit))
      //   .toArray();

      const aggregateOptions = [
        {
          $match: query,
        },
        {
          $addFields: {
            date: {
              $toDate: "$available_from",
            },
          },
        },
        {
          $sort: sort,
        },
        {
          $skip: skip,
        },
      ];

      if (limit) {
        aggregateOptions.push({ $limit: parseInt(limit) });
      }

      const result = await propertiesCollection
        .aggregate(aggregateOptions)
        .toArray();

      res.send(result);
    });

    app.get("/similarProperties", async (req, res) => {
      const { type, category, _id } = req?.query;

      const sort = { date: -1 };

      let query = {};

      if (type) {
        query.listed_in = type;
      }

      if (category) {
        query.category = category;
      }

      const aggregateOptions = [
        { $match: query },
        { $sort: sort },
        { $limit: 2 },
      ];

      const result = await propertiesCollection
        .aggregate(aggregateOptions)
        .toArray();

      const final = result?.filter(
        (property) => property?._id !== new ObjectId(_id)
      );

      res.send(final);
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
      const { limit, type, category, city } = req.query;

      let query = {};

      if (type) {
        query.listed_in = type;
      }

      if (category) {
        query.category = category;
      }

      if (city) {
        query["address.city"] = city;
      }

      const total = await propertiesCollection.countDocuments(query);

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

      if (user?.role === "agent") {
        const createAgent = await agentsCollection.insertOne(user);
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
