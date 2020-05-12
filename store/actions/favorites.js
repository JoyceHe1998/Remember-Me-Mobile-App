export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';

export const toggleFavorite = (id) => {
    return {type: TOGGLE_FAVORITE, contactId: id};
};

export const addToFavorites = (id) => {
    return {type: ADD_TO_FAVORITES, contactId: id};
}