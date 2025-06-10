// CSS imports
import '../styles/styles.scss';
import 'leaflet/dist/leaflet.css';

import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

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

  window.addEventListener("scroll", function () {
    const navigasi = document.querySelector("nav");
  
    if (window.scrollY > 50) {
      navigasi.classList.remove("container", "rounded-pill", "mt-lg-5", "mt-sm-3", "m-3");
    } else {
      navigasi.classList.add("container", "rounded-pill", "mt-lg-5", "mt-sm-3", "m-3");
    }
  });
});
