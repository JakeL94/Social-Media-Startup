const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(require('./routes'));

// don't need options here because mongoose is in version 6+
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Social-Media-Startup');

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`localhost is up and running on Port:${PORT}`));