const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


// Just a test route to check if the server is running
app.get('/',(req,res)=>{
    res.send('Recipe Sharing Platform API is running');
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});