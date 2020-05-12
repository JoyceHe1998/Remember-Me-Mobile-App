import React from 'react';
import { FlatList, Button, Platform, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import ContactInstance from '../../components/overview/ContactInstance';
import ContactList from '../../components/overview/ContactList';
import Colors from '../../constants/Colors';
import { addToFavorites } from '../../store/actions/favorites';
import * as contactsActions from '../../store/actions/contacts';

const UserContactsScreen = props => {
    const userContacts = useSelector(state => state.contacts.userContacts);
    const favoriteContacts = useSelector(state => state.favorites.favoriteContacts);
    const selectContactHandler = (id, fullName, isFavorite) => {
        props.navigation.navigate('ContactProfile', {
            contactId: id,
            contactFullName: fullName,
            isFav: isFavorite
        });
    };

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(productActions.deleteProduct(id));
                }
            }
        ]);
    };

    const editContactHandler = (id) => {
        props.navigation.navigate('EditContact', { contactId: id });
    };

    const dispatch = useDispatch();

    return (
        <FlatList
            data={userContacts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ContactInstance
                    image={itemData.item.imageUrl}
                    firstName={itemData.item.firstName}
                    lastName={itemData.item.lastName}
                    onSelect={() => {
                        editContactHandler(itemData.item.id);
                    }}
                >
                    {/* <Button color={Colors.primary} title="View Profile" onPress={() => {
                        selectContactHandler(
                            itemData.item.id,
                            itemData.item.firstName + ' ' + itemData.item.lastName,
                            favoriteContacts.find(contact => contact.id === itemData.item.id));
                    }} />
                    <Button color={Colors.primary} title="To Favorites" onPress={() => {
                        dispatch(addToFavorites(itemData.item.id));
                    }} /> */}
                    <Button color={Colors.primary} title="Edit" onPress={() => {
                        editContactHandler(itemData.item.id);
                    }} />
                    <Button color={Colors.primary} title="Delete" onPress={deleteHandler.bind(this, itemData.item.id)} />
                </ContactInstance>
            }
        />
    );
};

UserContactsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Contacts',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => [
                    navData.navigation.toggleDrawer()
                ]}
            />
        </HeaderButtons>,
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Add'
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={() => {
                        navData.navigation.navigate('EditContact');
                    }}
                />
            </HeaderButtons>
    };
};

export default UserContactsScreen;