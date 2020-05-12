import React, { useEffect, useCallback } from 'react';
import { ScrollView, View, Text, Image, Button, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import { toggleFavorite, addToFavorites } from '../../store/actions/favorites';

const ContactProfileScreen = props => {
    const contactId = props.navigation.getParam('contactId');
    const selectedContact = useSelector(state =>
        state.contacts.allContacts.find(contact => contact.id === contactId)
    );
    const cuttentContactIsFavorite = useSelector(state =>
        state.favorites.favoriteContacts.some(contact => contact.id === contactId)
    );
    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(contactId));
    }, [dispatch, contactId]);

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
    }, [toggleFavoriteHandler]);

    useEffect(() => {
        props.navigation.setParams({ isFav: cuttentContactIsFavorite });
    }, [cuttentContactIsFavorite]);

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedContact.imageUrl }} />
            <View style={styles.actions}>
                <Button
                    color={Colors.primary}
                    title="Add to Favorites"
                    onPress={() => {
                        dispatch(addToFavorites(contactId));
                    }}
                />
            </View>
            <Text style={styles.description}>{selectedContact.description}</Text>
        </ScrollView>
    );
};

ContactProfileScreen.navigationOptions = navData => {
    const contactFullName = navData.navigation.getParam('contactFullName');
    const toggleFavorite = navData.navigation.getParam('toggleFav');
    const isFavorite = navData.navigation.getParam('isFav');

    return {
        headerTitle: contactFullName,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Favorites'
                iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
                onPress={toggleFavorite}
            />
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 20,
        textAlign: 'center',
        marginHorizontal: 20
    }
});

export default ContactProfileScreen;