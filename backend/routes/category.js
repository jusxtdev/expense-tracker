const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { z } = require('zod');
const { Category } = require('../database/category.model');

const categoryRouter = express.Router()


const createCategorySchema = z.object({
    title : z.string()
}) 
categoryRouter.post('/', authMiddleware, async (req, res) =>{
    const categoryData = req.body

    const valid = createCategorySchema.safeParse(categoryData)
    if (!valid.success){
        res.status(411).json({msg : 'Invalid Inputs'})
        return;
    }

    const newCategory = new Category(categoryData)
    console.log(newCategory)
    try {
        await newCategory.save()
        res.status(201).json({msg : 'category created Succesfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : 'Some Error occurred'})
    }
})


module.exports = {categoryRouter}