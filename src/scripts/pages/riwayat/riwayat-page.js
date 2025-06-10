import RiwayatPresenter from './riwayat-presenter';
import * as HewanModel from '../../data/hewan-model';
import Toast from '../components/toats';

export default class RiwayatPage {
  #presenter = null;

  async render() {
    return `
      <section class="background-gradient d-flex justify-content-center min-vh-100 pt-5 pt-lg-4">
        <article class="mt-5 card bg-cream container-fluid m-3 m-md-5 shadow-lg p-2 p-lg-5">
          <div class="card-header bg-transparent border-0">
            <h1 class="fs-1 text-center">Riwayat Deteksi Saya</h1>
          </div>
          <div id="riwayat-loading" class="d-flex align-items-center justify-content-center h-100">
            <p class="loading-text fs-1">
              <i class="bi bi-gear loader-icon me-2 w-auto h-auto"></i>
              <span>Memuat Data Riwayat Deteksi...</span>
            </p>
          </div>
          <div id="riwayat-body" class="card-body d-flex flex-wrap justify-content-center gap-4"></div>
        </article>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new RiwayatPresenter({
      view: this,
      model: HewanModel,
    });

    await this.#presenter.getDataRiwayat();
  }

  getDataRiwayatSuccessfully(data) {
    console.log(data);
  }
  
  hideLoading() {
    const riwayatLoading = document.getElementById('riwayat-loading');
    riwayatLoading.classList.add('d-none');
  }

  getDataRiwayatFailed(error) {
    const riwayatLoading = document.getElementById('riwayat-loading');
    riwayatLoading.innerHTML = `
      <p class="loading-text fs-1 text-danger">
        <i class="bi bi-exclamation-triangle-fill me-2 w-auto h-auto"></i>
        <span>Gagal Memuat Data Riwayat...</span>
      </p>
    `;

    Toast.fire({
      icon: "error",
      title: 'Terjadi kesalahan saat memuat data riwayat!',
    });

    console.error(error);
  }
}
