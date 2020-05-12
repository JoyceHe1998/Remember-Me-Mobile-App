import CONTACTS from '../../data/dummy-data';
import { DELETE_CONTACT, CREATE_CONTACT, UPDATE_CONTACT } from '../actions/contacts';
import Contact from '../../models/contact';

const initialState = {
    allContacts: CONTACTS,
    userContacts: CONTACTS
};

const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CONTACT:
            const newContact = new Contact(
                new Date().toString(),
                action.contactData.firstName,
                action.contactData.lastName,
                action.contactData.email,
                action.contactData.phoneNumber,
                action.contactData.linkedInUrl,
                action.contactData.location,
                action.contactData.eventName,
                action.contactData.interests,
                action.contactData.description
            );
            return {
                ...state,
                allContacts: state.allContacts.concat(newContact),
                userContacts: state.userContacts.concat(newContact)
            };
        case UPDATE_CONTACT:
            const contactIndex = state.userContacts.findIndex(
                contact => contact.id === action.cid
            );
            const updatedContact = new Contact(
                action.cid,
                action.contactData.firstName,
                action.contactData.lastName,
                action.contactData.email,
                action.contactData.phoneNumber,
                action.contactData.linkedInUrl,
                action.contactData.location,
                action.contactData.eventName,
                action.contactData.interests,
                action.contactData.description
            );
            const updatedUserContacts = [...state.userContacts];
            updatedUserContacts[contactIndex] = updatedContact;
            const allContactsIndex = state.allContacts.findIndex(
                contact => contact.id === action.cid
            );
            const updatedAllContacts = [...state.allContacts];
            updatedAllContacts[allContactsIndex] = updatedContact;
            return {
                ...state,
                allContacts: updatedAllContacts,
                userContacts: updatedUserContacts
            };
        case DELETE_CONTACT:
            return {
                ...state,
                userContacts: state.userContacts.filter(contact => contact.id !== action.cid),
                allContacts: state.allContacts.filter(contact => contact.id !== action.pid)
            };
    }
    return state;
};

export default contactsReducer;