const publicVapidKey = 'BIuFA0bLWJ8xmAOG-6laMZOnG4tWMtGA1_7cejuWaN8kK2JKtrSIpUxFSXTbCKCen6NaEt-jJnfCHkshYL-FV8A';
const trigger = document.getElementById('trigger');
trigger.addEventListener('click',function(e){
  // Check for service worker
if ('serviceWorker' in navigator) {
  send().catch(err => console.error(err));
}
});


// Register ServiceWorker, Register Push, Send Push
async function send() {
  // Register Service Worker
  console.log('Registering service worker...');
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  });
  console.log('Service Worker Registered...');

  // Register Push
  const convertedKey = urlBase64ToUint8Array(publicVapidKey);
  console.log('Registering Push...');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedKey
  });
  console.log('Push Registered...');

  // Send Push Notification
  console.log('Sending Push...');
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
  console.log('Push Sent...');
}

//must function to convert public key to unit8array from base64
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}