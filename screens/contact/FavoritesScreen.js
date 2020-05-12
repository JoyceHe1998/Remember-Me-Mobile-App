import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { View, Text, StyleSheet, FlatList, Button, Platform } from 'react-native';
import DefaultText from '../../components/UI/DefaultText';
import ContactList from '../../components/overview/ContactList';
import Colors from '../../constants/Colors';
import ContactInstance from '../../components/overview/ContactInstance';

const FavoritesScreen = props => {
    const favContacts = useSelector(state => state.favorites.favoriteContacts);
    const selectContactHandler = (id, fullName, isFavorite) => {
        props.navigation.navigate('ContactProfile', {
            contactId: id,
            contactFullName: fullName,
            isFav: isFavorite
        });
    };

    if (favContacts.length === 0 || !favContacts) {
        return (
            <View style={styles.content}>
                <DefaultText>No favorite contacts found. Start adding some!</DefaultText>
            </View>
        );
    }

    const dispatch = useDispatch();

    return (
        <FlatList
            data={favContacts}
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
                            favContacts.find(contact => contact.id === itemData.item.id));
                    }}
                >
                    <Button color={Colors.primary} title="View Profile" onPress={() => {
                        selectContactHandler(
                            itemData.item.id, 
                            itemData.item.firstName + ' ' + itemData.item.lastName,
                            favContacts.find(contact => contact.id === itemData.item.id));
                    }} />
                </ContactInstance>
            }
        />
    );
};

FavoritesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Favorites',
        // headerLeft: () => (
        //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
        //         <Item title="Menu" iconName='ios-menu' onPress={() => {
        //             navData.navigation.toggleDrawer();
        //         }}/>
        //     </HeaderButtons>
        // )
    };
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FavoritesScreen;