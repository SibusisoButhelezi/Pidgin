import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import CallActionBox from '../../components/CallActionBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

const CallingScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const user = route?.params?.user;
    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.page}>
            <Pressable onPress={goBack} style={styles.backButton}>
                <Ionicons name="chevron-back" size={40} color="white" />
            </Pressable>
            <View style={styles.cameraPreview}>
                <Text style={styles.name} >{user?.user_display_name}</Text>
                <Text style={styles.phoneNumber} >ringing +27 71 917 1257</Text>
            </View>        
            <CallActionBox />    
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        height: '100%',
        backgroundColor: '#0b2026',
    },
    cameraPreview: {
        backgroundColor: '#0b2026',
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 60,
        marginBottom: 15,
    },
    phoneNumber: {
        fontSize: 20,
        color: 'white',
    },
    backButton: {
        position: 'absolute',
        top: 30,
        left: 15,
        zIndex: 10,
    }
});

export default CallingScreen;