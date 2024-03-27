import React, { useRef } from "react";
import { View, Text, Dimensions, Image, StyleSheet, PixelRatio, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import fork from '../assets/fork.png';
import heartBeat from '../assets/heartBeat.png';
import fileAdd from '../assets/fileAdd.png';
import { useNavigation } from "@react-navigation/native";
import fileCapsule from '../assets/fileCapsule.png';
import config from "../../config";
import { TouchableOpacity } from "react-native-gesture-handler";
const FolderSlider = () => {
    const scrollViewRef = useRef(null);
    const navigation = useNavigation();
    return (
        <>
        <Text style={styles.heading}>My Files</Text>
        <ScrollView
            ref={scrollViewRef}
            horizontal
            contentContainerStyle={styles.scrollViewContent}
            snapToInterval={100}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
        >
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>navigation.navigate("MealPlans")} style={styles.FolderContainer}>
                    <View style={styles.smallContainer}>
                    </View>
                    <Image source={fork} style={styles.logo}></Image>
                    <View style={{ marginLeft: 10 ,marginTop:-3 }}>
                        <Text style={styles.folderHeading} numberOfLines={1} ellipsizeMode="tail">Meal Plans</Text>
                        <Text style={styles.files}>0  files</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("Prescriptions")} style={styles.FolderContainer}>
                    <View style={styles.smallContainer}>
                    </View>
                    <Image source={fileCapsule} style={styles.filelogo}></Image>
                    <View style={{ marginLeft: 10,marginTop:-5}}>
                        <Text style={styles.folderHeading} numberOfLines={1} ellipsizeMode="tail">Prescriptions</Text>
                        <Text style={styles.files}>0  files</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("Guidelines")} style={styles.FolderContainer}>
                    <View style={styles.smallContainer}>
                    </View>
                    <Image source={fileAdd} style={styles.filelogo}></Image>
                    <View style={{ marginLeft: 10,marginTop:-5 }}>
                        <Text style={styles.folderHeading} numberOfLines={1} ellipsizeMode="tail">Guidelines</Text>
                        <Text style={styles.files}>0  files</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("HealthRecommendation")}  style={styles.FolderContainer}>
                    <View style={styles.smallContainer}>
                    </View>
                    <Image source={heartBeat} style={styles.heartlogo}></Image>
                    <View style={{ marginLeft: 10, marginTop:-5}}>
                        <Text style={styles.folderHeading} numberOfLines={1} ellipsizeMode="tail">
                            Health Recommendations
                        </Text>
                        <Text style={styles.files}>0  files</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    heading:{
        fontSize: PixelRatio.getFontScale() * 20,
        color: config.textColorHeadings,
        marginBottom:-10,
        fontWeight:'500',
    },
    scrollViewContent: {
        alignItems: "center",
    },
    folderHeading: {
        fontSize: PixelRatio.getFontScale() * 16,
        color: "black",

    },
    files: {
        fontSize: PixelRatio.getFontScale() * 14,
        color: config.textColorHeadings,
    },
    FolderContainer: {
        width: 145,
        height: 90,
        borderRadius: 14,
        marginRight: 20,
        opacity: 1,
        backgroundColor: 'white',
        elevation:0,
    },
    logo: {
        top: -10,
        height: 25,
        width: 25,
        marginLeft: 10,
    },
    filelogo: {
        top: -10,
        height: 25,
        width: 20,
        marginLeft: 10,
    },
    heartlogo: {
        top: -10,
        height: 26,
        width: 30,
        marginLeft: 10,
    },
    smallContainer: {
        backgroundColor: 'white',
        height: 20,
        width: 50,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        bottom: 10,
    },
});

export default FolderSlider;
