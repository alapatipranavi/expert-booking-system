const express = require("express");
const router = express.Router();
const Expert = require("../models/Expert");

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "", category } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    const experts = await Expert.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Expert.countDocuments(query);

    res.json({
      experts,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);

    if (!expert) {
      return res.status(404).json({ message: "Expert not found" });
    }

    res.json(expert);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;