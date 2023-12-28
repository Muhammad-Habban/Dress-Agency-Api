const express = require("express");
const router = express.Router();
const { userAuthMiddleware } = require("../middlewares/userAuth");
const {getSuppliers} = require("../controllers/supplier");

router.use(userAuthMiddleware);
router.get("/", getSuppliers);
module.exports = router;