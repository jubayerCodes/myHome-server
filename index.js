const express = require("express");
const cors = require("cors");

const projects = [
  {
    _id: "64a6b1ba468a15cd00a1cf5c",
    title: "Luxury House in Greenville",
    agent_email: "jubayerhossain111220@gmail.com",
    description:
      "This property is mostly wooded and sits high on a hilltop overlooking the Mohawk River Valley. Located right in the heart of Upstate NYs Amish farm Country, this land is certified organic making it extremely rare! Good road frontage on a paved county road with utilities make it an amazing setting for your dream country getaway! If you like views, you must see this property!",
    price: 860000,
    category: "industrial",
    listed_in: "Sale",
    status: "Active",
    photos: [
      "https://wpresidence.net/wp-content/uploads/2017/11/house_nice_2-835x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/interior37-800x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/interior38-800x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/interior36-800x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/image3_large-835x467.jpg",
    ],
    property_size: 1098,
    featured: true,
    rooms: 8,
    bedrooms: 5,
    bathrooms: 4,
    garages: 2,
    built_year: 2010,
    garage_size: 2,
    structure_type: "brick",
    floors: 2,
    available_from: "2023-07-01",
    floor_plan:
      "https://wpresidence.net/wp-content/uploads/2018/02/flloor-plan-2.jpg",
    address: {
      address: "123 Ocean View Drive",
      city: "Chattogram",
      zip_code: "12345",
      country: "Bangladesh",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    features: {
      interior: {
        equipped_kitchen: true,
        gym: true,
        laundry: true,
        media_room: true,
      },
      outdoor: {
        backyard: true,
        basketball_court: true,
        front_yard: true,
        garage_attached: true,
        hot_bath: true,
        pool: true,
      },
      utilities: {
        central_air: true,
        electricity: true,
        heating: true,
        natural_gas: true,
        ventilation: true,
        water: true,
      },
      other: {
        chair_accessible: true,
        elevator: true,
        fireplace: true,
        smoke_detectors: true,
        washer: true,
        dryer: true,
        wifi: true,
      },
    },
  },
  {
    _id: "64a6b1ba468a15cd00a1cf6a",
    title: "Luxury House in Greenville",
    agent_email: "jubayerhossain111220@gmail.com",
    description:
      "This property is mostly wooded and sits high on a hilltop overlooking the Mohawk River Valley. Located right in the heart of Upstate NYs Amish farm Country, this land is certified organic making it extremely rare! Good road frontage on a paved county road with utilities make it an amazing setting for your dream country getaway! If you like views, you must see this property!",
    price: 860000,
    category: "Villa",
    listed_in: "Rent",
    status: "Active",
    photos: [
      "https://wpresidence.net/wp-content/uploads/2017/11/house_nice_2-835x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/interior37-800x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/interior38-800x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/interior36-800x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/image3_large-835x467.jpg",
    ],
    property_size: 1098,
    featured: true,
    rooms: 8,
    bedrooms: 5,
    bathrooms: 4,
    garages: 2,
    built_year: 2010,
    garage_size: 2,
    structure_type: "brick",
    floors: 2,
    available_from: "2023-07-01",
    floor_plan:
      "https://wpresidence.net/wp-content/uploads/2018/02/flloor-plan-2.jpg",
    address: {
      address: "123 Ocean View Drive",
      city: "Rajshahi",
      zip_code: "12345",
      country: "Bangladesh",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    features: {
      interior: {
        equipped_kitchen: true,
        gym: true,
        laundry: true,
        media_room: true,
      },
      outdoor: {
        backyard: true,
        basketball_court: true,
        front_yard: true,
        garage_attached: true,
        hot_bath: true,
        pool: true,
      },
      utilities: {
        central_air: true,
        electricity: true,
        heating: true,
        natural_gas: true,
        ventilation: true,
        water: true,
      },
      other: {
        chair_accessible: true,
        elevator: true,
        fireplace: true,
        smoke_detectors: true,
        washer: true,
        dryer: true,
        wifi: true,
      },
    },
  },
  {
    _id: "64a6b1ba468a15cd00a1cf5b",
    title: "Luxury House in Greenville",
    agent_email: "jubayerhossain111220@gmail.com",
    description:
      "This property is mostly wooded and sits high on a hilltop overlooking the Mohawk River Valley. Located right in the heart of Upstate NYs Amish farm Country, this land is certified organic making it extremely rare! Good road frontage on a paved county road with utilities make it an amazing setting for your dream country getaway! If you like views, you must see this property!",
    price: 860000,
    category: "Villa",
    listed_in: "Sale",
    status: "Active",
    photos: [
      "https://wpresidence.net/wp-content/uploads/2017/11/house_nice_2-835x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/interior37-800x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/interior38-800x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/interior36-800x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/image3_large-835x467.jpg",
    ],
    property_size: 1098,
    featured: true,
    rooms: 8,
    bedrooms: 5,
    bathrooms: 4,
    garages: 2,
    built_year: 2010,
    garage_size: 2,
    structure_type: "brick",
    floors: 2,
    available_from: "2023-07-01",
    floor_plan:
      "https://wpresidence.net/wp-content/uploads/2018/02/flloor-plan-2.jpg",
    address: {
      address: "123 Ocean View Drive",
      city: "Sylhet",
      zip_code: "12345",
      country: "Bangladesh",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    features: {
      interior: {
        equipped_kitchen: true,
        gym: true,
        laundry: true,
        media_room: true,
      },
      outdoor: {
        backyard: true,
        basketball_court: true,
        front_yard: true,
        garage_attached: true,
        hot_bath: true,
        pool: true,
      },
      utilities: {
        central_air: true,
        electricity: true,
        heating: true,
        natural_gas: true,
        ventilation: true,
        water: true,
      },
      other: {
        chair_accessible: true,
        elevator: true,
        fireplace: true,
        smoke_detectors: true,
        washer: true,
        dryer: true,
        wifi: true,
      },
    },
  },
  {
    _id: "64a6b1ba468a15cd00a1cf57",
    title: "Luxury House in Greenville",
    agent_email: "jubayerhossain111220@gmail.com",
    description:
      "This property is mostly wooded and sits high on a hilltop overlooking the Mohawk River Valley. Located right in the heart of Upstate NYs Amish farm Country, this land is certified organic making it extremely rare! Good road frontage on a paved county road with utilities make it an amazing setting for your dream country getaway! If you like views, you must see this property!",
    price: 860000,
    category: "offices",
    listed_in: "Sale",
    status: "Active",
    photos: [
      "https://wpresidence.net/wp-content/uploads/2017/11/house_nice_2-835x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/interior37-800x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/interior38-800x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/interior36-800x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/image3_large-835x467.jpg",
    ],
    property_size: 1098,
    featured: true,
    rooms: 8,
    bedrooms: 5,
    bathrooms: 4,
    garages: 2,
    built_year: 2010,
    garage_size: 2,
    structure_type: "brick",
    floors: 2,
    available_from: "2023-07-01",
    floor_plan:
      "https://wpresidence.net/wp-content/uploads/2018/02/flloor-plan-2.jpg",
    address: {
      address: "Gulshan 01",
      city: "Dhaka",
      zip_code: "1000",
      country: "Bangladesh",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    features: {
      interior: {
        equipped_kitchen: true,
        gym: true,
        laundry: true,
        media_room: true,
      },
      outdoor: {
        backyard: true,
        basketball_court: true,
        front_yard: true,
        garage_attached: true,
        hot_bath: true,
        pool: true,
      },
      utilities: {
        central_air: true,
        electricity: true,
        heating: true,
        natural_gas: true,
        ventilation: true,
        water: true,
      },
      other: {
        chair_accessible: true,
        elevator: true,
        fireplace: true,
        smoke_detectors: true,
        washer: true,
        dryer: true,
        wifi: true,
      },
    },
  },
  {
    _id: "64a6b1ba468a15cd00a1cf63",
    title: "Luxury House in Greenville",
    agent_email: "jubayerhossain111220@gmail.com",
    description:
      "This property is mostly wooded and sits high on a hilltop overlooking the Mohawk River Valley. Located right in the heart of Upstate NYs Amish farm Country, this land is certified organic making it extremely rare! Good road frontage on a paved county road with utilities make it an amazing setting for your dream country getaway! If you like views, you must see this property!",
    price: 860000,
    category: "Villa",
    listed_in: "Sale",
    status: "Active",
    photos: [
      "https://wpresidence.net/wp-content/uploads/2017/11/house_nice_2-835x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/interior37-800x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/interior38-800x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/interior36-800x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/image3_large-835x467.jpg",
    ],
    property_size: 1098,
    featured: true,
    rooms: 8,
    bedrooms: 5,
    bathrooms: 4,
    garages: 2,
    built_year: 2010,
    garage_size: 2,
    structure_type: "brick",
    floors: 2,
    available_from: "2023-07-01",
    floor_plan:
      "https://wpresidence.net/wp-content/uploads/2018/02/flloor-plan-2.jpg",
    address: {
      address: "123 Ocean View Drive",
      city: "Noakhali",
      zip_code: "12345",
      country: "Bangladesh",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    features: {
      interior: {
        equipped_kitchen: true,
        gym: true,
        laundry: true,
        media_room: true,
      },
      outdoor: {
        backyard: true,
        basketball_court: true,
        front_yard: true,
        garage_attached: true,
        hot_bath: true,
        pool: true,
      },
      utilities: {
        central_air: true,
        electricity: true,
        heating: true,
        natural_gas: true,
        ventilation: true,
        water: true,
      },
      other: {
        chair_accessible: true,
        elevator: true,
        fireplace: true,
        smoke_detectors: true,
        washer: true,
        dryer: true,
        wifi: true,
      },
    },
  },
  {
    _id: "64a6b1ba468a15cd00a1cf6b",
    title: "Luxury House in Greenville",
    agent_email: "jubayerhossain111220@gmail.com",
    description:
      "This property is mostly wooded and sits high on a hilltop overlooking the Mohawk River Valley. Located right in the heart of Upstate NYs Amish farm Country, this land is certified organic making it extremely rare! Good road frontage on a paved county road with utilities make it an amazing setting for your dream country getaway! If you like views, you must see this property!",
    price: 860000,
    category: "Villa",
    listed_in: "Rent",
    status: "Active",
    photos: [
      "https://wpresidence.net/wp-content/uploads/2017/11/house_nice_2-835x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/interior37-800x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/interior38-800x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/interior36-800x467.jpg",
      "https://wpresidence.net/wp-content/uploads/2017/11/image3_large-835x467.jpg",
    ],
    property_size: 1098,
    featured: true,
    rooms: 8,
    bedrooms: 5,
    bathrooms: 4,
    garages: 2,
    built_year: 2010,
    garage_size: 2,
    structure_type: "brick",
    floors: 2,
    available_from: "2023-07-01",
    floor_plan:
      "https://wpresidence.net/wp-content/uploads/2018/02/flloor-plan-2.jpg",
    address: {
      address: "123 Ocean View Drive",
      city: "Rangpur",
      zip_code: "12345",
      country: "Bangladesh",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    features: {
      interior: {
        equipped_kitchen: true,
        gym: true,
        laundry: true,
        media_room: true,
      },
      outdoor: {
        backyard: true,
        basketball_court: true,
        front_yard: true,
        garage_attached: true,
        hot_bath: true,
        pool: true,
      },
      utilities: {
        central_air: true,
        electricity: true,
        heating: true,
        natural_gas: true,
        ventilation: true,
        water: true,
      },
      other: {
        chair_accessible: true,
        elevator: true,
        fireplace: true,
        smoke_detectors: true,
        washer: true,
        dryer: true,
        wifi: true,
      },
    },
  },
];

const app = express();
const port = 3000;
app.use(cors());

// All endpoints here

app.get("/", (req, res) => {
  res.send({ something: "Hello World" });
});

app.get("/projects", (req, res) => {
  res.send(projects);
});

app.listen(port, () => {
  console.log("App is running in port:", port);
});
