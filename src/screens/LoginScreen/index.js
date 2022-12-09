import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Voximplant } from 'react-native-voximplant';
import { ACC_NAME, APP_NAME } from '../../Constants';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const voximplant = Voximplant.getInstance();
    const navigation = useNavigation();

    useEffect(() => {
        const connect = async () => {
            const status = await voximplant.getClientState();
            if (status === Voximplant.ClientState.DISCONNECTED){
                await voximplant.connect(); 
            } else if (status === Voximplant.ClientState.LOGGED_IN) {
                redirectHome();
            }
        };
        connect();
    }, []);

    const redirectHome = () => {
        navigation.reset({
            index: 0,
            routes: [{
                name: 'Contacts',
            }],
        })
    }

    const signin = async () => {
        try{
            const fqUserName = `${userName}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
            await voximplant.login(fqUserName, password);

            redirectHome();
        }
        catch(e) {
            Alert.alert(e.name, `Error Code: ${e.name}`);
        }
    }

  return (
    <View style={styles.page}>
      <TextInput 
        value={userName} 
        onChangeText={setUserName} 
        placeholder='username' 
        style={styles.input} 
        autoCapitalize="none"
        />
      <TextInput 
        value={password} 
        onChangeText={setPassword} 
        placeholder='password' 
        style={styles.input} 
        secureTextEntry
        />

      <Pressable style={styles.button} onPress={signin}>
        <Text>
            Sign in
        </Text>
      </Pressable>
    </View>
  )
};

const styles = StyleSheet.create({
    page: {
        padding: 10,
        alignItems: 'stretch',
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'dodgerblue',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    input: {
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    }
});

export default LoginScreen