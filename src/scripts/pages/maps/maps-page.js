import Map from "../../utils/maps";

export default class MapsPage {
  #map = null;

  async render() {
    return `
      <section class="background-gradient d-flex justify-content-center min-vh-100 pt-5 pt-lg-4">
        <article class="mt-5 card bg-cream container-fluid m-3 m-md-5 shadow-lg p-2 p-lg-5">
          <div class="card-header bg-transparent border-0">
            <h1 class="fs-1 text-center">Peta Sebaran</h1>
          </div>
          <div class="card-body">
            <div id="map" class="w-100 h-100"></div>
          </div>
        </article>
      </section>
    `;
  }

  async afterRender() {
    // Do your job here
    await this.initialMap();
  }

  async initialMap() {
    this.#map = await Map.build('#map');

    this.setDeteksiCoordinates('', [
      { lat: 0.5046, lon: 101.4411, name: 'Nama Hewan 1', photoUrl: 'https://placehold.co/180x120?text=Hewan+1', id: '1' },
      { lat: -0.7893, lon: 113.9213, name: 'Nama Hewan 2', photoUrl: 'https://placehold.co/180x120?text=Hewan+2', id: '2' },
      { lat: -8.5831, lon: 116.3200, name: 'Nama Hewan 3', photoUrl: 'https://placehold.co/180x120?text=Hewan+3', id: '3' },
      { lat: -2.5489, lon: 140.7097, name: 'Nama Hewan 4', photoUrl: 'https://placehold.co/180x120?text=Hewan+4', id: '4' },
      { lat: 3.5854, lon: 98.6703, name: 'Nama Hewan 5', photoUrl: 'https://placehold.co/180x120?text=Hewan+5', id: '5' },
      { lat: -1.2454, lon: 136.5087, name: 'Nama Hewan 6', photoUrl: 'https://placehold.co/180x120?text=Hewan+6', id: '6' },
      { lat: -5.1354, lon: 120.2944, name: 'Nama Hewan 7', photoUrl: 'https://placehold.co/180x120?text=Hewan+7', id: '7' },
      { lat: -2.5489, lon: 114.5900, name: 'Nama Hewan 8', photoUrl: 'https://placehold.co/180x120?text=Hewan+8', id: '8' },
      { lat: -8.4095, lon: 122.2367, name: 'Nama Hewan 9', photoUrl: 'https://placehold.co/180x120?text=Hewan+9', id: '9' },
      { lat: 0.8915, lon: 97.3953, name: 'Nama Hewan 10', photoUrl: 'https://placehold.co/180x120?text=Hewan+10', id: '10' },
    ]);
  }
  
  setDeteksiCoordinates(message, listDeteksi) {
    listDeteksi.forEach((deteksi) => {
      if (this.#map) {
        const coordinate = [deteksi.lat, deteksi.lon];
        const markerOptions = { alt: `${deteksi.name}` };
        const popupOptions = {
          content: `
            <div class="popup">
              <img src="${deteksi.photoUrl}" class="popup-image w-100" alt="Gambar hewan ${deteksi.name}">
              <h2 class="popup-title fs-5 mb-2">${deteksi.name}</h2>
              <button class="btn btn-sm btn-link ps-0">
                Lihat Detail Hewan >>
              </button>
            </div>
          `,
        };
        this.#map.addMarker(coordinate, markerOptions, popupOptions);
      }
    });
  }
}
