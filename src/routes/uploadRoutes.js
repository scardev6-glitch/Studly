const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadFileToDrive } = require('../utils/drive');

const router = express.Router();

const upload = multer({
  dest: 'tmp/uploads/',
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const fileName = req.file.originalname || req.file.filename;
    const mimeType = req.file.mimetype || 'application/octet-stream';

    const result = await uploadFileToDrive({
      filePath,
      fileName,
      mimeType,
    });

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Upload error:', error);

    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      message: 'File upload failed',
      error: error.message,
    });
  }
});

module.exports = router;
