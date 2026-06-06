const express = require('express');
const router = express.Router();
const { findVideoForTopic, getAllVideoMappings } = require('../services/videoMapper');

router.get('/lookup/:topicName', (req, res) => {
  const video = findVideoForTopic(req.params.topicName);
  if (video) return res.json(video);
  res.status(404).json({ message: 'No video found' });
});

router.get('/index', (req, res) => {
  res.json(getAllVideoMappings());
});

module.exports = router;
