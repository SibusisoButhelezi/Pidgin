import { View, sText, StyleSheet } from 'react-native'
import React from 'react';
import CallActionBox from '../../components/CallActionBox';

const CallScreen = () => {
  return (
    <View style={styles.page}>
        <View style={styles.cameraPreview} />
        <CallActionBox />
    </View>
  );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#0b2026',
    },
    cameraPreview: {
        backgroundColor: 'purple',
        height: 200,
        width: 100,
        borderRadius: 10,

        position: 'absolute',
        right: 20,
        top: 50,
    },
});


export default CallScreen;