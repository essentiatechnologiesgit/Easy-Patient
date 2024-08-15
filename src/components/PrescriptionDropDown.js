import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet, PixelRatio, TouchableWithoutFeedback, Text } from 'react-native';
import downArrow from '../assets/downArrowBlack.png';
import shareBlack from '../assets/shareBlack.png';
import archiveBlack from '../assets/archiveBlack.png';
import config from '../../config.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import Share from 'react-native-share';
import RNFetchBlob from 'react-native-blob-util';
import { PermissionsAndroid } from 'react-native';
const PrescriptionDropDown = ({ showDropDown, setShowDropDown, pdf, isArchived, title, record_id }) => {
    const navigation = useNavigation();
    const handleClick = () => {
        setShowDropDown(!showDropDown)
    }
    const handleShare = () => {
        setShowDropDown(!showDropDown);
        sharePDF();
    }

    const handleHide = () => {
        navigation.navigate(title, { isHide: "true", record_id: record_id });
    }


    const sharePDF = async () => {
        try {
            const pdfUrl = pdf;
            const options = {
                url: pdfUrl,
            };
            await Share.open(options);
        } catch (error) {
            console.error('Error sharing PDF:', error);
        }
    };

    const handleDownload = () => {
        setShowDropDown(!showDropDown);
        downloadPDF();
    }

    const downloadPDF = async () => {
        try {
            const pdfUrl =pdf;
            const { config, fs } = RNFetchBlob;
            const { DocumentDir, DownloadDir } = fs.dirs;
    
            // Choose appropriate directory based on platform
            const downloadDir = Platform.OS === 'android' ? DownloadDir : DocumentDir;
    
            if (Platform.OS === 'android') {
                // Request storage permission
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message: 'This app needs access to your storage to download PDF files.',
                        buttonPositive: 'OK',
                    }
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.error('Storage permission denied');
                    return;
                }
            }
    
            const options = {
                fileCache: true,
                addAndroidDownloads: Platform.OS === 'android' ? {
                    useDownloadManager: true,
                    notification: true,
                    path: `${downloadDir}/prescricao_medicamentos.pdf`, // Change the file name as needed
                } : undefined,
                path: Platform.OS === 'ios' ? `${downloadDir}/prescricao_medicamentos.pdf` : undefined,
            };
    
            // Download the PDF file
            const res = await config(options).fetch('GET', pdfUrl);
    
            if (Platform.OS === 'ios') {
                // Open the downloaded file using the default file viewer
                RNFetchBlob.ios.openDocument(res.data);
            }
    
            console.log('PDF downloaded successfully.');
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    const handleShow = () => {
        navigation.navigate(title, { isShow: "true",record_id:record_id });
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => handleShare()}>
                    <View style={styles.lineContainer}>
                        <Image source={shareBlack} style={styles.share}></Image>
                        <Text style={styles.text}>Share</Text>
                    </View>
                </TouchableWithoutFeedback>
                {
                    !isArchived ?
                        <TouchableWithoutFeedback onPress={() => handleHide()}>
                            <View style={styles.lineContainer}>
                                <Image source={archiveBlack} style={styles.archive}></Image>
                                <Text style={styles.text}>Hide</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        :
                        <TouchableWithoutFeedback onPress={() => handleShow()}>
                            <View style={styles.lineContainer}>
                                <Image source={archiveBlack} style={styles.archive}></Image>
                                <Text style={styles.text}>Show</Text>
                            </View>
                        </TouchableWithoutFeedback>
                }

                <TouchableWithoutFeedback onPress={() => handleDownload()}>
                    <View style={styles.lineContainer}>
                        <Image source={downArrow} style={styles.arrow}></Image>
                        <Text style={styles.text2}>Download</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: 200,
        backgroundColor: config.modalColor,
        right: 0,
        margin: 50,
        padding: 15,
        gap: 20,
        elevation: 6,
        // shadowColor:'black',
    },
    lineContainer: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
    },
    share: {
        height: 20,
        width: 20,
    },
    archive: {
        height: 22,
        width: 22,
    },
    arrow: {
        left: 4,
        height: 16,
        width: 16,
    },

    text: {
        color: config.textColorHeadings,
        fontSize: PixelRatio.getFontScale() * 20,
        fontFamily:config.fontStyle,
    },
    text2: {
        left:6,
        color: config.textColorHeadings,
        fontSize: PixelRatio.getFontScale() * 20,
        fontFamily:config.fontStyle,
    },
});

export default PrescriptionDropDown;
