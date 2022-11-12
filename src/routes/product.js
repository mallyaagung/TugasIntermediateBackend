const express = require("express");
const router = express.Router();
const productController = require("../controller/product");
const { protect } = require("../middleware/auth");
const { verify } = require("../middleware/verifyroles");
// const { hitCacheProductDetail, clearCacheProductDetail } = require('../middleware/redis')
const upload = require("../middleware/upload");

router.get(
  "/",
  protect,
  verify(["seller", "customer", "admin"]),
  productController.getAllProduct
);
router.get(
  "/:id",
  protect,
  verify(["seller", "customer", "admin"]),
  productController.getProduct
);
router.post(
  "/",
  protect,
  verify(["seller", "admin"]),
  upload.single("photo"),
  productController.insert
);
router.put(
  "/:id",
  protect,
  verify(["seller", "admin"]),
  upload.single("photo"),
  productController.update
);
router.delete(
  "/:id",
  protect,
  verify(["seller", "admin"]),
  productController.delete
);

module.exports = router;
