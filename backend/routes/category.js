const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { z } = require('zod');
const { Category } = require('../database/category.model');

const categoryRouter = express.Router()

const { createCategorySchema, deleteCategorySchema } = require('../schemas/category.schema')

 
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

categoryRouter.get('/', authMiddleware, async(req, res) => {
    try {
        const allCategories = await Category.find()
        res.status(200).json({allCategories})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : 'Some Error occurred'})
    }
})



// TODO - Does not raise an error on wrong id
categoryRouter.delete('/', authMiddleware, async (req, res) => {
    const body = req.body

    const valid = deleteCategorySchema.safeParse(body)
    if (!valid.success){
        res.status(411).json({msg : 'Invalid Inputs'})
    }

    try {
        console.log(body.categoryId)
        await Category.findByIdAndDelete(body.categoryId)
        res.status(202).json({msg : 'Succesfully Deleted Category'})
    } catch (err){
        console.log(err)
        res.status(500).json({msg : 'Some Error occurred'})
    }
})

module.exports = {categoryRouter}