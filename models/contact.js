class Contact {
    constructor(id, firstName, lastName, email, phoneNumber, imageUrl, linkedInUrl, location, eventName, interests, description) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.imageUrl = imageUrl;
        this.linkedInUrl = linkedInUrl;
        this.location = location;
        this.eventName = eventName;
        this.interests = interests;
        this.description = description;
    }
}

export default Contact;