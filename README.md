# Expense Tacker App

## Core Features
### User Authentication

Users register with email/password (validated with Zod)
Login returns a JWT token for authenticated requests
Middleware protects routes so users only see their own expenses

### Expense Management

Create expenses with amount, category, description, and date
Categories like Food, Transport, Entertainment, Bills, Shopping, etc.
Edit or delete existing expenses
Retrieve all expenses with optional filtering

### Filtering & Queries

Get expenses by date range (this month, last week, custom dates)
Filter by category to see spending patterns
Search by description
Sort by date or amount

### Analytics & Summaries

Total spending for a time period
Breakdown by category (how much spent on Food vs Transport)
Monthly comparisons (spending this month vs last month)
Average daily/weekly spending

## Routes `/api/v1`
### User Routes `/user`

#### POST `/signup`
Request Body
```json
{
    userEmail : str,
    firstName : str,
    lastName : str,
    password : str
}
```
1. Validate inputs
2. Check if user Exists
3. Hash the password
5. Create a new user
6. Response 201 
```json
{
    userId : 12
}
```

#### POST /signin
Request Body
```json
{
    userEmail : str,
    password : str
}
```
1. Validate inputs
2. Check if user Exists
3. check Password
4. Generate JWT
5. Response 200 
```json
{
    JWT_TOKEN : 'hsi.ufhebiusi.fe'
}
```

#### PUT /user
Request Body
```json
{
    password : str | optional,
    firstName: str | optional,
    lastName: str | optional,
}
```
1. Auth validation
2. input validation
3. check if user exists
4. update user
5. response 200
```json
{
    msg : 'User Updated Succefully'
}
``` 


### Category Routes `/category`

#### GET 
1. auth validation
2. query all categories
3. response

#### POST /category
```js
{
    title : str
}
```
1. Auth validation
2. input validation
3. create new category document

#### DELETE /category
```js
{
    categoryId : str
}
```
1. auth validation
2. input validation
3. Schema.pre('save')
    - In all expense where categories has categoryId
    - remove that id from there
4. delete category document 


- Category.Objectid <> Expense.Objectid

### Expense Routes `/expense`
- All routes protected using authMiddleware

#### GET
1. Auth validation
3. query all expense
4. respond

#### POST /expense
```js
{
    title : str,
    amount : number,
    description : str,
    date : Date | default=date.now()
    categories : [catgTitle1, catgTitle2 ...]
}
```
1. Auth validation
2. input validation
    - validate date
3. categories (In schema.pre())
    1. convert the catgTitle to corresponding id's
    2. if catg title not found, respond with 404
4. save the new expense object

#### DELETE 
```js
{
    expenseId : number
}
```
1. Auth validation
2. input validation
3. schema.pre('delete')
    - find all categories which have expense
    - remove the expenseId from the category document
4. delete expense