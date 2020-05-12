export const DELETE_CONTACT = 'DELETE_CONTACT';
export const CREATE_CONTACT = 'CREATE_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';


export const deleteContact = contactId => {
    return {type: DELETE_CONTACT, cid: contactId};
};

export const createContact = (firstName, lastName, email, phoneNumber, imageUrl, linkedInUrl, location, eventName, interests, description) => {
    return {
        type: CREATE_CONTACT,
        contactData: {
            firstName,
            lastName,
            email,
            phoneNumber,
            imageUrl, 
            linkedInUrl,
            location,
            eventName,
            interests,
            description
        }
    }
}

export const updateContact = (id, firstName, lastName, email, phoneNumber, imageUrl, linkedInUrl, location, eventName, interests, description) => {
    return {
        type: UPDATE_CONTACT,
        cid: id,
        contactData: {
            firstName,
            lastName,
            email,
            phoneNumber,
            imageUrl, 
            linkedInUrl,
            location,
            eventName,
            interests,
            description
        }
    }
}