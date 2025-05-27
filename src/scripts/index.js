// CSS imports
import '../styles/styles.scss';
import 'leaflet/dist/leaflet.css';

import App from './pages/app';
import Camera from './utils/camera';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    containerNavbarButton: document.querySelector('#container-navbar-button'),
    loadingMain: document.querySelector('#main-loading-container'),
  });
  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
    
    Camera.stopAllStreams();
  });
});
