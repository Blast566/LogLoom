import express from 'express';
import dotenv from 'dotenv';
import { pool } from './db.js'
import { validateApiKey} from './middleware/auth.js';
import crypto from 'crypto';
import {z} from 'zod';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json());

app.get('/health', async (req, res) => {
    try{
        const dbResult = await pool.query('SELECT NOW()');
        res.status(200).json({status: 'ok', db_time:dbResult.rows[0].now})
    } catch (error){
        res.status(500).json({status:'error', message: 'Database connection failed'})
    }
});

app.get('/api/v1/auth-test', validateApiKey, (req, res) =>{
    res.status(200).json({ message : 'Authentication successful', projectId : req.projectId})
} );



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});