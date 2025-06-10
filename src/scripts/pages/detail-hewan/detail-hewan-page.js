import DetailHewanPresenter from "./detail-hewan-presenter";
import { parseActivePathname } from "../../routes/url-parser";
import * as HewanModel from '../../data/hewan-model';

export default class DetailHewanPage {
  #detailHewanLoadingContainer = null;
  #resultBody = null;
  #presenter = null;

  async render() {
    return `
      <section class="background-gradient d-flex justify-content-center min-vh-100 pt-5 pt-lg-4">
        <article class="mt-5 card bg-cream container-fluid m-3 m-md-5 shadow-lg p-2 p-lg-5">
          <div class="card-header bg-transparent border-0">
            <h1 class="fs-1 text-center">Detail Hewan</h1>
          </div>
          <div id="detail-hewan-loading" class="d-flex align-items-center justify-content-center h-100">
            <p class="loading-text fs-1">
              <i class="bi bi-gear loader-icon me-2 w-auto h-auto"></i>
              <span>Memuat Data Detail Hewan...</span>
            </p>
          </div>
          <div id="result-body" class="card-body">
            <div id="detail-hewan-body" class="row justify-content-center align-items-center mt-4">
              <div class="col-12 col-md-6 p-3">
                <div id="carouselDetailImg" class="carousel slide carousel-fade" data-bs-ride="carousel">
                  <div id="img-detail-hewan-indicators" class="carousel-indicators"></div>
                  <div id="img-detail-hewan" class="carousel-inner"></div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselDetailImg" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselDetailImg" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>

              <div class="col-12 col-md-6 p-3">
                <div id="container-isi-detail" class="row">
                  <div class="col-12 col-md-6">
                    <label class="fw-bold" for="textNamaHewan">Nama Spesies (lokal & ilmiah):</label>
                    <p id="textNamaHewan" class="text-muted text-capitalize">-</p>
                  </div>
                  <div class="col-12 col-md-6">
                    <label class="fw-bold" for="textStatusKonservasi">Status Konservasi:</label>
                    <p id="textStatusKonservasi" class="text-muted text-capitalize">-</p>
                  </div>
                  <div class="col-12">
                    <label class="fw-bold" for="textHabitatAsli">Habitat & Distribusi Asli:</label>
                    <p id="textHabitatAsli" class="text-muted text-capitalize">-</p>
                  </div>
                  <div class="col-12">
                    <label class="fw-bold" for="textJumlahPopulasi">Jumlah Populasi & Tren:</label>
                    <p id="textJumlahPopulasi" class="text-muted text-capitalize">-</p>
                  </div>
                  <div class="col-12">
                    <label class="fw-bold" for="textAncamanUtama">Ancaman Utama:</label>
                    <p id="textAncamanUtama" class="text-muted text-capitalize">-</p>
                  </div>
                  <div class="col-12">
                    <label class="fw-bold" for="textPeranEkologisFaktaMenarik">Peran Ekologis atau Fakta Menarik:</label>
                    <p id="textPeranEkologisFaktaMenarik" class="text-muted text-capitalize">-</p>
                  </div>
                  <div class="col-12">
                    <label class="fw-bold" for="textTindakanPositif">Tindakan Positif / Cara Mendukung:</label>
                    <p id="textTindakanPositif" class="text-muted text-capitalize">-</p>
                  </div>
                </div>
              </div>
            </div>

            <div id="containerHewanSerupa" class="mt-5">
              <h2 class="fw-bold text-center fs-4">Hewan Serupa</h2>

              <div id="containerListHewanSerupa" class="d-flex justify-content-center align-items-center flex-wrap gap-3"></div>
            </div>
          </div>

          <div id="detail-hewan-footer" class="card-footer bg-transparent border-0">
            <div id="container-aksi" class="mt-5 d-flex justify-content-center">
              <a id="home-button" class="btn btn-secondary mx-2 my-1" href="#/">
                <i class="bi bi-house me-2"></i> Kembali ke Halaman Utama
              </a>
            </div>
          </div>
        </article>
      </section>
    `;
  }

  async afterRender() {
    const hewanId = parseActivePathname().id;

    this.#presenter = new DetailHewanPresenter(hewanId, {
      view: this,
      apiModel: HewanModel,
    });

    this.#detailHewanLoadingContainer = document.getElementById('detail-hewan-loading');
    this.#resultBody = document.getElementById('result-body');

    await this.#presenter.showDetailHewan();
  }

  async getDetailHewanSuccess(data) {
    console.log('data:', data);
    
    const textNamaHewan = document.getElementById('textNamaHewan');
    const textStatusKonservasi = document.getElementById('textStatusKonservasi');
    const textHabitatAsli = document.getElementById('textHabitatAsli');
    const textJumlahPopulasi = document.getElementById('textJumlahPopulasi');
    const textAncamanUtama = document.getElementById('textAncamanUtama');
    const textPeranEkologisFaktaMenarik = document.getElementById('textPeranEkologisFaktaMenarik');
    const textTindakanPositif = document.getElementById('textTindakanPositif');

    textNamaHewan.innerText = `${data.nama} (lokal) / ${data.namaLatin} (ilmiah)`;
    textStatusKonservasi.innerText = data.endangeredStatus || '-';
    textHabitatAsli.innerText = data.habitatDistribusi || '-';
    textJumlahPopulasi.innerText = data.populasi || '-';
    textAncamanUtama.innerText = data.ancamanUtama || '-';
    textPeranEkologisFaktaMenarik.innerText = data.peranEkologis || '-';
    textTindakanPositif.innerText = data.tindakanPositif || '-';

    this._setCarousel(data.imageHewan);
    this._setHewanSerupa(data.hewanSerupa);
  }

  _setCarousel(images) {
    const carouselIndicators = document.getElementById('img-detail-hewan-indicators');
    const carouselInner = document.getElementById('img-detail-hewan');

    if (images.length > 0) {
      images.forEach((image, index) => {
        carouselIndicators.innerHTML += `
          <button type="button" data-bs-target="#carouselDetailImg" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}" aria-label="Slide ${index + 1}"></button>
        `;
        carouselInner.innerHTML += `
          <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <div class="d-flex align-items-center justify-content-center bg-light" style="height: 500px;">
              <img src="${image}" class="object-fit-cover d-block w-100 h-100" style="filter: blur(10px);" alt="Gambar Hewan" onerror="this.onerror=null; this.src='https://placehold.co/700x500?text=Gambar%20Tidak%20Ditemukan';">
              <div class="card-img-overlay d-flex align-items-center justify-content-center">
                <img src="${image}" class="d-block mw-100 mh-100" alt="Gambar Hewan" onerror="this.onerror=null; this.src='https://placehold.co/700x500?text=Gambar%20Tidak%20Ditemukan';">
              </div>
            </div>
          </div>
        `;
      });
    } else {
      carouselIndicators.innerHTML = '<button type="button" data-bs-target="#carouselDetailImg" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>';
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

  _setHewanSerupa(data) {
    const containerHewanSerupa = document.getElementById('containerHewanSerupa');
    const containerListHewanSerupa = document.getElementById('containerListHewanSerupa');

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

  getDetailHewanFailed(message) {
    console.error(message);
  }

  showDetailHewanLoading() {
    this.#detailHewanLoadingContainer.classList.remove('d-none');
    this.#resultBody.classList.add('d-none');
  }

  hideDetailHewanLoading() {
    this.#detailHewanLoadingContainer.classList.add('d-none');
    this.#resultBody.classList.remove('d-none');
  }
}
