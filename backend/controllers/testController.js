const asyncHandler = require('express-async-handler')
const Test = require('../models/testModel')

// @desc Get Goals
// @route GET api/goals
// @access Private
const getGoal = asyncHandler(async (req, res) => {
    const tests = await Test.find()
    res.status(200).json(tests)
})

// @desc Set Goals
// @route POST api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error(`Please add text field`)
    }
    const test = await Test.create({
        text: req.body.text
    })
    res.status(200).json(test)
})

// @desc Update Goals
// @route PUT api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    const test = await Test.findById(req.params.id)
    if(!test){
        res.status(400)
        throw new Error('Test not found')
    }
    const updatedTest = await Test.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
        )

    res.status(200).json(updatedTest)
})

// @desc Delete Goals
// @route DELETE api/goals
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const test = await Test.findById(req.params.id)
    if(!test){
        res.status(400)
        throw new Error('Test not found')
    }
    await test.remove()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal
}