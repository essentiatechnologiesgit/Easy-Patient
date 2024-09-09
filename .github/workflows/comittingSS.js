const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Retrieve environment variables
const token = process.env.token;
const screenshotIds = (process.env.SCREENSHOT_IDS || '').split(' ');

// Update screenshot path to match the artifacts directory
const screenshotDir = path.join(__dirname, 'downloaded_screenshots');

// Function to calculate the MD5 checksum of the file
function calculateMD5Checksum(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('md5');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

// Function to commit the asset reservation
async function commitReservation(screenshotId) {
  const screenshotPath = path.join(screenshotDir, `screenshot_${screenshotId}.png`);
  const checksum = calculateMD5Checksum(screenshotPath);

  const requestBody = {
    data: {
      type: 'appScreenshots',
      id: screenshotId,
      attributes: {
        uploaded: true,
        sourceFileChecksum: checksum,
      },
    },
  };

  try {
    const response = await axios.patch(
      `https://api.appstoreconnect.apple.com/v1/appScreenshots/${screenshotId}`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Commit successful:', response.data);
  } catch (error) {
    console.error('Error committing reservation:', error.response ? error.response.data : error.message);
  }
}

// Call the function to commit each reservation
screenshotIds.forEach(commitReservation);
