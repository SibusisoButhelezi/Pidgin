import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React, {useState} from 'react'

const LoginScreen = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const signin = () => {

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