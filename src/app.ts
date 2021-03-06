import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cors from 'cors';
import morgan from 'morgan';
import config from './config/config';
import passportConfig from './middleware/passport';
import { router as authRoutes } from './routes/auth';
import { router as noteRoutes } from './routes/note';

const mongoURI = process.env.MONGO_URI || config.mongoURI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false})
    .then(()=>{console.log('MongoDB Connected')})
    .catch((err)=>{console.log(err)});

const app = express();
app.use(passport.initialize());
passportConfig(passport);
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/note', noteRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.resolve(__dirname,'..','client','dist','angular-notes')));  //  '../client/dist/angular-notes'
    app.get('/*',(req,res)=>{    
        res.sendFile(
            path.resolve(
                __dirname,'..','client','dist','angular-notes','index.html'
            )
        )
    });
}


export { app };