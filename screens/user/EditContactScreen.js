import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet , Platform} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import * as contactActions from '../../store/actions/contacts';

const EditContactScreen = props => {
    const contactId = props.navigation.getParam('contactId');
    const editedContact = useSelector(state => 
        state.contacts.userContacts.find(contact => contact.id === contactId)
    );
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(editedContact ? editedContact.firstName : '');
    const [lastName, setLastName] = useState(editedContact ? editedContact.lastName : '');
    const [email, setEmail] = useState(editedContact ? editedContact.email : '');
    const [phoneNumber, setPhoneNumber] = useState(editedContact ? editedContact.phoneNumber : '');
    const [imageUrl, setImageUrl] = useState(editedContact ? editedContact.imageUrl : '');
    const [linkedInUrl, setLinkedInUrl] = useState(editedContact ? editedContact.linkedInUrl : '');
    const [location, setLocation] = useState(editedContact ? editedContact.location : '');
    const [eventName, setEventName] = useState(editedContact ? editedContact.eventName : '');
    const [interests, setInterests] = useState(editedContact ? editedContact.interests : '');
    const [description, setDescription] = useState(editedContact ? editedContact.description : '');

    const submitHandler = useCallback(() => {
        if (editedContact) {
            dispatch(contactActions.updateContact(
                contactId, 
                firstName, 
                lastName, 
                email,
                phoneNumber,
                imageUrl,
                linkedInUrl,
                location,
                eventName,
                interests,
                description));
        } else {
            dispatch(contactActions.createContact(
                firstName, 
                lastName, 
                email,
                phoneNumber,
                imageUrl,
                linkedInUrl,
                location,
                eventName,
                interests,
                description));
        }
        props.navigation.goBack();
    }, [dispatch, contactId, firstName, lastName, email, phoneNumber, imageUrl, linkedInUrl, location, eventName, interests, description]);

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler});
    }, [submitHandler]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        value={firstName}
                        onChangeText={text => setFirstName(text)}
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        value={lastName}
                        onChangeText={text => setLastName(text)}
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={text => setEmail(text)}
                        keyboardType='email-address'
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        value={phoneNumber}
                        onChangeText={text => setPhoneNumber(text)}
                        keyboardType='phone-pad'
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={text => setImageUrl(text)}
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>LinkedIn URL</Text>
                    <TextInput
                        style={styles.input}
                        value={linkedInUrl}
                        onChangeText={text => setLinkedInUrl(text)}
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Location</Text>
                    <TextInput
                        style={styles.input}
                        value={location}
                        onChangeText={text => setLocation(text)}
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Event Name</Text>
                    <TextInput
                        style={styles.input}
                        value={eventName}
                        onChangeText={text => setEventName(text)}
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Interests</Text>
                    <TextInput
                        style={styles.input}
                        value={interests}
                        onChangeText={text => setInterests(text)}
                        returnKeyType="next"
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)}
                        returnKeyType="done"
                        autoCorrect
                        autoCapitalize="sentences"
                        multiline
                        numberOfLines={3}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

EditContactScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');

    return {
        headerTitle: navData.navigation.getParam('contactId')
            ? 'Edit Contact'
            : 'Add Contact',
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Save'
                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={submitFn}
                />
            </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default EditContactScreen;