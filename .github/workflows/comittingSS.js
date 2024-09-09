const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Retrieve environment variables
const token = process.env.token; // Ensure the token is set correctly in the GitHub Actions environment
const screenshotId = process.env.SCREENSHOT_ID; // Replace with the correct environment variable for screenshot ID

// Path to your screenshot file
const screenshotPath = path.join(__dirname, 'downloaded_screenshots/screenshot_dashboard.png');

// Function to calculate the MD5 checksum of the file
function calculateMD5Checksum(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('md5');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

// Function to commit the asset reservation
async function commitReservation() {
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

// Call the function to commit the reservation
commitReservation();
