const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const colors = require('colors');
const PORT = process.env.PORT || 5000;
const {errorHandler} = require('./middleware/errorMiddlesware');
const {connectDB} = require('./config/db');

// Connect to Database
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/app/users', require('./routes/userRoutes'))
// programs
app.use('/api/app/programs', require('./routes/programsRoutes'));

// news
app.use('/api/app/news', require('./routes/newsRoutes'));

// nutritionPlans
app.use('/api/app/nutritionPlans', require('./routes/nutritionPlansRoutes'));

// workout plans
app.use('/api/app/workoutPlans', require('./routes/workoutPlansRoutes'));

// goals
app.use('/api/app/goals', require('./routes/goalsRoutes'));

// age
app.use('/api/app/age', require('./routes/ageRoutes'));

// Serve Frontend
// if (process.env.NODE_ENV === 'production') {
//     // Set build folder as static
//     app.use(express.static(path.join(__dirname, '../frontend/build')))
//     console.log('IN THE SERVER FRONTEND FUNCTION!!!!!!!!');
//     // FIX: below code fixes app crashing on refresh in deployment
//     app.get('*', (_, res) => {
//         res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
//         console.log(path.join(__dirname, '../frontend/build/index.html'));
//     })
// } 

app.get('/', (req,res) => {
    res.status(200).json({message: 'Welcome to the AKLC App'})
})


app.use(errorHandler);

app.listen(PORT, () => console.log(`💾 Server is starting on port: ${PORT}`));