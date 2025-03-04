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
    const featuredCitiesCollection = client
      .db("myHome")
      .collection("featuredCities");
    const featuredCategoriesCollection = client
      .db("myHome")
      .collection("featuredCategories");

    // My API's

    app.post("/property", async (req, res) => {
      const property = req.body;
      const result = await propertiesCollection.insertOne(property);

      res.send(result);
    });

    app.get("/properties", async (req, res) => {
      const { page, limit, category, city, sort: sortBy, status } = req.query;

      let skip = 0;

      console.log(status);

      if (page && limit) {
        skip = (page - 1) * limit;
      }

      let query = {};

      if (status) {
        query.status = status;
      }

      if (category) {
        query.category = category;
      }
      if (city) {
        query["address.city"] = city;
      }

      console.log(query);

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

    app.patch("/property/:id", async (req, res) => {
      const status = req.body;
      const id = req.params.id;

      const updatedProperty = { $set: { status: status?.status } };

      const result = await propertiesCollection.updateOne(
        {
          _id: new ObjectId(id),
        },
        updatedProperty
      );

      res.send(result);
    });

    app.delete("/property/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await propertiesCollection.deleteOne(query);

      res.send(result);
    });

    app.get("/similarProperties", async (req, res) => {
      const { category, _id } = req?.query;

      const sort = { date: -1 };

      let query = {};

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

      const final = result?.filter((property) => property?._id != _id);

      res.send(final);
    });

    app.get("/propertiesFilterOptions", async (req, res) => {
      const properties = await propertiesCollection.find().toArray();

      const categories = [
        ...new Set(properties.map((property) => property.category)),
      ];

      const cities = [
        ...new Set(properties.map((property) => property.address.city)),
      ];

      res.send({ categories, cities });
    });

    app.get("/totalPages", async (req, res) => {
      const { limit, category, city, status } = req.query;

      let query = {};

      if (status) {
        query.status = status;
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

    app.get("/featuredCities", async (req, res) => {
      const cities = await featuredCitiesCollection.find().toArray();

      const updatedPromises = cities.map(async (city) => {
        const citiesCount = await propertiesCollection.countDocuments({
          "address.city": city?.name,
          status: "active",
        });

        await featuredCitiesCollection.updateOne(
          { name: city?.name },
          { $set: { listings: citiesCount } }
        );
      });

      await Promise.all(updatedPromises);

      const updatedCities = await featuredCitiesCollection.find().toArray();

      res.send(updatedCities);
    });

    app.get("/featuredCategories", async (req, res) => {
      const categories = await featuredCategoriesCollection.find().toArray();

      const updatedPromises = categories.map(async (cat) => {
        const categoriesCount = await propertiesCollection.countDocuments({
          category: cat?.name,
          status: "active",
        });

        await featuredCategoriesCollection.updateOne(
          { name: cat?.name },
          { $set: { listings: categoriesCount } }
        );
      });

      await Promise.all(updatedPromises);

      const updatedCategories = await featuredCategoriesCollection
        .find()
        .toArray();

      res.send(updatedCategories);
    });

    app.get("/users", async (req, res) => {
      const { role, page, limit } = req.query;

      let query = {};

      if (role) {
        query.role = role;
      }

      let skip = 0;

      if (page && limit) {
        skip = (page - 1) * limit;
      }

      const aggregateOptions = [
        {
          $match: query,
        },
        {
          $sort: { displayName: 1 },
        },
        {
          $skip: skip,
        },
      ];

      if (limit) {
        aggregateOptions.push({ $limit: parseInt(limit) });
      }

      const result = await usersCollection
        .aggregate(aggregateOptions)
        .toArray();

      res.send(result);
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

    app.get("/user", async (req, res) => {
      const { email } = req?.query;
      const query = { email: email };

      const result = await usersCollection.findOne(query);

      res.send(result);
    });

    app.get("/totalUsers", async (req, res) => {
      const { role } = req.query;

      let query = {};

      if (role) {
        query.role = role;
      }

      const total = await usersCollection.countDocuments(query);

      res.send({ totalUsers: total });
    });

    app.get("/role", async (req, res) => {
      const { email } = req.query;

      const user = await usersCollection.findOne({ email: email });

      const role = user?.role;

      res.send({ role: role });
    });

    app.patch("/user", async (req, res) => {
      const email = req?.query?.email;
      const user = req?.body;

      const updatedUser = {
        $set: user,
      };

      const result = await usersCollection.updateOne(
        { email: email },
        updatedUser
      );

      res.send(result);
    });

    app.delete("/user/:uid", async (req, res) => {
      const uid = req.params.uid;

      const query = { uid: uid };

      const result = await usersCollection.deleteOne(query);
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
