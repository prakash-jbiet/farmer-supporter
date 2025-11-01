const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());

// Multer setup for file upload
const upload = multer({ dest: 'uploads/' });

// Prediction logic based on file name
app.post('/predict', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded!' });
  }

  const fileName = req.file.originalname.toLowerCase();

  let prediction = '';
  let advice = '';

  if (fileName.includes('brownleaf')) {
    prediction = 'Brown Leaf Disease';
    advice ='Spray fungicide and avoid excess watering.';
  } else if (fileName.includes('yellowleaf')) {
    prediction = 'Yellow Leaf Disease';
    advice = 'Add nitrogen fertilizer and ensure proper sunlight.';
  } else if (fileName.includes('blight')) {
    prediction = 'Leaf Blight Disease';
    advice = 'Remove affected leaves and use resistant seeds.';
  } else if (fileName.includes('spot')) {
    prediction = 'Leaf Spot Disease';
    advice = 'Apply copper-based fungicide and ensure crop rotation.';
  } else {
    prediction = 'Healthy Leaf';
    advice = 'No treatment needed. Keep crops monitored regularly.';
  }

  res.json({ prediction, advice });
});

app.listen(3000, () => console.log('✅ Server running at http://localhost:3000'));