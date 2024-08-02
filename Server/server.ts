import { Express, Request, Response } from "express";

require('dotenv').config()
const express = require('express')
const app: Express = express()
app.listen(process.env.SERVER_PORT || 3000)
const cors = require('cors');
app.use(cors())
app.use(express.json());

const mongoose = require('mongoose')
const mongodb = process.env.MONGODB_URL
mongoose.connect(mongodb) 
    .then(() => console.log('MongoDB connected'))
    .catch((err: unknown) => console.error('MongoDB connection error:', err));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

const studentRouter = require('./routes/students')
app.use('/students', studentRouter)

