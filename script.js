const {MongoClient} = require('mongodb');

const express = require('express')

const app = express()

app.use(express.urlencoded({extended: true}))


const dbURL = `mongodb+srv://survey_app:I9Z5v2ZXni3ImvhP@cluster0.rhuc5.mongodb.net/Book?retryWrites=true&w=majority`
const client = new MongoClient(dbURL)

app.post('/book', async (req, res) => {


    console.log("COMING FROM INSOMNIA")

    await client.connect()

    let dbRef = client.db('Book')

    const productColRef = dbRef.collection('Details')
    
    const productData =  req.body
    
    const insertedResult = await productColRef.insertOne(productData)
    
    res.json(insertedResult)
})

app.get('/book', async (req, res) => {

    await client.connect()

    let dbRef = client.db('Book')

    const productColRef = dbRef.collection('Details')

    const allProducts = await productColRef.find({}).toArray()
    
    res.json(allProducts)
})

const PORT = 9080
app.listen(PORT, () => {
    console.log('Server Started')
})