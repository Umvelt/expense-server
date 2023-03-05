const express = require('express');
const router = express.Router();
const userRouter = require("./api/users")
const expensesRouter = require("./api/expenses")

router.use("/users", userRouter)
router.use("/expenses", expensesRouter)

module.exports = router;
