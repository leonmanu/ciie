const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const oAuth2Client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri:
    process.env.NODE_ENV === 'production'
      ? 'https://ciie069.onrender.com/auth/google/callback'
      : 'http://localhost:3000/auth/google/callback',
  });

async function uploadFileToDrive(req, res) {
  try {
    const filePath = req.file.path;
    const fileName = req.file.originalname;

    // Subir la imagen a Google Drive
    const fileMetadata = {
      name: fileName,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
    };
    const media = {
      mimeType: req.file.mimetype,
      body: fs.createReadStream(filePath),
    };

    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });

    const fileId = file.data.id;
    const fileUrl = `https://drive.google.com/uc?id=${fileId}`;

    // Limpiar el archivo temporal
    fs.unlinkSync(filePath);

    // Guardar el enlace de la imagen en Google Sheets
    await appendImageLinkToSheet(fileUrl);

    res.status(200).json({ fileId, fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
}

async function appendImageLinkToSheet(link) {
  const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });
  const request = {
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Sheet1!A1', // Cambia esto según la ubicación donde quieres guardar el enlace
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [[link]],
    },
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    console.log(`${response.data.updates.updatedCells} cells appended.`);
  } catch (error) {
    console.error('Error appending data to Google Sheets:', error);
  }
}

module.exports = { uploadFileToDrive };
