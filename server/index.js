import express from 'express';
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './mongodb/connect.js';
import userRouter from './routes/user.routes.js'
import propertyRouter from './routes/property.routes.js'




dotenv.config()

const app= express();

app.use(cors());
app.use(express.json({limit: '50mb'}));

app.get('/', (req, res)=>{
    res.send({message:'Hello Word!'})
})


app.use('/api/v1/users', userRouter);
app.use('/api/v1/properties', propertyRouter);

const startServer = async () => {
    try {
       await connectDB(process.env.MONGODB_URL);
       app.listen(8081, () => console.log('Server started on port http://localhost:8081'));
    } catch (error) {
       console.error('Error connecting to MongoDB:', error);
    }
 };

startServer();