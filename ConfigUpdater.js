const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const multer = require('multer');

// Initialize Express app
const app = express();
const PORT = 4000;

// GitHub API configuration
const GITHUB_TOKEN = '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'; // Replace with your GitHub Personal Access Token
const REPO_OWNER = 'essentiatechnologiesgit'; // GitHub username or organization
const REPO_NAME = 'Easy-Patient'; // Repository name
const BASE_BRANCH = 'FixesForiOSBuild'; // Base branch for the new branch
const EXISTING_BRANCH = 'ScreenshotBuild'; // Existing branch to update

// Multer setup for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Middleware
app.use(bodyParser.json());

// Function to get the SHA of a file if it exists in the repo
async function getFileSHA(fileName, branchName) {
  try {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/src/assets/${fileName}?ref=${branchName}`;
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } });
    return response.data.sha;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // File does not exist
    }
    throw error;
  }
}

// Function to upload files to GitHub using their API
async function uploadFileToGitHub(token, content, fileName, branchName) {
  const sha = await getFileSHA(fileName, branchName); // Get the SHA if the file exists

  const data = JSON.stringify({
    message: `Upload ${fileName}`,
    content: content,
    branch: branchName,
    ...(sha && { sha }), // Include SHA if the file exists
  });

  const config = {
    method: 'put',
    url: `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/src/assets/${fileName}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    const response = await axios(config);
    console.log(`Uploaded ${fileName}: `, response.data);
  } catch (error) {
    console.error(`Error uploading ${fileName}: `, error.response ? error.response.data : error.message);
  }
}

