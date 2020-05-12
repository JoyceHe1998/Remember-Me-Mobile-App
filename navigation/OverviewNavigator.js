import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Colors from '../constants/Colors';
import ContactsOverviewScreen from '../screens/overview/ContactsOverviewScreen';
import ContactProfileScreen from '../screens/overview/ContactProfileScreen';
import FavoritesScreen from '../screens/contact/FavoritesScreen';
import UserContactsScreen from '../screens/user/UserContactsScreen';
import EditContactScreen from '../screens/user/EditContactScreen';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ContactsNavigator = createStackNavigator(
    {
        ContactsOverview: ContactsOverviewScreen,
        ContactProfile: ContactProfileScreen
    }, {
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    ContactProfile: ContactProfileScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
}
);

const tabsScreenConfig = {
    Contacts: {
        screen: ContactsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-contacts' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primary,
            drawerIcon: drawerConfig => (
                <Ionicons
                    name={Platform.OS === 'android' ? 'md-contacts' : 'ios-contacts'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accent,
            drawerIcon: drawerConfig => (
                <Ionicons
                    name={Platform.OS === 'android' ? 'md-star' : 'ios-star'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        }
    }
}

const ContactsFavTabNavigator =
    Platform.OS === 'android' 
    ? createMaterialBottomTabNavigator(tabsScreenConfig, {
        activeColor: 'white',
        shifting: true
    }) 
    : createBottomTabNavigator(tabsScreenConfig, {
        tabBarOptions: {
            activeTintColor: Colors.accent
        },
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons
                    name={Platform.OS === 'android' ? 'md-contacts' : 'ios-contacts'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        }
    });

const AdminNavigator = createStackNavigator(
    {
        UserContacts: UserContactsScreen,
        EditContact: EditContactScreen
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => (
                <Ionicons 
                    name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        },
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const MainNavigator = createDrawerNavigator({
    ContactsAndFavorites: ContactsFavTabNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
});

export default createAppContainer(MainNavigator);