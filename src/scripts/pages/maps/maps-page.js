import MapsPresenter from "./maps-presenter";
import * as HewanModel from "../../data/hewan-model";
import Toast from "../../pages/components/toats";
import Map from "../../utils/maps";
import CONFIG from '../../config';

export default class MapsPage {
  #mapLoadingContainer = null;
  #presenter = null;
  #map = null;

  async render() {
    return `
      <section class="background-gradient d-flex justify-content-center min-vh-100 pt-5 pt-lg-4">
        <article class="mt-5 card bg-cream container-fluid m-3 m-md-5 shadow-lg p-2 p-lg-5">
          <div class="card-header bg-transparent border-0">
            <h1 class="fs-1 text-center">Peta Sebaran</h1>
            <p id="map-description" class="fs-5 text-center d-none"></p>
          </div>
          <div class="card-body">
            <div class="card h-100 w-100">
              <div id="map" class="w-100 h-100 z-1"></div>
              <div id="map-sebaran-loading-container" class="card-img-overlay z-3 bg-secondary opacity-50 d-flex align-items-center justify-content-center">
                <p class="fs-1 text-white">
                  <i class="bi bi-gear loader-icon me-2 w-auto h-auto"></i>
                  <span id="map-loading-text">Memuat...</span>
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new MapsPresenter({
      view: this,
      model: HewanModel
    });

    this.#mapLoadingContainer = document.querySelector('#map-sebaran-loading-container');

    await this.#presenter.initialGalleryAndMap();
  }

  async initialMap() {
    this.#map = await Map.build('#map');
  }
  
  setDeteksiCoordinates(totalDeteksi, listDeteksi) {
    const mapDescription = document.querySelector('#map-description');
    const maxShowDeteksi = 100;

    if (totalDeteksi >= maxShowDeteksi) {
      mapDescription.innerHTML = `Menampilkan ${maxShowDeteksi} lokasi hewan terbaru yang terdeteksi, dari total <strong>${totalDeteksi} hewan</strong> yang sudah terdeteksi sejauh ini.`;
    } else {
      mapDescription.innerHTML = `Menampilkan <strong>${totalDeteksi} hewan</strong> yang sudah terdeteksi sejauh ini.`;
    }

    mapDescription.classList.remove('d-none');

    listDeteksi.forEach((deteksi, index) => {
      if (this.#map) {
        const coordinate = [deteksi.latitude, deteksi.longitude];
        const markerOptions = { alt: `${deteksi.nama_hewan}` };
        const popupOptions = {
          content: `
            <div class="popup">
              <img id="img-${index}" data-index="${index}" src="${CONFIG.BASE_URL + deteksi.image}" class="mb-2 object-fit-cover rounded img-popup-map d-none" alt="Gambar hewan ${deteksi.nama_hewan}">
              <div id="loading-image-${index}" class="loading-image-popup">
                <svg class="loader-icon me-2 w-auto h-auto" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
                </svg>
                Memuat Gambar...
              </div>
              <h2 class="popup-title fs-6 mb-2 text-capitalize">${deteksi.nama_hewan.replaceAll('_', ' ')}</h2>
              <a href="#/hewan/${deteksi.hewan_id}" class="btn btn-sm btn-link ps-0">
                Lihat Detail Hewan <i class="bi bi-chevron-double-right"></i>
              </a>
            </div>
          `,
        };
        this.#map.addMarker(coordinate, markerOptions, popupOptions);
      }
    });

    document.addEventListener('click', (e) => {
      const marker = e.target.closest('.leaflet-marker-icon');

      if (marker) {
        document.querySelectorAll('.img-popup-map').forEach((item) => {
          const index = item.getAttribute('data-index');
          
          item.addEventListener('load', () => {
            this._loadImage(index);
          });

          item.addEventListener('error', () => {
            this._loadImage(index, true);
          });
        });
      }
    })
  }

  _loadImage(id, isError = false) {
    const img = document.getElementById(`img-${id}`);
    const loading = document.getElementById(`loading-image-${id}`);
    
    if (isError) {
      if (loading) {
        const parent = loading.parentElement;

        parent.removeAttribute('data-bs-toggle');
        parent.removeAttribute('data-bs-target');

        loading.classList.remove('d-none');
        loading.innerHTML = `
          <i class="bi bi-exclamation-triangle-fill me-2 w-auto h-auto text-danger"></i>
          <span class="text-danger">Gambar Gagal Dimuat</span>
        `;

        parent.addEventListener('click', () => {
          Toast.fire({
            icon: "error",
            title: 'Gambar Gagal Dimuat',
          });
        });
      }

      return;
    }

    if (loading) {  
      loading.classList.add('d-none');
    }

    if (img) {
      img.classList.remove('d-none');
    }
  }

  setSebaranDeteksiError(message) {
    this.#mapLoadingContainer.innerHTML = `
      <p class="fs-1 text-danger">
        <i class="bi bi-exclamation-triangle-fill me-2 w-auto h-auto"></i>
        <span>Gagal Memuat Data Sebaran...</span>
      </p>
    `;

    this.#mapLoadingContainer.classList.remove('opacity-50');
    this.#mapLoadingContainer.classList.add('opacity-75');

    Toast.fire({
      icon: "error",
      title: 'Terjadi kesalahan saat memuat sebaran deteksi!',
    });

    console.error(message);
  }

  showMapLoading() {
    this.#mapLoadingContainer.classList.remove('d-none');
    this.#mapLoadingContainer.querySelector('#map-loading-text').innerHTML = 'Memuat Peta...';
  }

  hideMapLoading() {
    this.#mapLoadingContainer.classList.add('d-none');
  }

  showLoading() {
    this.#mapLoadingContainer.classList.remove('d-none');
    this.#mapLoadingContainer.querySelector('#map-loading-text').innerHTML = 'Memuat Data Sebaran Deteksi...';
  }

  hideLoading() {
    this.#mapLoadingContainer.classList.add('d-none');
  }
}
