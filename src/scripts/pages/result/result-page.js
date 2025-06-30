import ResultPresenter from './result-presenter';
import * as PrediksiConfig from '../../utils/prediction';
import CONFIG from '../../config';
import Swal from 'sweetalert2';

export default class ResultPage {
  #presenter = null;

  async render() {
    return `
      <div class="card text-center min-vh-100 bg-soft-orange text-white rounded-0">
        <div class="card-header bg-soft-orange border-0 position-sticky top-0">
          <div class="d-flex justify-content-between align-items-center">
            <h1 class="fs-3 mb-0">Jelajah Indonesia</h1>
            <a href="#/" class="btn btn-md btn-transparent text-white">
              <i class="bi bi-house-door-fill fs-3"></i>
            </a>
          </div>
          <div class="progress mx-1 rounded-0 mt-2" role="progressbar" aria-label="Animated striped example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            <div id="progress-bar" class="progress-bar bg-warning progress-bar-striped progress-bar-animated" style="width: 10%"></div>
          </div>
        </div>
        <div id="result-body" class="card-body d-flex flex-column justify-content-center align-items-center">
          <div id="canvas-container" class="flex justify-content-center align-items-center mt-4 px-3 pt-3 pb-2 rounded-5" style="background: #FEB273 !important;">
            <canvas id="canvas" class="w-100 h-100 rounded-5" style="max-height: 50vh;"></canvas>
          </div>
          <div id="result-detail" class="mt-5 pt-5 d-flex justify-content-center align-items-center d-none">
            <div>
              <img id="maskot-img-left" class="d-none h-100" src="/images/maskot.svg" alt="Maskot">
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

      <div class="modal fade" id="bksdaTerdekatModal" tabindex="-1" aria-labelledby="bksdaTerdekatModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="bksdaTerdekatModalLabel">BKSDA Terdekat</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <a id="link-bksda-terdekat" class="text-decoration-none" href="tel:">
                <div class="card shadow-sm">
                  <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title">BKSDA Provinsi <span id="title-bksda-terdekat"></span></h5>
                    <p class="card-text">
                      <i class="bi bi-telephone me-1"></i> 
                      <span id="nomor-bksda-terdekat"></span>
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Tutup</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    // return `
    //   <section class="background-gradient d-flex justify-content-center min-vh-100 pt-5 pt-lg-4">
    //     <article class="mt-5 card bg-cream container-fluid m-3 m-md-5 shadow-lg p-2 p-lg-5">
    //       <div class="card-header bg-transparent border-0">
    //         <h1 class="fs-1 text-center">Hasil Deteksi</h1>
    //       </div>
    //       <div id="result-body" class="card-body">
    //         <div class="row justify-content-center align-items-center mt-4">
    //           <div id="canvas-container" class="col-12 col-md-6">
    //             <canvas id="canvas" class="w-100"></canvas>
    //           </div>

    //           <div class="col-12 col-md-6 text-center">
    //             <div id="result-detail">
    //               <h2 id="result-detail-title">Berdasarkan hasil deteksi kami, kemungkinan hewan yang terdeteksi adalah:</h2>
    //               <h2 id="result-detail-name" class="fs-1 my-5 text-capitalize">Anoa</h2>
    //               <p id="result-detail-probability" class="fs-5 text-center">Dengan Probabilitas: 0%</p>
    //             </div>

    //             <div id="container-aksi" class="mt-5">
    //               <a id="detail-info-button" class="btn btn-primary mx-2 my-1 text-light" href="#">
    //                 <i class="bi bi-info-circle me-2"></i> Lihat Detail Informasi Hewan
    //               </a>
    //               <button type="button" id="report-button" class="btn btn-warning mx-2 my-1" data-bs-toggle="modal" data-bs-target="#bksdaTerdekatModal">
    //                 <i class="bi bi-geo-alt me-2"></i> Lihat BKSDA Terdekat
    //               </button>
    //               <a id="home-button" class="btn btn-secondary mx-2 my-1" href="#/">
    //                 <i class="bi bi-house me-2"></i> Kembali ke Halaman Utama
    //               </a>
    //             </div>
    //           </div>
    //         </div>
    //     </article>
    //   </section>
    // `;
  }

