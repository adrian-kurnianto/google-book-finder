
require('dotenv').config();
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const PORT = 3001

mongoose.set('strictQuery', false)

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } 
  catch (err) {
    console.log(err)
    process.exit(1)
  }
}
app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes)
app.use(errorHandler)



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
  })
})


module.exports = app