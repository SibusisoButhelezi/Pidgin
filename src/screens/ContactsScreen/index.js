import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import contacts from '../../../assets/data/contacts.json';

const ContactsScreen = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contacts); // This is to keep the contacts displayed dynamic
  
  const navigation = useNavigation();
  
  useEffect (() => {
      const newContacts = contacts.filter(
        contact => contact.user_display_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredContacts(newContacts);
    }, [searchTerm]
  ); 

  const callUser = (user) => {
    navigation.navigate("Calling", {user: user});
  };
  /*
    useEffect thats in a function and an array of dependencies as arguements.
    When the dependency changes, the function passed in is run
  */ 

    return(
        <View style={styles.background}>
            <TextInput 
              value={searchTerm} 
              onChangeText={setSearchTerm} 
              style={styles.searchInput} 
              placeholder="Search..." 
            />
            <FlatList 
            data = {filteredContacts}
            renderItem={({item}) => (
              <Pressable onPress={() => callUser(item)}>
                <Text style={styles.contactName}>
                  {item.user_display_name}
                </Text>
              </Pressable>
            )}
            ItemSeparatorComponent = {() => 
              <View style={styles.separator} />}
        />
      </View>

    );
};

const styles = StyleSheet.create({


    background: {
      padding: 20,
      backgroundColor: 'white',
      flex: 1,
    },
    contactName: {
      fontSize: 22,
      marginVertical: 6,
    },
    separator: {
      width: '100%',
      height: 2,
      backgroundColor: '#e0e0e0'
    },
    searchInput: {
      backgroundColor: '#e0e0e0',
      padding: 4,
      borderRadius: 5,
    }
  });

export default ContactsScreen;

/*
  Search Functionality
  In order to keep track of the user input, we import useState form react
  const [searchTerm, settingFunction] = useState('defaultString');
  searchTerm is the string entered in by the user
  settingFunction is the function that will update the value in state and will trigger a rerender
  In the TextInput tag:
    value = {searchTerm}
    onChangeText = {settingFunction} this is a callback function that is run every time the text changes
*/ 