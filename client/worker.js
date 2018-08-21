console.log('Service Worker Loaded...');

self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('Push Recieved...');
  self.registration.showNotification(data.title, {
    body: 'Notified by Pranav Kapoor!',
    icon:'https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-9/11230099_10206835592669367_2911893136176495642_n.jpg?_nc_cat=0&oh=e83112cbadc3dddebdbd371a6ab2bd01&oe=5C37244C'
  });
});