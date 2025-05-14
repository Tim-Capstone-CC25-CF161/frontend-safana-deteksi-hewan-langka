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
  }
}
