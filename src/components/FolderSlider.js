import React, { useRef } from "react";
import { View, Text, ActivityIndicator, StyleSheet, PixelRatio, ScrollView } from 'react-native';
import Modal from "react-native-modal";

const FolderSlider = () => {
    const scrollViewRef = useRef(null);

    return (
        <ScrollView
            ref={scrollViewRef}
            horizontal
            contentContainerStyle={styles.scrollViewContent}
            snapToInterval={100} 
            decelerationRate="fast"
        >
            <View style={styles.container}>
                <View style={styles.FolderContainer}>
                    <View style={styles.smallContainer}>

                    </View>
                </View>
                <View style={styles.FolderContainer}>
                    <View style={styles.smallContainer}>

                    </View>
                </View>
                <View style={styles.FolderContainer}>
                    <View style={styles.smallContainer}>

                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
    },
    scrollViewContent: {
        alignItems: "center",
    },
    FolderContainer: {
        width: 143,
        borderRadius: 14,
        height: 95,
        opacity: 1,
        backgroundColor: 'white',
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
