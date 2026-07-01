const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const SERVICE_ACCOUNT_KEY_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  path.resolve(__dirname, '..', '..', 'studly-drive.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const FOLDER_ID = '1uQ10Ok-eBvpY2w5i7vZrzvt2LmyMJZTK';

let driveClient = null;

async function initializeDrive() {
  if (driveClient) {
    return driveClient;
  }

  if (!fs.existsSync(SERVICE_ACCOUNT_KEY_PATH)) {
    throw new Error(`Service account key not found at ${SERVICE_ACCOUNT_KEY_PATH}`);
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_KEY_PATH,
    scopes: SCOPES,
  });

  const authClient = await auth.getClient();
  driveClient = google.drive({ version: 'v3', auth: authClient });
  return driveClient;
}

async function uploadFileToDrive({ filePath, fileName, mimeType }) {
  const drive = await initializeDrive();

  const fileMetadata = {
    name: fileName,
    parents: FOLDER_ID && FOLDER_ID !== 'PASTE_YOUR_FOLDER_ID_HERE' ? [FOLDER_ID] : undefined,
  };

  const media = {
    mimeType,
    body: fs.createReadStream(filePath),
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: 'id',
  });

  const fileId = response.data.id;

  await drive.permissions.create({
    fileId,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    },
  });

  return {
    fileId,
    url: `https://drive.google.com/uc?id=${fileId}`,
  };
}

module.exports = {
  initializeDrive,
  uploadFileToDrive,
  drive: () => driveClient,
};
