// Initialize Firebase
const config = {
    apiKey: "AIzaSyDWnz8KzRY3c8MDUyDg4AkyXWhVcVodSQo",
    authDomain: "divs-portfaux.firebaseapp.com",
    databaseURL: "https://divs-portfaux.firebaseio.com",
    storageBucket: "divs-portfaux.appspot.com",
    messagingSenderId: "888604659380"
};
firebase.initializeApp(config);
const version = '/v0';
const api = firebase.database().ref(version);

document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('.contact-form');
    const onSubmit = (event) => {
        event.preventDefault();
        const button = document.querySelector('#contact-form__button');
        const name = document.querySelector('input[name="name"]').value.replace(/[^A-z ]/g, '');
        const email = document.querySelector('input[name="email"]').value.toLowerCase();
        const subject = document.querySelector('input[name="subject"]').value.replace(/[^\w .+]/g, '');
        const body = document.querySelector('textarea[name="body"]').value.replace(/[^\w .+]/g, '');

        const message = { name, email, subject, body };
        let messageKey = api.child('messages').push().key;

        button.disabled = true;
        api.child(`/messages/${messageKey}/`).set(message)
            .then(() => {
                alert('Message sent successfully.');
                form.reset();
                button.disabled = false;
            })
            .catch((error) => alert('Your message could not be sent at the moment.'));
        api.child(`/user-messages/${name.toLowerCase()}/${messageKey}/`).set(message);
    };

    form.addEventListener('submit', onSubmit);
});