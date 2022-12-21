import { View, Text, StyleSheet,Pressable } from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const CallActionBox = ({onHangupPress}) => {
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isMicOn, setIsMisOn] = useState(true);

    const onReverseCamera = () => {

    }
    const onToggleCamera = () => {
        setIsCameraOn(currentValue => !currentValue);
    }
    const onToggleMicrophone = () => {
        setIsMisOn(currentValue => !currentValue);
    }
    
  return (
    <View style={styles.buttonsContainer}>
        <Pressable onPress={onReverseCamera} style={styles.iconButton}>
            <Ionicons name="camera-reverse" size={30} color={'white'} />
        </Pressable>
        <Pressable onPress={onToggleCamera} style={styles.iconButton}>
            <MaterialCommunityIcons name={isCameraOn ? "camera-off" : "camera"} size={30} color={'white'} />
        </Pressable>
        <Pressable onPress={onToggleMicrophone} style={styles.iconButton}>
            <MaterialCommunityIcons name={isMicOn ? "microphone-off" : "microphone"} size={30} color={'white'} />
        </Pressable>
        <Pressable onPress={onHangupPress} style={[styles.iconButton, {backgroundColor: 'red'}]}>
            <MaterialCommunityIcons name="phone-hangup" size={30} color={'white'} />
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    buttonsContainer: {
        width: '100%',
        backgroundColor: '#333333',
        padding: 20,
        paddingTop: 50,
        paddingBottom: 50,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 'auto'
    },
    iconButton: {
        backgroundColor: '#7099a8',
        borderRadius: 100,
        padding: 15,
    }
});


export default CallActionBox;