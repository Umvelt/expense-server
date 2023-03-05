/**
 * ---------------------------------------------

 ExpenseList router:
 -------------------

 * GET: get one expense by id, get all expenses.
 * POST: post new expense to expense list.
 * PATCH: edit/modify/update one expense.
 * DELETE: delete one expense from list.

 * --------------------------------------------- *
 **/


let express = require('express');
let router = express.Router();
const Expense = require("../../models/Expenses.models");
const User = require("../../models/User.models");
const {authMiddleware} = require("../../middleware/authValidation.middleware")

router.get("/getAllExpenses", authMiddleware, async (req, res) => {
    try {
        const userExpenses = await Expense.findAll({
            attributes: {exclude: ['id', 'uuid', 'createdAt', 'updatedAt']},
            where: {expenseOwner: req.headers.uuid}
        })
        if (!userExpenses) throw "no expenses found for this user."
        return res.status(200).json({status: "Expense read successfully.", userExpenses});
    } catch (error) {
        return res.status(401).json({status: "read action blocked.", errorMsg: error})
    }
});
router.get("/getExpenseById", authMiddleware, async (req, res) => {
    try {
        let expense = await Expense.findOne({
            attributes: {exclude: ['id', 'uuid', 'createdAt', 'updatedAt']},
            where: {uuid: req.headers.uuid}
        });
        if (!expense) throw `expense not found.`
        const expenseReturned = {
            expenseName: expense.expenseName,
            expenseAmount: expense.expenseAmount,
            expenseDate: expense.expenseDate,
        }
        res.status(201).json({status: "Expense read successfully.", expenseReturned});
    } catch (error) {
        res.status(401).json({status: "read action blocked.", errorMsg: error})
    }

});
router.post("/addExpense", authMiddleware, async (req, res) => {
    try {
        let user = await User.findOne({where: {uuid: req.headers.uuid}});
        if (!user) return "Invalid user.";
        let newExpense = await Expense.create({
            expenseOwner: user.uuid,
            expenseName: req.body.expenseName,
            expenseAmount: req.body.expenseAmount,
            expenseDate: req.body.expenseDate,
        })
        const expenseReturned = {
            expenseName: newExpense.expenseName,
            expenseAmount: newExpense.expenseAmount,
            expenseDate: newExpense.expenseDate,
        }
        res.status(201).json({status: "Expense Added successfully.", expenseReturned});
    } catch (error) {
        console.log("data sent: ", req.body)
        res.status(401).json({status: "Expense blocked:", errorName: error.name, errorMsg: error.original})

    }
});
router.patch("/editExpense", authMiddleware, async (req, res) => {
    try {
        let expense = await Expense.findOne({where: {uuid: req.headers.uuid}});
        if (!expense) throw `expense not found.`
        await expense.update({
            expenseName: req.body.expenseName,
            expenseAmount: req.body.expenseAmount,
            expenseDate: req.body.expenseDate,
        }, {where: {uuid: req.headers.uuid}})
        const expenseReturned = {
            expenseName: req.body.expenseName,
            expenseAmount: req.body.expenseAmount,
            expenseDate: req.body.expenseDate,
        }
        res.status(200).json({status: "Expense edited successfully.", expenseReturned});
    } catch (error) {
        console.log("Error: ", error)
        res.status(401).json({status: "edit action blocked.", errorMsg: error})
    }
});
router.delete("/deleteExpenseById", authMiddleware, async (req, res) => {
    try {
        let expense = await Expense.findOne({where: {uuid: req.headers.uuid}});
        if (!expense) throw `expense not found.`
        await expense.destroy({where: {uuid: req.headers.id}})
        res.status(200).json({status: "Expense deleted successfully.",});
    } catch (error) {
        console.log("Error: ", error)
        res.status(401).json({status: "delete action blocked.", errorMsg: error})
    }
});


module.exports = router;
