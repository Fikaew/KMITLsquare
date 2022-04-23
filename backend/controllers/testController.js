const asyncHandler = require('express-async-handler')

// @desc Get Goals
// @route GET api/goals
// @access Private
const getGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `GET Goals` })
})

// @desc Set Goals
// @route POST api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error(`Please add text field`)
    }
    res.status(200).json({ messaege: 'SET goals'})
})

// @desc Update Goals
// @route PUT api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ messaege: `UPDATE goals ${req.params.id}` })
})

// @desc Delete Goals
// @route DELETE api/goals
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ messaege: `DELETE goals ${req.params.id}`})
})

module.exports = {
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal
}