  async afterRender() {
    this.#presenter = new ResultPresenter({
      view: this,
      prediksiConfig: PrediksiConfig,
    });

    await this.#presenter.getPrediksi();
    document.querySelector("nav").classList.add("d-none");
    document.querySelector("footer").classList.add("d-none");

    document.getElementById('btn-mulai').addEventListener('click', () => {
      document.getElementById('result-detail').classList.remove('d-none');

      this._progressBar(40);
      setTimeout(() => {
        this._progressBar(80);
        document.getElementById('maskot-img-left').classList.remove('d-none');
        setTimeout(() => {
          this._progressBar(100);
          document.getElementById('result-card').classList.remove('d-none');
          document.getElementById('maskot-img-left').classList.add('rotate-45');
          setTimeout(() => {
            document.getElementById('progress-bar').parentElement.classList.add('d-none');
          }, 1000);
        }, 1000);
      }, 500);

      document.getElementById('container-aksi').classList.remove('d-none');
      document.getElementById('btn-mulai').classList.add('d-none');
    });
  }

  _progressBar(progress) {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${progress}%`;
    progressBar.ariaValueNow = `${progress}`;
  }

  getPrediksiSuccessfully(response) {
    const resultDetailTitle = document.getElementById('result-detail-title');
    const resultDetailName = document.getElementById('result-detail-name');
    const resultDetailProbability = document.getElementById('result-detail-probability');
    const linkBksdaTerdekat = document.getElementById('link-bksda-terdekat');
    const titleBksdaTerdekat = document.getElementById('title-bksda-terdekat');
    const canvasContainer = document.getElementById('canvas-container');
    const nomorBksdaTerdekat = document.getElementById('nomor-bksda-terdekat');
    const detailInfoButton = document.getElementById('detail-info-button');
    const reportButton = document.getElementById('report-button');

    let isNonDefined = false;
    let namaHewan = 'Tidak diketahui';
    let probabilitas = 0;

    if (response.data.length > 0) {
      if (response.data[0].animal_name) {
        namaHewan = response.data[0].animal_name.replaceAll('_', ' ');
        probabilitas = response.data[0].confidence * 100;
      }
    } else if (response.data.class) {
      namaHewan = response.data.class.replaceAll('_', ' ');
      probabilitas = response.data.score * 100;
    }

    if (namaHewan === 'Tidak diketahui') {
      isNonDefined = true;
    }

    if (isNonDefined) {
      resultDetailTitle.textContent = 'Berdasarkan hasil deteksi kami, kemungkinan hewan yang terdeteksi dalam gambar adalah: ';
      detailInfoButton.classList.add('d-none');
      reportButton.classList.add('d-none');
      canvasContainer.classList.add('d-none');
      resultDetailProbability.classList.add('d-none');
    }

    if (resultDetailName) resultDetailName.textContent = namaHewan;

    if (resultDetailProbability) {
      resultDetailProbability.textContent = `${(probabilitas).toFixed(1)}%`;
    }

    if (detailInfoButton) detailInfoButton.href = `#/hewan/${response.hewan_id}`;

    const dataBksdaTerdekat = response.bksda_terdekat;
    if (titleBksdaTerdekat) titleBksdaTerdekat.textContent = dataBksdaTerdekat.nama;
    if (nomorBksdaTerdekat) nomorBksdaTerdekat.textContent = dataBksdaTerdekat.nomor_wa;
    if (linkBksdaTerdekat) linkBksdaTerdekat.href = `tel:${dataBksdaTerdekat.nomor_wa}`;

    this._drawPrediksi(
      `${response.is_backup ? CONFIG.BASE_URL_BACKUP : CONFIG.BASE_URL}${response.uploaded_image_url}`,
      response.data.length > 0 ? response.data[0] : response.data
    );
  }

  _drawPrediksi(url, data) {
    const img = new Image();
    img.onload = async () => {
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');
      let color = 'red';

      if ((data.score || data.confidence) > 0.5) {
        color = 'green';
      } else {
        color = 'red';
        
      }

      canvas.width = img.width;
      canvas.height = img.height;

      context.drawImage(img, 0, 0);
      const [x1, y1, x2, y2] = data.bbox || data.bounding_box;
      const width = (x2 - x1) * (img.naturalWidth / 560);
      const height = (y2 - y1) * (img.naturalHeight / 560);

      context.strokeStyle = color;
      context.lineWidth = 5;
      context.strokeRect(x1, y1, width, height);

      context.fillStyle = color;
      context.font = '18px Arial';
      context.fillText(
        `${data.class ?? data.animal_name} (${((data.score || data.confidence) * 100).toFixed(1)}%)`,
        x1 + 5,
        y1 + 20
      );
    };

    img.src = url;
  }

  getPrediksiFailed(message) {
    Swal.fire({
      icon: 'error',
      title: 'Prediksi Gagal',
      text:
        message ||
        'Terjadi kesalahan saat memproses foto. Silakan coba lagi nanti.',
      confirmButtonText: 'Oke',
      confirmButtonColor: '#D9534F',
    });
  }

  showLoadingPrediksi() {
    Swal.fire({
      title: 'Menampilkan Hasil...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  hideLoadingPrediksi() {
    Swal.close();
  }
}
