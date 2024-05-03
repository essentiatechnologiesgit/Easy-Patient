import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, StyleSheet, ImageBackground, Image, PixelRatio, TouchableOpacity } from 'react-native';
import config from '../../config';
import greenProfile from '../assets/greenProfile.png';
import downArrow from '../assets/downArrow.png';
import { ScrollView } from 'react-native-gesture-handler';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import BackHeader from '../components/backHeader';
import PrescriptionDropDown from '../components/PrescriptionDropDown';

const AttestationsView = () => {

    const [showDropDown, setShowDropDown] = useState(false);

    const ToggleDropDown = () => {
        setShowDropDown(!showDropDown);
    }
    return (
        <>
            <View style={styles.container}>
                <BackHeader name={"View Body Assessments"} />
                <TouchableOpacity onPress={() => ToggleDropDown()} style={styles.dotsContainer}>
                    <View style={styles.dot}></View>
                    <View style={styles.dot}></View>
                    <View style={styles.dot}></View>
                </TouchableOpacity>
                <ScrollView style={styles.mailContainer}>
                    <Text style={styles.heading}>Medicine / Custom</Text>
                    <View style={styles.recievedCont}>
                        <Image source={downArrow} style={styles.arrowIcon} />
                        <Text style={styles.subHeadings}>Recieved on: 13/8/19</Text>
                    </View>
                    <View style={styles.specialistCont}>
                        <Image source={greenProfile} style={styles.arrowIcon} />
                        <Text style={styles.subHeadings}>Specialist: Dr Ahmed</Text>
                    </View>
                    <View style={styles.paragraph}>
                        <Text style={styles.para}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like.Where does it come from?Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" The Extremes of Good and Evil by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                        </Text>
                    </View>
                </ScrollView>
                {showDropDown && <PrescriptionDropDown showDropDown={showDropDown} setShowDropDown={setShowDropDown}/>}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        // justifyContent:'center',
    },
    mailContainer: {
        padding: 30,
    },
    paragraph: {
        width: '90%',
    },
    heading: {
        fontSize: PixelRatio.getFontScale() * 18,
        color: config.textColorHeadings,
        fontWeight: 'bold',
    },
    subHeadings: {
        fontSize: PixelRatio.getFontScale() * 16,
        color: config.primaryColor,
    },
    dotsContainer: {
        flexDirection: 'column', // Align dots vertically
        justifyContent: 'space-between', // Distribute dots evenly
        height: 25,
        width: 30,
        alignItems: 'center', // Set height of the container
        gap: 4,
        position: 'absolute',
        right: 0,
        marginTop: 20,
        marginRight: 24,
    },
    dot: {
        width: 6, // Diameter of the dot
        height: 6,
        borderRadius: 3, // Make it circular
        backgroundColor: 'black', // Color of the dot
    },
    para: {
        marginTop: 20,
        color: config.primaryColor,
    },
    recievedCont: {
        marginTop: 20,
        gap: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrowIcon: {
        height: 12,
        width: 12,
    },
    specialistCont: {
        marginTop: 2,
        gap: 6,
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default AttestationsView;
