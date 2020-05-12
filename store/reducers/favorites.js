import CONTACTS from "../../data/dummy-data";
import { TOGGLE_FAVORITE, ADD_TO_FAVORITES } from "../actions/favorites";
import { DELETE_CONTACT } from '../actions/contacts';

const initialState = {
    contacts: CONTACTS,
    favoriteContacts: []
};

const favoritesReducer = (state = initialState, action) => {
    const existingIndex = state.favoriteContacts.findIndex(contact => contact.id === action.contactId);

    switch (action.type) {
        case TOGGLE_FAVORITE:
            if (existingIndex >= 0) {
                const updatedFavContacts = [...state.favoriteContacts];
                updatedFavContacts.splice(existingIndex, 1)
                return { ...state, favoriteContacts: updatedFavContacts };
            } else {
                const contact = state.contacts.find(contact => contact.id === action.contactId);
                return { ...state, favoriteContacts: state.favoriteContacts.concat(contact) };
            }
        case ADD_TO_FAVORITES:
            if (existingIndex >= 0) {
                return state;
            } else {
                const contact = state.contacts.find(contact => contact.id === action.contactId);
                return { ...state, favoriteContacts: state.favoriteContacts.concat(contact) };
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.cid),
                favoriteContacts: state.favoriteContacts.filter(contact => contact.id !== action.pid)
            };
        default:
            return state;
    }
    return state;
};

export default favoritesReducer;