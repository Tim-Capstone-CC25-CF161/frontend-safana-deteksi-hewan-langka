import GaleryPresenter from './galery-presenter';
import * as HewanModel from '../../data/hewan-model';
import { generatePaginationButton } from '../../templates';
import Toast from '../components/toats'
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
          <div id="galery-loading" class="d-flex align-items-center justify-content-center">
            <p class="loading-text fs-1">
              <i class="bi bi-gear loader-icon me-2 w-auto h-auto"></i>
              <span>Memuat Data Galeri...</span>
            </p>
          </div>
          <div id="galery-body" class="card-body d-flex flex-wrap justify-content-center gap-4"></div>
          <div id="controller-pagination" class="col-12 row align-items-center justify-content-between mx-0 pt-5">
            <div class="col-sm-12 col-md-6 row align-items-center">
              <div class="col-12 col-md-2">
                <select id="input-limit" class="form-select" data-hide-search="true" aria-label="Limit Data" name="limit-data">
                  <option selected value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>
              <div class="col">
                <span id="desc-limit">Menampilkan 0-0 dari 0.</span>
              </div>
            </div>
            <div id="controller-button-pagination" class="col-sm-12 col-md-6 d-flex justify-content-end mt-4 mt-md-0"></div>
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

    document.querySelectorAll('.modal').forEach((modal) => {
      modal.addEventListener('shown.bs.modal', () => {
        console.log(document.activeElement);
      });

      modal.addEventListener('hide.bs.modal', () => {
        console.log(document.activeElement);

        document.getElementById('galery-body').focus();

        console.log(document.activeElement);
      });
    });
  }

  getGalerySuccessfully(data_response) {
    const bodyGalery = document.getElementById('galery-body');
    const data_galery = data_response.data;

    bodyGalery.innerHTML = data_galery.map((data, index) => `
      <div class="card shadow galery-item-card" data-bs-toggle="modal" data-bs-target="#modalDetailImg${index}">
        <img id="img-${index}" src="${CONFIG.BASE_URL + data.image}" class="object-fit-cover rounded h-100 img-item-galery d-none" alt="Foto Hewan ${data.nama_hewan}">
        <div id="loading-image-${index}" class="loading-image-galery">
          <svg class="loader-icon me-2 w-auto h-auto" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
          </svg>
          Memuat Gambar...
        </div>
        <div class="card-body card-img-overlay d-flex align-items-end justify-content-center">
          <h5 class="card-title text-center text-capitalize w-100 bg-dark text-light border">${data.nama_hewan.replaceAll('_', ' ')}</h5>
        </div>
      </div>

      <div class="modal fade" id="modalDetailImg${index}" tabindex="-1" aria-labelledby="modalDetailImg${index}Label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 text-capitalize" id="modalDetailImg${index}Label">Gambar ${data.nama_hewan.replaceAll('_', ' ')}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="d-flex flex-column gap-2">
                <img id="detail-img-${index}" src="${CONFIG.BASE_URL + data.image}" class="img-fluid w-100" alt="Gambar ${data.nama_hewan.replaceAll('_', ' ')}">
              </div>
              <div class="row mt-3">
                <div class="col-12 col-md-6">
                  <label class="fw-bold" for="textNamaHewan${index}">Nama Hewan:</label>
                  <p id="textNamaHewan${index}" class="text-muted text-capitalize">${data.nama_hewan.replaceAll('_', ' ')}</p>
                </div>
                <div class="col-12 col-md-6">
                  <label class="fw-bold" for="textNamaLatin${index}">Nama Latin:</label>
                  <p id="textNamaLatin${index}" class="text-muted">${data.namaLatin}</p>
                </div>
                <div class="col-12 col-md-6">
                  <label class="fw-bold" for="textAlamat${index}">Ditemukan Di:</label>
                  <p id="textAlamat${index}" class="text-muted">${data.address}</p>
                </div>
                <div class="col-12 col-md-6">
                  <label class="fw-bold" for="textKoordinat${index}">Koordinat:</label>
                  <p id="textKoordinat${index}" class="text-muted">${data.latitude}, ${data.longitude}</p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <a href="${`#/hewan/${data.hewan_id}`}" class="btn btn-primary btn-lihat-detail text-white">Lihat Detail Hewan</a>
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.img-item-galery').forEach((item, index) => {
      item.addEventListener('load', () => {
        this._loadImage(index);
      });

      item.addEventListener('error', () => {
        this._loadImage(index, true);
      });
    });

    document.querySelectorAll('.btn-lihat-detail').forEach((item) => {
      item.addEventListener('click', () => {
        item.parentElement.querySelector('button').click();
      });
    });

    this._setPagination(data_response);
  }

  _loadImage(id, isError = false) {
    const img = document.getElementById(`img-${id}`);
    const loading = document.getElementById(`loading-image-${id}`);
    
    if (isError) {
      if (loading) {
        const parentDetailImg = document.getElementById(`detail-img-${id}`).parentElement;

        loading.classList.remove('d-none');
        loading.innerHTML = `
          <i class="bi bi-exclamation-triangle-fill me-2 w-auto h-auto text-danger"></i>
          <span class="text-danger">Gambar Gagal Dimuat</span>
        `;

        parentDetailImg.removeChild(parentDetailImg.firstElementChild);
        const detailLoading = loading.cloneNode(true);
        detailLoading.classList.add('w-100');
        detailLoading.setAttribute('id', `detail-img-${id}`);
        parentDetailImg.appendChild(detailLoading);
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

  hideLoadingGalery() {
    const galeryLoading = document.getElementById('galery-loading');
    galeryLoading.classList.add('d-none');
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
    const galeryLoading = document.getElementById('galery-loading');
    galeryLoading.innerHTML = `
      <p class="loading-text fs-1 text-danger">
        <i class="bi bi-exclamation-triangle-fill me-2 w-auto h-auto"></i>
        <span>Gagal Memuat Data Galeri...</span>
      </p>
    `;

    Toast.fire({
      icon: "error",
      title: 'Terjadi kesalahan saat memuat galeri!',
    });

    console.error(error);
  }
}
