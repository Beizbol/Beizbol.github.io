const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
      console.log('Registering pwa sw');
      try {
        const registration = await navigator.serviceWorker.register(
          './pwa/sw.js',
          {
            scope: './pwa/',
          }
        );
        if (registration.installing) {
          console.log('Service worker installing');
        } else if (registration.waiting) {
          console.log('Service worker installed');
        } else if (registration.active) {
          console.log('Service worker active');
        }
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }else{
      console.log('Service worker not supported');
  }
};
  
registerServiceWorker();