if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', {scope: '/divs-portfaux/'})
    .then(() => console.log('SW installed'))
    .catch((err) => console.warn(err));
}