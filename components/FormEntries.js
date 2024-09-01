import React from 'react';
import { View, StyleSheet } from 'react-native';
import FlatButton from '../FlatButton';

const FormEntries = ({ navigation }) => {
    const entry = {
        fileName: '',
        to: '',
        from: '',
        date: '',
        items: [],
        total: 0,
    };

    return (
        <View style={styles.container}>
            <FlatButton text='Invoice 1' c='#00b4d8' onPress={() => navigation.navigate('NewFiles', { entry })} style={styles.floatingButton} />
            <FlatButton text='Invoice 2' c='#00b4d8' onPress={() => navigation.navigate('NewFiles', { entry })} style={styles.floatingButton} />
            <FlatButton text='Company Invoice 1' c='#00b4d8' onPress={() => navigation.navigate('NewFiles', { entry })} style={styles.floatingButton} />
            <FlatButton text='Company Invoice 2' c='#00b4d8' onPress={() => navigation.navigate('NewFiles', { entry })} style={styles.floatingButton} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingButton: {
        marginBottom: 10, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 8,
    },
});

export default FormEntries;
