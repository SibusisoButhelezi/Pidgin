import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, ImageBackground, Pressable} from 'react-native';
import background from '../../../assets/images/calling.jpg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {useRoute, useNavigation} from '@react-navigation/native'
import { Voximplant } from 'react-native-voximplant';

const IncomingCallScreen = () => {
    const [caller, setCaller] = useState('');
    const route = useRoute();
    const {call} = route.params;
    const navigation = useNavigation();

    useEffect(() => {
        setCaller(call.getEndpoints()[0].displayName);

        call.on(Voximplant.CallEvents.Disconnected, callEvent => {
            navigation.navigate('Contacts');
        });

        return () => {
            call.off(Voximplant.CallEvents.Disconnected);
        };
    }, []);
 
    const onDecline = () => {
        call.decline();
    };

    const onAccept = () => {
        navigation.navigate('Calling', {call: call, isIncomingCall: true});
    };
    return(
        <ImageBackground source={background} style={styles.background} resizeMode="cover">
            <Text style={styles.name} >{caller}</Text>
            <Text style={styles.phoneNumber} >Pidgin Video...</Text>
            <View style={[styles.row, {marginTop: 'auto'}]}>
                <View style={styles.iconContainer}>
                    <Ionicons name="alarm" size={30} color={'white'} />
                    <Text style={styles.iconText}>Remind Me</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Entypo name="message" size={30} color={'white'} />
                    <Text style={styles.iconText}>Message</Text>
                </View>
            </View>
            <View style={styles.row}>
                {/* Decline button */}
                <Pressable onPress={onDecline} style={[styles.iconContainer]}>
                    <View style={[styles.iconButton, {backgroundColor: 'red'}]}>
                        <Feather name="x" size={40} color={'white'} />                       
                    </View>
                    <Text style={styles.iconText}>Decline</Text>
                </Pressable>
                {/* Accept button */}
                <Pressable onPress={onAccept} style={[styles.iconContainer]}>
                    <View style={[styles.iconButton]}>
                        <Feather name="check" size={40} color={'white'} />
                    </View>
                    <Text style={styles.iconText}>Accept</Text>
                </Pressable>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    root: {
        height: '100%',
    },
    name:{    
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 100,
        marginBottom: 15,
    },
    phoneNumber: {
        fontSize: 20,
        color: 'white',
    },
    background: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        paddingBottom: 40,
    },
    iconButton: {
        backgroundColor: '#7099a8',
        borderRadius: 100,
        padding: 15,
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    iconText: {
        color: 'white',
        marginTop: 10,
    },
    iconContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },

});

export default IncomingCallScreen