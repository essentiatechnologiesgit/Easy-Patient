const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 4000; 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/assets/testing');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(bodyParser.json());

app.post('/update-config', upload.fields([
    { name: 'splashScreen', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
    { name: 'backgroundImage', maxCount: 1 },
    { name: 'subLogo', maxCount: 1 },
    { name: 'appIcon', maxCount: 1 }
]), (req, res) => {
    const newConfig = req.body;
    console.log(req.body)
  
    if (req.files.splashScreen) newConfig.splashScreen = `./src/assets/${req.files.splashScreen[0].originalname}`;
    if (req.files.logo) newConfig.logo = `./src/assets/${req.files.logo[0].originalname}`;
    if (req.files.backgroundImage) newConfig.backgroundImage = `./src/assets/${req.files.backgroundImage[0].originalname}`;
    if (req.files.subLogo) newConfig.subLogo = `./src/assets/${req.files.subLogo[0].originalname}`;
    if (req.files.appIcon) newConfig.appIcon = `./src/assets/${req.files.appIcon[0].originalname}`;

    function formatAppName(appName) {
     
        return appName
            .replace(/\s+/g, '') 
            .replace(/[^a-zA-Z0-9]/g, '') 
            .replace(/^[a-z]/, char => char.toUpperCase());
    }
  
    const configContent = `
        const config = {
        splashScreen: '${newConfig.splashScreen}',
        primaryColor: '${newConfig.primaryColor}',
        textColorHeadings: '#2A2A31',
        secondaryColor: '${newConfig.secondaryColor}',
        tertiaryColor: '${newConfig.tertiaryColor}',
        logo: '${newConfig.logo}',
        backgroundImage: '${newConfig.backgroundImage}',
        backgroundColorImage: '${newConfig.backgroundColorImage}',
        backgroundImageType: 'png',
        subLogo: '${newConfig.subLogo}',
        backgroundColor: '${newConfig.backgroundColor}',
        modalColor: '${newConfig.modalColor}',
        buttonText: '${newConfig.buttonTextColor}',
        headerColor: '${newConfig.headerColor}',
        fontStyle: 'OpenSans-Regular',
        BUNDLE_ID: 'com.org.${formatAppName(newConfig.appName)}',
        Name: '${newConfig.appName}',
        appIcon: '${newConfig.appIcon}',
        shortDescription: '${newConfig.shortDescription}',
        fullDescription: '${newConfig.fullDescription}',
        appCategory: '${newConfig.appCategory}', 
        contentRating: '${newConfig.contentRating}',
        releaseNotes: '${newConfig.releaseNotes}',
        tags: '${newConfig.tags}',

        };

        module.exports = config;
        `;

    const configFilePath = path.join(__dirname, 'config.js');

    fs.writeFile(configFilePath, configContent, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update config file' });
        }
        res.status(200).json({ message: 'Config file updated successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
