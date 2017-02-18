import firebase, {app, database} from 'firebase';

const config = {
    authDomain: "divs-portfaux.firebaseapp.com",
    databaseURL: "https://divs-portfaux.firebaseio.com",    
};

firebase.initializeApp(config);
const version = '/v0';
const api = firebase.database().ref(version);

export {version, api};
export default function bar() {
    console.log('bar');
};