import express from 'express'
import messageRoutes from '../src/routes/message.route.js'
import authRoutes from '../src/routes/auth.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import 'dotenv/config'
import { app, server } from './socket/socket.js';


const port = process.env.PORT || '5000';

app.use(cors())
app.use(express.json()) //parse json data
app.use(cookieParser()) //parse cookies

app.get('/',(req,res)=>{
    res.json({mssage:'hlo ggg'})
})  


app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)


server.listen(port,()=>{
    console.log(`app is listening at port ${port}`)
});