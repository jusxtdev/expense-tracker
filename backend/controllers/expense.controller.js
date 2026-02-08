import { Category } from "../database/category.model.js";
import { Expense } from "../database/expense.model.js";
import { createExpenseSchema, deleteExpenseSchema } from "../schemas/expense.schema.js";

export const addExpense = async (req, res, next) => {
    const expenseData = req.body
    
    // input validation
    const valid = createExpenseSchema.safeParse(expenseData)
    if (!valid.success){
        res.status(411).json({msg : 'Invalid Inputs'})
    }

    // find categories by titles provided by the user 
    const categoryDocs = await Category.find(
        {
            title : { $in : expenseData.categories}
        }
    );
    
    // check if a category provided by user is not in DB
    const foundTitles = categoryDocs.map(cat => cat.title)

    const missingTitles =  expenseData.categories.filter(
        title => !foundTitles.includes(title)
    )

    if (missingTitles.length > 0){
        res.status(400).json({msg : 'Following categories not added', categories : missingTitles})
        return;
    }

    // make an array of ObjectId from categories found
    const categoryIds = categoryDocs.map( cat => cat._id )


    expenseData.categories = [...categoryIds]

    const newExpense = new Expense(expenseData)


    try {
        await newExpense.save()
        res.status(201).json({msg : 'Expense Added'})
    } catch (err){
        console.log(err)
        next(err)
        res.status(500).json({msg : 'Error occurred'})
    }
}

export const allExpense = async (req, res, next ) => {
    try {
        const allExpenses =  await Expense.find()
        res.status(200).json({allExpenses : allExpenses})
    } catch (err){
        console.log(err)
        next(err)
        res.status(500).json({msg : 'Some Error occurred'})
    }
}

export const deleteExpense = async (req, res, next ) => {
    const body = req.body
    const valid = deleteExpenseSchema.safeParse(body)

    if (!valid.success){
        res.status(411).json({msg : 'Invalid Inputs'})
    }

    try{
        await Expense.findByIdAndDelete(body.expenseId)
        res.status(202).json({msg : 'Deleted Expense Succesfully'})
    } catch (err){
        console.log(err)
        next(err)
        res.status(500).json({msg : 'Some Error occurred'})
    }
}