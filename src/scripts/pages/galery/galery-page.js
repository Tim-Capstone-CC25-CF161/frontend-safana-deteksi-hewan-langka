import GaleryPresenter from './galery-presenter';
import * as HewanModel from '../../data/hewan-model';
import { generatePaginationButton } from '../../templates';
import CONFIG from '../../config';

export default class GaleryPage {
  #presenter = null;

  async render() {
    return `
      <section class="background-gradient d-flex justify-content-center min-vh-100 pt-5 pt-lg-4">
        <article class="mt-5 card bg-cream container-fluid m-3 m-md-5 shadow-lg p-2 p-lg-5">
          <div class="card-header bg-transparent border-0">
            <h1 class="fs-1 text-center">Galeri</h1>
          </div>
          <div id="galery-body" class="card-body d-flex flex-wrap justify-content-center gap-4"></div>
          <div id="controller-pagination" class="col-12 row align-items-center justify-content-between pt-5">
            <div class="col-sm-12 col-md-6 row align-items-center">
              <div class="col col-2">
                <select id="input-limit" class="form-select" data-hide-search="true" aria-label="Limit Data" name="limit-data">
                  <option selected value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>
              <div class="col">
                <span id="desc-limit">Menampilkan 1-10 dari 100.</span>
              </div>
            </div>
            <div id="controller-button-pagination" class="col-sm-12 col-md-6 d-flex justify-content-end"></div>
          </div>
        </article>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new GaleryPresenter({
      view: this,
      model: HewanModel,
    });

    await this.#presenter.getDataGalery();
  }

  getGalerySuccessfully(data_response) {
    const bodyGalery = document.getElementById('galery-body');
    const data_galery = data_response.data;

    bodyGalery.innerHTML = data_galery.map(data => `
      <div class="card shadow galery-item-card">
        <img src="${CONFIG.BASE_URL + data.image}" class="object-fit-cover rounded h-100" alt="Foto Hewan ${data.nama_hewan}">
        <div class="card-body card-img-overlay d-flex align-items-end justify-content-center">
          <h5 class="card-title text-center text-capitalize w-100 bg-dark text-light border">${data.nama_hewan.replaceAll('_', ' ')}</h5>
        </div>
      </div>
    `).join('');

    this._setPagination(data_response);
  }

  _setPagination(data) {
    const limitData = document.getElementById('input-limit');
    const descLimit = document.getElementById('desc-limit');
    const controllerButtonPagination = document.getElementById('controller-button-pagination');
    
    const totalData = data.total_data;
    const totalPages = data.total_pages;

    const from = (data.page - 1) * limitData.value + 1;
    const to = data.page * limitData.value > totalData ? totalData : data.page * limitData.value;

    descLimit.innerHTML = `Menampilkan ${from}-${to} dari ${data.total_data}.`;

    limitData.addEventListener('change', async () => {
      await this.#presenter.getDataGalery(1, limitData.value);
      scrollTo({ top: 0, behavior: 'instant' });
    });

    controllerButtonPagination.innerHTML = generatePaginationButton();

    const paginateFirst = document.getElementById('paginate-first');
    const paginatePrev = document.getElementById('paginate-prev');
    const paginateNumberFirst = document.getElementById('paginate-numberfirst');
    const paginateNumberMiddle = document.getElementById('paginate-numbermiddle');
    const paginateNumberLast = document.getElementById('paginate-numberlast');
    const paginateNext = document.getElementById('paginate-next');
    const paginateLast = document.getElementById('paginate-last');

    paginateFirst.addEventListener('click', async (e) => {
      e.preventDefault();
      await this.#presenter.getDataGalery(1, limitData.value);
      scrollTo({ top: 0, behavior: 'smooth' });
    });

    paginatePrev.addEventListener('click', async (e) => {
      e.preventDefault();
      await this.#presenter.getDataGalery(data.page - 1, limitData.value);
      scrollTo({ top: 0, behavior: 'smooth' });
    });

    paginateNext.addEventListener('click', async (e) => {
      e.preventDefault();
      await this.#presenter.getDataGalery(data.page + 1, limitData.value);
      scrollTo({ top: 0, behavior: 'smooth' });
    });

    paginateLast.addEventListener('click', async (e) => {
      e.preventDefault();
      await this.#presenter.getDataGalery(totalPages, limitData.value);
      scrollTo({ top: 0, behavior: 'smooth' });
    });

    if (data.page === 1) {
      paginateFirst.classList.add('disabled');
      paginatePrev.classList.add('disabled');
      paginateNumberFirst.classList.add('d-none');
    } else {
      paginateFirst.classList.remove('disabled');
      paginatePrev.classList.remove('disabled');
      paginateNumberFirst.classList.remove('d-none');
    }

    if (data.page === totalPages) {
      paginateNext.classList.add('disabled');
      paginateLast.classList.add('disabled');
      paginateNumberLast.classList.add('d-none');
    } else {
      paginateNext.classList.remove('disabled');
      paginateLast.classList.remove('disabled');
      paginateNumberLast.classList.remove('d-none');
    }

    paginateNumberFirst.innerHTML = data.page - 1;
    paginateNumberFirst.setAttribute('data-page', data.page - 1);
    paginateNumberFirst.addEventListener('click', async (e) => {
      e.preventDefault();
      const page = e.target.getAttribute('data-page');

      await this.#presenter.getDataGalery(page, limitData.value);
      scrollTo({ top: 0, behavior: 'smooth' });
    })

    paginateNumberMiddle.innerHTML = data.page;

    paginateNumberLast.innerHTML = data.page + 1;
    paginateNumberLast.setAttribute('data-page', data.page + 1);
    paginateNumberLast.addEventListener('click', async (e) => {
      e.preventDefault();
      const page = e.target.getAttribute('data-page');

      await this.#presenter.getDataGalery(page, limitData.value);
      scrollTo({ top: 0, behavior: 'smooth' });
    })
  }

  getGaleryFailed(error) {
    console.error(error);
  }
}