// Update config route
app.post('/update-config', upload.fields([
  { name: 'splashScreen', maxCount: 1 },
  { name: 'logo', maxCount: 1 },
  { name: 'backgroundImage', maxCount: 1 },
  { name: 'subLogo', maxCount: 1 },
  { name: 'appIcon', maxCount: 1 }
]), async (req, res) => {
  const newConfig = req.body;
  const fileFields = ['splashScreen', 'logo', 'backgroundImage', 'subLogo', 'appIcon'];
  const filePaths = {};
  const branchName = `update-config-${Date.now()}`;

  // GitHub API URLs
  const baseBranchUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/refs/heads/${BASE_BRANCH}`;
  const createBranchUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/refs`;
  const createTreeUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees`;
  const createCommitUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/commits`;
  const getFileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/config.js?ref=${BASE_BRANCH}`;

  try {
    // Step 1: Get SHA of base branch and create a new branch
    const baseBranchRes = await axios.get(baseBranchUrl, { headers: { Authorization: `token ${GITHUB_TOKEN}` } });
    const baseBranchSHA = baseBranchRes.data.object.sha;

    await axios.post(createBranchUrl, {
      ref: `refs/heads/${branchName}`,
      sha: baseBranchSHA
    }, { headers: { Authorization: `token ${GITHUB_TOKEN}` } });

    console.log('Created new branch:', branchName);

    // Step 3: Prepare config.js content
    const configContent = `
    const config = {
    splashScreen: require('./src/assets/${req.files['splashScreen'] ? req.files['splashScreen'][0].originalname : ''}'),
      primaryColor: '${newConfig.primaryColor}',
      secondaryColor: '${newConfig.secondaryColor}',
      tertiaryColor: '${newConfig.tertiaryColor}',
      logo: require('./src/assets/${req.files['logo'] ? req.files['logo'][0].originalname : ''}'),
      backgroundImage: require('./src/assets/${req.files['backgroundImage'] ? req.files['backgroundImage'][0].originalname : ''}'),
      backgroundColorImage: '${newConfig.backgroundColorImage || ''}',
      backgroundImageType: 'png',
      subLogo: require('./src/assets/${req.files['subLogo'] ? req.files['subLogo'][0].originalname : ''}'),
      backgroundColor: '${newConfig.backgroundColor || ''}',
      modalColor: '${newConfig.modalColor}',
      buttonText: '${newConfig.buttonTextColor}',
      headerColor: '${newConfig.headerColor}',
      fontStyle: 'OpenSans-Regular',
      BUNDLE_ID: 'com.org.${formatAppName(newConfig.appName)}',
      Name: '${newConfig.appName}',
      appIcon: require('./src/assets/${req.files['appIcon'] ? req.files['appIcon'][0].originalname : ''}'),
      shortDescription: '${newConfig.shortDescription}',
      fullDescription: '${newConfig.fullDescription}',
      appCategory: '${newConfig.appCategory}',
      contentRating: '${newConfig.contentRating}',
      releaseNotes: '${newConfig.releaseNotes}',
      tags: '${newConfig.tags}',
      buttonTextColor: '${newConfig.buttonTextColor}'
    };
    
    module.exports = config;
    `;
    function formatAppName(appName) {
      return appName
        .replace(/\s+/g, '')
        .replace(/[^a-zA-Z0-9]/g, '')
        .replace(/^[a-z]/, char => char.toUpperCase());
    }

    // Step 4: Create the tree and commit for config.js update
    const treeDataConfig = [
      {
        path: 'config.js',
        mode: '100644',
        type: 'blob',
        content: configContent
      }
    ];

    const createTreeRes = await axios.post(createTreeUrl, {
      tree: treeDataConfig,
      base_tree: baseBranchSHA,
    }, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      }
    });

    const newTreeSHA = createTreeRes.data.sha;
    const commitMessage = 'Update config.js and upload new files';
    const commitRes = await axios.post(createCommitUrl, {
      message: commitMessage,
      tree: newTreeSHA,
      parents: [baseBranchSHA],
    }, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      }
    });

    // Step 5: Update the branch to point to the second commit
    await axios.patch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/refs/heads/${branchName}`,
      { sha: commitRes.data.sha }, // FIX: Extract the commit SHA here
      { headers: { Authorization: `token ${GITHUB_TOKEN}` } }
    );

    console.log("Here");

    // Step 2: Upload files (images)
    for (const field of fileFields) {
      if (req.files[field]) {
        const fileName = req.files[field][0].originalname;
        const fileContent = req.files[field][0].buffer.toString('base64');
        await uploadFileToGitHub(GITHUB_TOKEN, fileContent, fileName, branchName);
        filePaths[field] = `src/assets/${fileName}`;
      }
    }

    // Now work for existing branch "ScreenshotBuild"
    // Get SHA of the existing branch `ScreenshotBuild`
    const existingBranchUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/refs/heads/${EXISTING_BRANCH}`;
    const existingBranchRes = await axios.get(existingBranchUrl, { headers: { Authorization: `token ${GITHUB_TOKEN}` } });
    const existingBranchSHA = existingBranchRes.data.object.sha;

    // Step 1: Create a new tree for the existing branch with the config update
    const existingTreeRes = await axios.post(createTreeUrl, {
      tree: treeDataConfig,
      base_tree: existingBranchSHA,
    }, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      }
    });

    const newExistingTreeSHA = existingTreeRes.data.sha;

    // Step 2: Commit the changes to the existing branch
    const existingCommitRes = await axios.post(createCommitUrl, {
      message: commitMessage,
      tree: newExistingTreeSHA,
      parents: [existingBranchSHA],
    }, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      }
    });

    // Step 3: Update the existing branch to point to the new commit
    await axios.patch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/refs/heads/${EXISTING_BRANCH}`,
      { sha: existingCommitRes.data.sha },
      { headers: { Authorization: `token ${GITHUB_TOKEN}` } }
    );

    for (const field of fileFields) {
      if (req.files[field]) {
        const fileName = req.files[field][0].originalname;
        const fileContent = req.files[field][0].buffer.toString('base64');
        await uploadFileToGitHub(GITHUB_TOKEN, fileContent, fileName, EXISTING_BRANCH);
        filePaths[field] = `src/assets/${fileName}`;
      }
    }

    console.log(`Updated existing branch: ${EXISTING_BRANCH}`);

    res.status(200).send('Config and files uploaded successfully!');
  } catch (error) {
    console.error('Error updating branch:', error.message);
    res.status(500).send('Error updating the branch');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
