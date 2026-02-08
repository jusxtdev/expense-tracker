import { Category } from "../database/category.model.js";
import { createCategorySchema, deleteCategorySchema } from "../schemas/category.schema.js";

export const addCategory = async (req, res, next) => {
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
        next(error)
        res.status(500).json({msg : 'Some Error occurred'})
    }
}

export const allCategory = async (req, res, next) => {
    try {
        const allCategories = await Category.find()
        res.status(200).json({allCategories})
    } catch (error) {
        console.log(error)
        next(error)
        res.status(500).json({msg : 'Some Error occurred'})
    }
}

export const deleteCategory = async (req, res, next) => {
    const body = req.body

    const valid = deleteCategorySchema.safeParse(body)
    if (!valid.success){
        res.status(411).json({msg : 'Invalid Inputs'})
    }

    try {
        await Category.findByIdAndDelete(body.categoryId)
        res.status(202).json({msg : 'Succesfully Deleted Category'})
    } catch (err){
        console.log(err)
        next(err)
        res.status(500).json({msg : 'Some Error occurred'})
    }
}