import DetailHewanPresenter from "./detail-hewan-presenter";
import { parseActivePathname } from "../../routes/url-parser";
import * as HewanModel from '../../data/hewan-model';
import HewanStatisModel from '../../data/detail-hewan-statis-model';

export default class DetailHewanPage {
  #detailHewanLoadingContainer = null;
  #resultBody = null;
  #presenter = null;

  #nowDialog = 0;
  #dataDialog = [
    'Disini kalian akan mengetahui detail dari hewan $nama_hewan.',
    'Kalian akan mengetahui secara bertahap.',
    'Selamat belajar!',
  ];

  async render() {
    return `
      <div class="card text-center min-vh-100 bg-soft-orange text-white rounded-0">
        <div class="card-header bg-soft-orange border-0 position-sticky top-0">
          <div class="d-flex justify-content-between align-items-center">
            <h1 class="fs-3 mb-0">Jelajah Indonesia</h1>
            <a id="back-button" href="#" class="btn btn-md btn-transparent text-white">
              <i class="bi bi-x-lg fs-3"></i>
            </a>
          </div>
          <div id="detail-hewan-loading" class="d-flex align-items-center justify-content-center h-100">
            <p class="loading-text fs-1 p-1 d-flex align-items-center flex-wrap">
              <i class="bi bi-gear loader-icon me-2 w-auto h-auto"></i>
              <span class="text-center">Memuat Data Detail Hewan...</span>
            </p>
          </div>
          <div class="progress mx-1 rounded-0 mt-2" role="progressbar" aria-label="Animated striped example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            <div id="progress-bar" class="progress-bar bg-warning progress-bar-striped progress-bar-animated" style="width: 10%"></div>
          </div>
          <div class="d-flex justify-content-between align-items-center bg-primary mt-3 rounded-pill p-2">
            <div class="d-flex">
              <div id="carouselDetailImg" class="carousel slide carousel-fade" data-bs-ride="carousel">
                <div id="img-detail-hewan" class="carousel-inner rounded-pill" style="height: 50px; width: 50px;"></div>
              </div>
              <p id="textNamaHewanHeader" class="text-capitalize text-start text-light mb-0 ms-2">-</p>
            </div>
            <div class="d-none d-flex align-items-center justify-content-center rounded-circle bg-white text-dark fw-bold" style="height: 50px; width: 50px;">
              <p class="mb-0">0/6</p>
            </div>
          </div>
        </div>

        <p id="textNamaHewan" class="card-text text-start text-capitalize d-none"></p>
        <div id="result-body" class="card-body d-flex flex-column justify-content-center align-items-center">
          <div id="result-detail" class="mt-5 pt-5 d-flex justify-content-center align-items-center d-none mb-5 w-100">
            <div id="container-isi-detail" class="w-100 px-0 px-md-5">
              <div id="carouselFunfact" class="carousel slide">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <div class="card w-100 rounded-top">
                      <div class="card-body">
                        <h5 class="card-title fw-bold">Status Konservasi</h5>
                        <p id="textStatusKonservasi" class="card-text text-start text-capitalize mt-2"></p>
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <div class="card w-100 rounded-top">
                      <div class="card-body">
                        <h5 class="card-title fw-bold">Habitat & Distribusi Asli</h5>
                        <p id="textHabitatAsli" class="card-text text-start text-capitalize mt-2"></p>
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <div class="card w-100 rounded-top">
                      <div class="card-body">
                        <h5 class="card-title fw-bold">Jenis Populasi & Tren</h5>
                        <p id="textJumlahPopulasi" class="card-text text-start text-capitalize mt-2"></p>
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <div class="card w-100 rounded-top">
                      <div class="card-body">
                        <h5 class="card-title fw-bold">Ancaman Utama</h5>
                        <p id="textAncamanUtama" class="card-text text-start text-capitalize mt-2"></p>
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <div class="card w-100 rounded-top">
                      <div class="card-body">
                        <h5 class="card-title fw-bold">Peran Ekologis atau Fakta Menarik</h5>
                        <p id="textPeranEkologisFaktaMenarik" class="card-text text-start text-capitalize mt-2"></p>
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <div class="card w-100 rounded-top">
                      <div class="card-body">
                        <h5 class="card-title fw-bold">Tindakan Positif / Cara Mendukung</h5>
                        <p id="textTindakanPositif" class="card-text text-start text-capitalize mt-2"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex flex-wrap justify-content-between mt-3 gap-md-2 gap-1">
                <button class="btn btn-light" type="button" data-bs-target="#carouselFunfact" data-bs-slide="prev">
                  <i class="bi bi-arrow-left"></i> Sebelumnya
                </button>
                <button class="btn btn-secondary text-light" type="button" data-bs-target="#carouselFunfact" data-bs-slide="next">
                  Selanjutnya <i class="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
          <div id="maskot-container">
            <img id="maskot-img-idle-1" class="h-100" src="/images/idle-maskot-1.svg" alt="Maskot Idle">
            <img id="maskot-img-idle-2" class="h-100 d-none" src="/images/idle-maskot-2.svg" alt="Maskot Idle">
          </div>
          <div id="dialog-container" class="bg-white rounded-4 text-dark py-2 px-3" style="width: 300px;">
            <p id="dialog-text" class="text-start mb-0">Halo!</p>
          </div>
        </div>
        <div class="card-footer text-body-secondary border-0 bg-transparent">
          <button id="btn-next" class="btn btn-lg btn-secondary rounded-pill border-4 fw-bold w-100 bg-secondary" style="border-color: #FEB273 !important;--bs-bg-opacity: .8;">Lanjutkan</button>
        </div>
      </div>
    `;
  }

  async afterRender() {
    const hewanId = parseActivePathname().id;

    this.#presenter = new DetailHewanPresenter(hewanId, {
      view: this,
      apiModel: HewanModel,
      hewanStatisModel: HewanStatisModel
    });

    this.#detailHewanLoadingContainer = document.getElementById('detail-hewan-loading');
    this.#resultBody = document.getElementById('result-body');

    await this.#presenter.showDetailHewan();

    document.querySelector("nav").classList.add("d-none");
    document.querySelector("footer").classList.add("d-none");

    setInterval(() => {
      document.getElementById('maskot-img-idle-1').classList.toggle('d-none');
      document.getElementById('maskot-img-idle-2').classList.toggle('d-none');
    }, 500);

    document.getElementById('back-button').addEventListener('click', (e) => {
      e.preventDefault();

      window.history.back();
    });
  }

  async getDetailHewanSuccess(data) {
    const textNamaHewanHeader = document.getElementById('textNamaHewanHeader');
    const textNamaHewan = document.getElementById('textNamaHewan');
    const textStatusKonservasi = document.getElementById('textStatusKonservasi');
    const textHabitatAsli = document.getElementById('textHabitatAsli');
    const textJumlahPopulasi = document.getElementById('textJumlahPopulasi');
    const textAncamanUtama = document.getElementById('textAncamanUtama');
    const textPeranEkologisFaktaMenarik = document.getElementById('textPeranEkologisFaktaMenarik');
    const textTindakanPositif = document.getElementById('textTindakanPositif');
    const resultDetail = document.getElementById('result-detail');

    document.getElementById('btn-next').addEventListener('click', (e) => {
      e.preventDefault();

      const dialogText = document.getElementById('dialog-text');

      if (dialogText && this.#dataDialog[this.#nowDialog]) dialogText.innerHTML = this.#dataDialog[this.#nowDialog].replace('$nama_hewan', `<b>${data.nama}</b>`);
      this.#nowDialog += 1;

      if (this.#nowDialog === (this.#dataDialog.length + 1)) {
        dialogText.parentElement.classList.add('d-none');
        resultDetail.classList.remove('d-none');

        e.target.classList.add('d-none');
      }
    });

    if (textNamaHewan) textNamaHewanHeader.innerHTML = `<b>${data.nama}</b> <br><i>${data.namaLatin}</i>`;
    if (textNamaHewan) textNamaHewan.innerHTML = `${data.nama} (<i>${data.namaLatin}</i>)`;
    if (textStatusKonservasi) textStatusKonservasi.innerText = data.endangeredStatus || '-';
    if (textHabitatAsli) textHabitatAsli.innerText = data.habitatDistribusi || '-';
    if (textJumlahPopulasi) textJumlahPopulasi.innerText = data.populasi || '-';
    if (textAncamanUtama) textAncamanUtama.innerText = data.ancamanUtama || '-';
    if (textPeranEkologisFaktaMenarik) textPeranEkologisFaktaMenarik.innerText = data.peranEkologis || '-';
    if (textTindakanPositif) textTindakanPositif.innerText = data.tindakanPositif || '-';

    this._setCarousel(data.imageHewan);
    // this._setHewanSerupa(data.hewanSerupa);
  }

  _setCarousel(images) {
    // const carouselIndicators = document.getElementById('img-detail-hewan-indicators');
    const carouselInner = document.getElementById('img-detail-hewan');

    if (carouselInner) {
      if (images.length > 0) {
        images.forEach((image, index) => {
          // carouselIndicators.innerHTML += `
          //   <button type="button" data-bs-target="#carouselDetailImg" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}" aria-label="Slide ${index + 1}"></button>
          // `;
          carouselInner.innerHTML += `
            <div class="carousel-item ${index === 0 ? 'active' : ''}" style="height: 50px; width: 50px;">
              <div class="d-flex align-items-center justify-content-center bg-light" style="height: 50px; width: 50px;">
                <img src="${image}" class="object-fit-cover d-block" style="filter: blur(15px);width: 100px;height: 100px;" alt="Gambar Hewan" onerror="this.onerror=null; this.src='https://placehold.co/700x500?text=Gambar%20Tidak%20Ditemukan';">
                <div class="card-img-overlay d-flex align-items-center justify-content-center p-1">
                  <img src="${image}" class="d-block mw-100 mh-100" style="width: 100px;" alt="Gambar Hewan" onerror="this.onerror=null; this.src='https://placehold.co/700x500?text=Gambar%20Tidak%20Ditemukan';">
                </div>
              </div>
            </div>
          `;
        });
      } else {
        // carouselIndicators.innerHTML = '<button type="button" data-bs-target="#carouselDetailImg" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>';
        carouselInner.innerHTML = `
          <div class="carousel-item active">
            <div id="not-found-img" class="d-flex align-items-center justify-content-center p-3 bg-light text-danger" style="height: 500px;">
              <i class="bi bi-exclamation-triangle-fill me-2 w-auto h-auto"></i>
              <span class="fw-bold">Gambar Hewan Tidak Ditemukan</span>
            </div>
          </div>
        `;
      }
    }
  }

  _setHewanSerupa(data) {
    const containerHewanSerupa = document.getElementById('containerHewanSerupa');
    const containerListHewanSerupa = document.getElementById('containerListHewanSerupa');

    if (containerHewanSerupa && containerListHewanSerupa) {
      if (data.length > 0) {
        data.forEach((hewan) => {
          containerListHewanSerupa.innerHTML += `
            <div class="card h-100" style="max-width: 16rem;">
              <img src="${hewan.image}" class="rounded object-fit-cover" alt="Gambar Hewan">
              <div class="card-img-overlay d-flex align-items-end">
                <h5 class="card-title bg-white w-100 text-center border border-dark text-capitalize">${hewan.name}</h5>
              </div>
            </div>
          `;
        })
      } else {
        containerHewanSerupa.classList.add('d-none');
      }
    }
  }

  getDetailHewanFailed(message) {
    console.error(message);
  }

  showDetailHewanLoading() {
    if (this.#detailHewanLoadingContainer) this.#detailHewanLoadingContainer.classList.remove('d-none');
    if (this.#resultBody) this.#resultBody.classList.add('d-none');
  }

  hideDetailHewanLoading() {
    if (this.#detailHewanLoadingContainer) this.#detailHewanLoadingContainer.classList.add('d-none');
    if (this.#resultBody) this.#resultBody.classList.remove('d-none');
  }
}
