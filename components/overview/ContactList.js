// import React from 'react';
// import { FlatList, StyleSheet, View } from 'react-native';
// import ContactInstance from './ContactInstance';
// import { useSelector, useDispatch } from 'react-redux';
// import { addToFavorites } from '../../store/actions/favorites';

// const ContactList = props => {
//     const favoriteContacts = useSelector(state => state.favorites.favoriteContacts);

//     const dispatch = useDispatch();

//     const renderContactInstance = itemData => {
//         const isFavorite = favoriteContacts.find(contact => contact.id === itemData.item.id);
//         return (
//             <ContactInstance
//                 image={itemData.item.imageUrl}
//                 firstName={itemData.item.firstName}
//                 lastName={itemData.item.lastName}
//                 onViewProfile={() => {
//                     // props.navigation.navigate('ContactProfile', {
//                     //     contactId: itemData.item.id,
//                     //     contactFullName: itemData.item.firstName + ' ' + itemData.item.lastName,
//                     //     isFav: isFavorite
//                     // });
//                 }}
//                 onAddToFavorites={() => {
//                     dispatch(addToFavorites(itemData.item.id));
//                 }}
//             />
//         );
//     };

//     return (
//         <View style={styles.list}>
//             <FlatList
//                 data={props.listData}
//                 keyExtractor={item => item.id}
//                 renderItem={renderContactInstance}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     list: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 15
//     }
// });

// export default ContactList;