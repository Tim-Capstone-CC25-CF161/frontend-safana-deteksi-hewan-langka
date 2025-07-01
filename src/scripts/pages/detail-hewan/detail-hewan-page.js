import DetailHewanPresenter from "./detail-hewan-presenter";
import { parseActivePathname } from "../../routes/url-parser";
import * as HewanModel from '../../data/hewan-model';

export default class DetailHewanPage {
  #detailHewanLoadingContainer = null;
  #resultBody = null;
  #presenter = null;

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
              <p id="textNamaHewan" class="text-capitalize text-start text-light mb-0 ms-2">-</p>
            </div>
            <div class="d-flex align-items-center justify-content-center rounded-circle bg-white" style="height: 50px; width: 50px;">
              <i class="bi bi-question-lg fs-3 text-dark"></i>
            </div>
          </div>
        </div>
        <div id="result-body" class="card-body d-flex flex-column justify-content-center align-items-center">
          <div id="canvas-container" class="flex justify-content-center align-items-center mt-4 px-3 pt-3 pb-2 rounded-5" style="background: #FEB273 !important;">
            <canvas id="canvas" class="w-100 h-100 rounded-5" style="max-height: 50vh;"></canvas>
          </div>
          <div id="result-detail" class="mt-5 pt-5 d-flex justify-content-center align-items-center">
            <div>
              <img id="maskot-img-idle-1" class="h-100" src="/images/idle-maskot-1.svg" alt="Maskot Idle">
              <img id="maskot-img-idle-2" class="h-100 d-none" src="/images/idle-maskot-2.svg" alt="Maskot Idle">
            </div>
            <div id="result-card" class="d-none card bg-transparent border-0 h-100 w-100">
              <img id="img-bubblechat" style="max-height: 100%;" src="/images/bubblechat.svg" alt="Bubble Chat">

              <div id="result-text-container" class="text-dark card-img-overlay p-2 m-0 text-start ms-3 fs-6 overflow-auto">
                <p id="result-text" class="m-0">
                  Selamat kamu telah menemukan <b id="result-detail-name" class="text-capitalize"></b>.
                </p> <br> <br>
                <p id="result-probability" class="m-0">
                  Dengan probabilitas prediksi <b id="result-detail-probability" class="text-capitalize"></b>.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer text-body-secondary border-0 bg-transparent">
          <button id="btn-mulai" class="btn btn-lg btn-secondary rounded-pill border-4 fw-bold w-100 bg-secondary" style="border-color: #FEB273 !important;--bs-bg-opacity: .8;">Mulai</button>

          <div id="container-aksi" class="mt-5 d-none">
            <a id="detail-info-button" class="btn btn-lg btn-secondary rounded-pill border-4 fw-bold w-100 bg-secondary" style="border-color: #FEB273 !important;--bs-bg-opacity: .8;" href="#">
              <i class="bi bi-info-circle me-2"></i> Lihat Detail Hewan
            </a>
            <button type="button" id="report-button" class="mt-2 btn btn-lg btn-warning rounded-pill border-4 fw-bold w-100 border-white border-opacity-50" data-bs-toggle="modal" data-bs-target="#bksdaTerdekatModal">
              <i class="bi bi-geo-alt me-2"></i> Lihat BKSDA Terdekat
            </button>
          </div>
        </div>
      </div>
    `;

    // return `
    //   <section class="background-gradient d-flex justify-content-center min-vh-100 pt-5 pt-lg-4">
    //     <article class="mt-5 card bg-cream container-fluid m-3 m-md-5 shadow-lg p-2 p-lg-5">
    //       <div class="card-header bg-transparent border-0">
    //         <h1 class="fs-1 text-center">Detail Hewan</h1>
    //       </div>
    //       <div id="detail-hewan-loading" class="d-flex align-items-center justify-content-center h-100">
    //         <p class="loading-text fs-1 p-1 d-flex align-items-center flex-wrap">
    //           <i class="bi bi-gear loader-icon me-2 w-auto h-auto"></i>
    //           <span class="text-center">Memuat Data Detail Hewan...</span>
    //         </p>
    //       </div>
    //       <div id="result-body" class="card-body">
    //         <div id="detail-hewan-body" class="row justify-content-center align-items-center mt-4">
    //           <div class="col-12 col-md-6 p-3">
    //             <div id="carouselDetailImg" class="carousel slide carousel-fade" data-bs-ride="carousel">
    //               <div id="img-detail-hewan-indicators" class="carousel-indicators"></div>
    //               <div id="img-detail-hewan" class="carousel-inner"></div>
    //               <button class="carousel-control-prev" type="button" data-bs-target="#carouselDetailImg" data-bs-slide="prev">
    //                 <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    //                 <span class="visually-hidden">Previous</span>
    //               </button>
    //               <button class="carousel-control-next" type="button" data-bs-target="#carouselDetailImg" data-bs-slide="next">
    //                 <span class="carousel-control-next-icon" aria-hidden="true"></span>
    //                 <span class="visually-hidden">Next</span>
    //               </button>
    //             </div>
    //           </div>

