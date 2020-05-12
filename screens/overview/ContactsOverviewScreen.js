import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactList from '../../components/overview/ContactList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { Platform, Button, FlatList } from 'react-native';
import Colors from '../../constants/Colors';
import ContactInstance from '../../components/overview/ContactInstance';
import {addToFavorites} from '../../store/actions/favorites';

const ContactsOverviewScreen = props => {
    const contacts = useSelector(state => state.contacts.allContacts);
    const favoriteContacts = useSelector(state => state.favorites.favoriteContacts);
    const selectContactHandler = (id, fullName, isFavorite) => {
        props.navigation.navigate('ContactProfile', {
            contactId: id,
            contactFullName: fullName,
            isFav: isFavorite
        });
    };

    const dispatch = useDispatch();

    return (
        <FlatList
            data={contacts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ContactInstance
                    image={itemData.item.imageUrl}
                    firstName={itemData.item.firstName}
                    lastName={itemData.item.lastName}
                    onSelect={() => {
                        selectContactHandler(
                            itemData.item.id, 
                            itemData.item.firstName + ' ' + itemData.item.lastName,
                            favoriteContacts.find(contact => contact.id === itemData.item.id));
                    }}
                >
                    <Button color={Colors.primary} title="View Profile" onPress={() => {
                        selectContactHandler(
                            itemData.item.id, 
                            itemData.item.firstName + ' ' + itemData.item.lastName,
                            favoriteContacts.find(contact => contact.id === itemData.item.id));
                    }} />
                    <Button color={Colors.primary} title="To Favorites" onPress={() => {
                        dispatch(addToFavorites(itemData.item.id));
                    }} />
                </ContactInstance>
            }
        />
    );
};

ContactsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Contacts',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer()
                }}
            />
        </HeaderButtons>
    };
};

export default ContactsOverviewScreen;