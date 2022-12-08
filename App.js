/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Navigation from './src/navigation'


const App = () => {

  return (
    <>
      <StatusBar barStyle={'dark-content'}/>
      <Navigation />
    </>
  );
};

  /*
    Colors:
    #0b2026
    #40798c
    #7099a8
    #d0ebf4
  */


export default App;