    //           <div class="col-12 col-md-6 p-3">
    //             <div id="container-isi-detail" class="row">
    //               <div class="col-12 col-md-6">
    //                 <label class="fw-bold" for="textNamaHewan">Nama Spesies (lokal & ilmiah):</label>
    //                  
    //               </div>
    //               <div class="col-12 col-md-6">
    //                 <label class="fw-bold" for="textStatusKonservasi">Status Konservasi:</label>
    //                 <p id="textStatusKonservasi" class="text-muted text-capitalize">-</p>
    //               </div>
    //               <div class="col-12">
    //                 <label class="fw-bold" for="textHabitatAsli">Habitat & Distribusi Asli:</label>
    //                 <p id="textHabitatAsli" class="text-muted text-capitalize">-</p>
    //               </div>
    //               <div class="col-12">
    //                 <label class="fw-bold" for="textJumlahPopulasi">Jumlah Populasi & Tren:</label>
    //                 <p id="textJumlahPopulasi" class="text-muted text-capitalize">-</p>
    //               </div>
    //               <div class="col-12">
    //                 <label class="fw-bold" for="textAncamanUtama">Ancaman Utama:</label>
    //                 <p id="textAncamanUtama" class="text-muted text-capitalize">-</p>
    //               </div>
    //               <div class="col-12">
    //                 <label class="fw-bold" for="textPeranEkologisFaktaMenarik">Peran Ekologis atau Fakta Menarik:</label>
    //                 <p id="textPeranEkologisFaktaMenarik" class="text-muted text-capitalize">-</p>
    //               </div>
    //               <div class="col-12">
    //                 <label class="fw-bold" for="textTindakanPositif">Tindakan Positif / Cara Mendukung:</label>
    //                 <p id="textTindakanPositif" class="text-muted text-capitalize">-</p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         <div id="containerHewanSerupa" class="mt-5">
    //           <h2 class="fw-bold text-center fs-4">Hewan Serupa</h2>

    //           <div id="containerListHewanSerupa" class="d-flex justify-content-center align-items-center flex-wrap gap-3"></div>
    //         </div>
    //       </div>

    //       <div id="detail-hewan-footer" class="card-footer bg-transparent border-0">
    //         <div id="container-aksi" class="mt-5 d-flex justify-content-center">
    //           <a id="back-button" class="btn btn-secondary mx-2 my-1" href="#/">
    //             <i class="bi bi-arrow-left me-2"></i> Kembali
    //           </a>
    //         </div>
    //       </div>
    //     </article>
    //   </section>
    // `;
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
    const textNamaHewan = document.getElementById('textNamaHewan');
    const textStatusKonservasi = document.getElementById('textStatusKonservasi');
    const textHabitatAsli = document.getElementById('textHabitatAsli');
    const textJumlahPopulasi = document.getElementById('textJumlahPopulasi');
    const textAncamanUtama = document.getElementById('textAncamanUtama');
    const textPeranEkologisFaktaMenarik = document.getElementById('textPeranEkologisFaktaMenarik');
    const textTindakanPositif = document.getElementById('textTindakanPositif');

    if (textNamaHewan) textNamaHewan.innerHTML = `<b>${data.nama}</b> <br><i>${data.namaLatin}</i>`;
    if (textStatusKonservasi) textStatusKonservasi.innerText = data.endangeredStatus || '-';
    if (textHabitatAsli) textHabitatAsli.innerText = data.habitatDistribusi || '-';
    if (textJumlahPopulasi) textJumlahPopulasi.innerText = data.populasi || '-';
    if (textAncamanUtama) textAncamanUtama.innerText = data.ancamanUtama || '-';
    if (textPeranEkologisFaktaMenarik) textPeranEkologisFaktaMenarik.innerText = data.peranEkologis || '-';
    if (textTindakanPositif) textTindakanPositif.innerText = data.tindakanPositif || '-';

    this._setCarousel(data.imageHewan);
    this._setHewanSerupa(data.hewanSerupa);
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
