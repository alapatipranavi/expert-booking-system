require("dotenv").config();
const mongoose = require("mongoose");
const Expert = require("./models/Expert");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected for Seeding"))
  .catch(err => console.log(err));

const experts = [
  {
    name: "Rahul Sharma",
    category: "Career",
    experience: 5,
    rating: 4.5,
    availableSlots: [
      {
        date: "2026-02-21",
        slots: ["10:00 AM", "11:00 AM", "5:00 PM"]
      },
      {
        date: "2026-02-22",
        slots: ["2:00 PM", "4:00 PM"]
      }
    ]
  },
  {
    name: "Anjali Verma",
    category: "Fitness",
    experience: 7,
    rating: 4.7,
    availableSlots: [
      {
        date: "2026-02-21",
        slots: ["6:00 AM", "7:00 AM"]
      }
    ]
  },
  {
    name: "Karan Mehta",
    category: "Finance",
    experience: 10,
    rating: 4.8,
    availableSlots: [
      {
        date: "2026-02-23",
        slots: ["3:00 PM", "6:00 PM"]
      }
    ]
  }
];

const seedData = async () => {
  try {
    await Expert.deleteMany();
    await Expert.insertMany(experts);
    console.log("Experts Seeded Successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();