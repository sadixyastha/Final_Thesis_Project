const express = require("express");
const router = new express.Router();
const Category = require("../models/categoryModel")
const auth = require("../auth/auth");

router.post(
  "/category/insert",
  auth.verifyAdmin,
  async (req, res) => {
    const categoryName = req.body.categoryName;
    const category = await Category.findOne({
      categoryName: categoryName,
    });
    if (category)
      return res
        .status(400)
        .send({ message: "Category already registered with given name" });
    const data = new Category({
      categoryName: categoryName,
    });
    data
      .save()
      .then(function () {
        res
          .status(200)
          .send({ success: true, message: "New Category added successfully!" });
      })
      .catch(function (e) {
        res.status(400).send({ message: e });
      });
    // return res.json({success: true, message:"Category Inserted Successfully"});
  }
);
router.get(
  "/category/single",
  auth.verifyAdmin,
  async (req, res) => {
    const categoryData = await Category.find();
    res.json({
      success: true,
      message: "Category Data",
      data: categoryData,
    });
  }
);

router.get("/category/all", async (req, res) => {
  const CategoryData = await Category.find();
  res.json({ success: true, message: "Category Data", data: CategoryData });
});

router.delete(
  "/category/delete/:pid",
  auth.verifyAdmin,
  function (req, res) {
    const cid = req.params.cid;
   Category.deleteOne({ _id: cid })
      .then(function () {
        res.json({ success: true, message: "Category deleted" });
      })
      .catch(function () {
        res.json({ success: false, message: "Something went wrong" });
      });
  }
);
module.exports = router;
