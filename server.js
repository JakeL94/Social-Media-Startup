const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// don't need options here because mongoose is in version 6+
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Social-Media-Startup', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
});

mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`localhost is up and running on Port:${PORT}`));