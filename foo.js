import bar, {version, api} from './bar';

(function (window, document, undefined) {
    'use strict';
    console.log('hello from the other side');    
    
    const form = document.querySelector('.contact-form');
    
    function onSubmit (event) {
        event.preventDefault();
        console.log(event);
        const button = document.querySelector('#contact-form__button');
        const name = document.querySelector('input[name="name"]').value.replace(/[^A-z ]/g, '');
        const email = document.querySelector('input[name="email"]').value.toLowerCase();
        const subject = document.querySelector('input[name="subject"]').value.replace(/[^\w .+]/g, '');
        const body = document.querySelector('textarea[name="body"]').value.replace(/[^\w .+]/g, '');

        const message = { name:name, email:email, subject:subject, body:body };
        var messageKey = api.child('messages').push().key;

        button.disabled = true;

        api.child('/messages/' + messageKey + '/').set(message)
            .then(function () {
                alert('Message sent successfully.');
                form.reset();                
            })
            .catch(function (error) {
                alert('Your message could not be sent at the moment.')
                console.warn(error);
            })
            .then(function () {
                button.disabled = false;
            });
        
        api.child('/user-messages/' + name.replace(/ /g, '').toLowerCase() 
            + '/' + messageKey + '/').set(message);
    };

    form.addEventListener('submit', onSubmit);

} (window, document));

export default function foo() {
    console.log('foo');
    bar();    
};