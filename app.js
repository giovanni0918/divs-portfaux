import foo from './foo';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { scope: '/divs-portfaux/' })
        .then(function () {
            console.log('SW installed');
        })
        .catch(function (err) {
            console.warn(err);
        })
        .then(function () {
            foo();
        });
}