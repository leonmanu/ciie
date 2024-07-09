const express = require('express');
const { uploadFileToDrive } = require('../controllers/upload.controller');
const multer = require('multer');
const path = require('path');

// Configurar multer para almacenar archivos en la carpeta 'uploads'
const upload = multer({ dest: path.join(__dirname, '../uploads') });

const router = express.Router();

// Definir la ruta POST para subir archivos
router.post('/', upload.single('image'), uploadFileToDrive);

module.exports = router;
