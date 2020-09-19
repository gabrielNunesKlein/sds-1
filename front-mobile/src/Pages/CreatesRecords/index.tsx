import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';

const CreateRecords = () => {
    return (
    <>
        <Header />
        <Text style={styles.text}>Hello CreateRecords</Text>
    </>
    )
};

const styles = StyleSheet.create({
    text: {
      color: '#FFF',
      fontSize: 30,
      textAlign: 'center',
      marginTop: 100
    },
  });

export default CreateRecords;