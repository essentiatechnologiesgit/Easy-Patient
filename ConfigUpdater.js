const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const multer = require('multer');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = 4000;

// GitHub API configuration
const GITHUB_TOKEN = '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'; // Replace with your GitHub Personal Access Token
const REPO_OWNER = 'essentiatechnologiesgit'; // GitHub username or organization
const REPO_NAME = 'Easy-Patient'; // Repository name
const BASE_BRANCH = 'development'; // Base branch for the new branch

// Multer setup for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Middleware
app.use(bodyParser.json());

// Update config route
app.post('/update-config', upload.fields([
    { name: 'splashScreen', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
    { name: 'backgroundImage', maxCount: 1 },
    { name: 'subLogo', maxCount: 1 },
    { name: 'appIcon', maxCount: 1 }
]), async (req, res) => {
    console.log('Received request to update config');

    const newConfig = req.body;
    console.log('Request body:', req.body);

    // Add file paths to newConfig if files are uploaded
    const fileFields = ['splashScreen', 'logo', 'backgroundImage', 'subLogo', 'appIcon'];
    const filePaths = {};

    fileFields.forEach(field => {
        if (req.files[field]) {
            filePaths[field] = `src/assets/${req.files[field][0].originalname}`;
        }
    });

    console.log('Uploaded files:', req.files);
    console.log('File paths:', filePaths);

    // Format the config content
    const configContent = `
const config = {
    splashScreen: require('${filePaths.splashScreen || ''}'),
    primaryColor: '${newConfig.primaryColor}',
    textColorHeadings: '#2A2A31',
    secondaryColor: '${newConfig.secondaryColor}',
    tertiaryColor: '${newConfig.tertiaryColor}',
    logo: '${filePaths.logo || ''}',
    backgroundImage: require('${filePaths.backgroundImage || ''}'),
    backgroundColorImage: '${newConfig.backgroundColorImage || ''}',
    backgroundImageType: 'png',
    subLogo: require('${filePaths.subLogo || ''}'),
    backgroundColor: '${newConfig.backgroundColor || ''}',
    modalColor: '${newConfig.modalColor}',
    buttonText: '${newConfig.buttonTextColor}',
    headerColor: '${newConfig.headerColor}',
    fontStyle: 'OpenSans-Regular',
    BUNDLE_ID: 'com.org.${formatAppName(newConfig.appName)}',
    Name: '${newConfig.appName}',
    appIcon: '${filePaths.appIcon || ''}',
    shortDescription: '${newConfig.shortDescription}',
    fullDescription: '${newConfig.fullDescription}',
    appCategory: '${newConfig.appCategory}', 
    contentRating: '${newConfig.contentRating}',
    releaseNotes: '${newConfig.releaseNotes}',
    tags: '${newConfig.tags}',
    buttonTextColor:'${newConfig.buttonTextColor}' 
};

module.exports = config;
`;

    // Function to format the app name
    function formatAppName(appName) {
        return appName
            .replace(/\s+/g, '') // Remove spaces
            .replace(/[^a-zA-Z0-9]/g, '') // Remove non-alphanumeric characters
            .replace(/^[a-z]/, char => char.toUpperCase()); // Capitalize the first letter
    }

    const branchName = `update-config-${Date.now()}`;
    const baseBranchUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/refs/heads/${BASE_BRANCH}`;
    const createBranchUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/refs`;
    const getFileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/config.js?ref=${BASE_BRANCH}`;
    const createTreeUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees`;
    const createCommitUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/commits`;
    const updateFileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/config.js`;

    try {
        // Step 1: Get the SHA of the base branch
        const baseBranchRes = await axios.get(baseBranchUrl, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
            }
        });

        const baseBranchSHA = baseBranchRes.data.object.sha;
        console.log('Base branch SHA:', baseBranchSHA);

        // Step 2: Create a new branch on GitHub
        const createBranchRes = await axios.post(createBranchUrl, {
            ref: `refs/heads/${branchName}`,
            sha: baseBranchSHA,
        }, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            }
        });

        if (createBranchRes.status !== 201) {
            throw new Error('Failed to create a new branch on GitHub');
        }

        console.log('Created new branch:', branchName);

        // Step 3: Get the SHA of the existing config file
        const getFileRes = await axios.get(getFileUrl, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
            }
        });

        const fileSHA = getFileRes.data.sha;
        console.log('Config file SHA:', fileSHA);

        // Step 4: Prepare tree data with updated config and files
        const treeData = [
            {
                path: 'config.js',
                mode: '100644',
                type: 'blob',
                content: Buffer.from(configContent).toString('base64')
            }
        ];

        fileFields.forEach(field => {
            if (req.files[field]) {
                treeData.push({
                    path: `src/assets/${req.files[field][0].originalname}`,
                    mode: '100644',
                    type: 'blob',
                    content: req.files[field][0].buffer.toString('base64')
                });
            }
        });

        console.log('Tree data:', treeData);

        // Step 5: Create a new tree with the updated files
        const createTreeRes = await axios.post(createTreeUrl, {
            tree: treeData,
            base_tree: baseBranchSHA,
        }, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            }
        });

        const newTreeSHA = createTreeRes.data.sha;
        console.log('New tree SHA:', newTreeSHA);

        // Step 6: Create a new commit with the updated tree
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

        const newCommitSHA = commitRes.data.sha;
        console.log('New commit SHA:', newCommitSHA);

        // Step 7: Update the file on the new branch
        const updateFileRes = await axios.put(updateFileUrl, {
            message: commitMessage,
            content: Buffer.from(configContent).toString('base64'),
            sha: fileSHA,
            branch: branchName
        }, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            }
        });

        if (updateFileRes.status !== 200) {
            throw new Error('Failed to update the file on GitHub');
        }

        console.log(`Config file and uploaded files updated on branch: ${branchName}`);
        res.status(200).json({ message: `Config file and uploaded files updated on branch: ${branchName}` });

    } catch (error) {
        console.error('GitHub API Interaction Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to interact with GitHub API', details: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
