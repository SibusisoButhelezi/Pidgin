import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, Pressable, PermissionsAndroid, Alert, Platform} from 'react-native';
import CallActionBox from '../../components/CallActionBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Voximplant } from 'react-native-voximplant';

const permissions = [
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    PermissionsAndroid.PERMISSIONS.CAMERA,
]

const CallingScreen = () => {

    const [permissionGranted, setPermissionGranted] = useState(false);
    const [callStatus, setCallStatus] = useState('Initializing...');
    const [localVideoStreamId, setLocalVideoStreamId] = useState('');
    const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('');

    const navigation = useNavigation();
    const route = useRoute();

    const {user, call: incomingCall, isIncomingCall} = route?.params;
    const voximplant = Voximplant.getInstance();

    const call = useRef(incomingCall);
    const endpoint = useRef(null);
    const goBack = () => {
        navigation.goBack();
    };

    useEffect(() => {
        const getPermissions = async () => {
            const granted = await PermissionsAndroid.requestMultiple(permissions);
            const recordAudioGranted =
                granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] = 'granted';
            const cameraGranted =
                granted[PermissionsAndroid.PERMISSIONS.CAMERA] = 'granted';
            if (!cameraGranted | !recordAudioGranted) {
                Alert.alert('Permissions not granted');
            } else {
                setPermissionGranted(true);
            }
        };

        if (Platform.OS === 'android'){
            getPermissions();
        } else{
            setPermissionGranted(true); 
        }
        }, []);     
    

    useEffect(() => {
        if (!permissionGranted)
            return;

        const callSettings = {
            video: {
                sendVideo: true,
                receiveVideo: true,
            },
        };          
        
        const makeCall = async () => {
            call.current = await voximplant.call(user.user_name, callSettings);
            subscribeToCallEvents();
        };

        const answerCall = async () => {
            subscribeToCallEvents();
            endpoint.current = call.current.getEndpoints()[0];
            subscribeToEndpointEvent();
            call.current.answer(callSettings); 
        };
        
        const subscribeToCallEvents = () => {
            call.current.on(Voximplant.CallEvents.Failed, callEvent => {
                showError(callEvent.reason);
            });
            call.current.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
                setCallStatus('Calling...');
            });
            call.current.on(Voximplant.CallEvents.Connected, callEvent => {
                setCallStatus('Call connected');
            });
            call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
                navigation.navigate('Contacts');
            });
            call.current.on(Voximplant.CallEvents.LocalVideoStreamAdded, callEvent => {
                setLocalVideoStreamId(callEvent.videoStream.id);
            });
            call.current.on(Voximplant.CallEvents.EndpointAdded, callEvent => {
                endpoint.current = callEvent.endpoint;
                subscribeToEndpointEvent();   
            });
        };

        const subscribeToEndpointEvent = async () => {
            endpoint.current.on(Voximplant.EndpointEvents.RemoteVideoStreamAdded, endpointEvent => {
                setRemoteVideoStreamId(endpointEvent.videoStream.id);
            });
        };
        
        const showError = (reason) => {
            Alert.alert('Call failed', `Reason: ${reason}`, [
                {
                    text: 'OK',
                    onPress: navigation.navigate('Contacts'),
                }
            ])
        };

        if (isIncomingCall)
            answerCall();
        else
            makeCall();

        return () => {
            call.current.off(Voximplant.CallEvents.Failed); 
            call.current.off(Voximplant.CallEvents.ProgressToneStart); 
            call.current.off(Voximplant.CallEvents.Connected); 
            call.current.off(Voximplant.CallEvents.Disconnected); 
        }

    }, [permissionGranted]);

    const onHangupPress = () => {
        call.current.hangup();
    }

    return (
        <View style={styles.page}>
            <Pressable onPress={goBack} style={styles.backButton}>
                <Ionicons name="chevron-back" size={40} color="white" />
            </Pressable>

            <Voximplant.VideoView videoStreamId={localVideoStreamId} style={styles.localVideo} />
            <Voximplant.VideoView videoStreamId={remoteVideoStreamId} style={styles.remoteVideo} />
            <View style={styles.cameraPreview}>
                <Text style={styles.name} >{user?.user_display_name}</Text>
                <Text style={styles.phoneNumber} >{callStatus}</Text>
            </View>        
            <CallActionBox onHangupPress={onHangupPress} />    
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
    },
    localVideo: {
        backgroundColor: 'purple',
        height: 200,
        width: 100,
        borderRadius: 10,

        position: 'absolute',
        right: 20,
        top: 50,
        zIndex: 51,
    },
    remoteVideo: {
        backgroundColor: 'purple',
        borderRadius: 10,

        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 100,
        zIndex: 50,
    }
});

export default CallingScreen;