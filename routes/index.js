const express = require('express');
const router = express.Router();
const userRouter = require("./api/users")
const expensesRouter = require("./api/expenses")
const adminRouter = require("./api/admin")

router.use("/users", userRouter)
router.use("/expenses", expensesRouter)
router.use("/admin", adminRouter)

module.exports = router;
