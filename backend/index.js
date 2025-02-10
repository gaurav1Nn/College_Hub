const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://smitkbgd:oEhBADFniPq1K0DF@cluster0.hxwl1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
  console.log('MongoDB Connected');
}).catch(err => {
  console.error('MongoDB Connection Error:', err);
});

// Test Route to check if the server and MongoDB are connected
app.get('/api/testDB', async (req, res) => {
  try {
    // Check MongoDB connection state
    const mongoState = mongoose.connection.readyState;
    if (mongoState === 1) { // '1' means connected
      res.json({ message: 'Server is up and MongoDB is connected!' });
    } else {
      res.status(500).json({ message: 'MongoDB is not connected' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
});

// MainCode
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const resourceRoutes = require('./routes/resourceRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes)
app.use('/api/discussions', discussionRoutes);
app.use('/api/resources', resourceRoutes);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
