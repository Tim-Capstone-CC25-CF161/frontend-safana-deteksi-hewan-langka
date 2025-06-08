import BksdaPresenter from './bksda-presenter';
import * as BksdaModel from '../../data/bksda-model';
import Toast from '../components/toats'

export default class BksdaPage {
  #presenter = null;

  async render() {
    return `
      <section class="background-gradient d-flex justify-content-center min-vh-100 pt-5 pt-lg-4">
        <article class="mt-5 card bg-cream container-fluid m-3 m-md-5 shadow-lg p-2 p-lg-5">
          <div class="card-header bg-transparent border-0">
            <h1 class="fs-1 text-center">List BKSDA</h1>
          </div>
          <div id="bksda-loading" class="d-flex align-items-center justify-content-center h-100">
            <p class="loading-text fs-1">
              <i class="bi bi-gear loader-icon me-2 w-auto h-auto"></i>
              <span>Memuat Data BKSDA...</span>
            </p>
          </div>
          <div id="list-bksda-body" class="card-body d-flex flex-wrap justify-content-center gap-4"></div>
        </article>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new BksdaPresenter({
      view: this,
      model: BksdaModel,
    });

    await this.#presenter.getDataAllBksda();
  }

  getDataAllBksdaSuccessfully(data) {
    const bodyListBksda = document.getElementById('list-bksda-body');

    bodyListBksda.innerHTML = data.map(bksda => `
      <div class="card shadow-sm" style="width: 20rem;">
        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title">BKSDA Provinsi ${bksda.nama}</h5>
          <p class="card-text">
            <i class="bi bi-telephone me-1"></i> ${bksda.nomor_wa}
          </p>
        </div>
      </div>
    `).join('');
  }
  
  hideLoading() {
    const bksdaLoading = document.getElementById('bksda-loading');
    bksdaLoading.classList.add('d-none');
  }

  getDataAllBksdaFailed(error) {
    const bksdaLoading = document.getElementById('bksda-loading');
    bksdaLoading.innerHTML = `
      <p class="loading-text fs-1 text-danger">
        <i class="bi bi-exclamation-triangle-fill me-2 w-auto h-auto"></i>
        <span>Gagal Memuat Data BKSDA...</span>
      </p>
    `;

    Toast.fire({
      icon: "error",
      title: 'Terjadi kesalahan saat memuat BKSDA!',
    });

    console.error(error);
  }
}
