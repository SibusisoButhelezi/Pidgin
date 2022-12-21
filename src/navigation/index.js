import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CallScreen from '../screens/CallScreen';
import ContactsScreen from '../screens/ContactsScreen';
import CallingScreen from '../screens/CallingScreen';
import IncomingCallScreen from '../screens/IncomingCallScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {


  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: 'true'}} />
          <Stack.Screen name="Contacts" component={ContactsScreen} options={{headerShown: 'true'}} />
            <Stack.Group screenOptions={{headerShown: false}}>
                <Stack.Screen name="Call" component={CallScreen} />
                <Stack.Screen name="Calling" component={CallingScreen} />
                <Stack.Screen name="IncomingCall" component={IncomingCallScreen} />
            </Stack.Group>
        </Stack.Navigator>
    </NavigationContainer>
  )
};

export default Navigation;