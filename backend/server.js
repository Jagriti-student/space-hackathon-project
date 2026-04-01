const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const safetyRoutes = require('./routes/safety');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/safety', safetyRoutes);

app.get('/', (req, res) => res.send('SheShield Backend Running'));

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));