const express = require("express");
const router = express.Router();
const { userAuthMiddleware } = require("../middlewares/userAuth");
const {addPayment, getPayments} = require("../controllers/payment");

router.use(userAuthMiddleware);
router.get("/", getPayments);
router.post("/", addPayment);
module.exports = router;