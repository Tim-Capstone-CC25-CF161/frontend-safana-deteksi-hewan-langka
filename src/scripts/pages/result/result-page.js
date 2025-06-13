import ResultPresenter from './result-presenter';
import * as PrediksiConfig from '../../utils/prediction';
import CONFIG from '../../config';
import Swal from 'sweetalert2';

export default class ResultPage {
  #presenter = null;

  async render() {
    return `
      <section class="background-gradient d-flex justify-content-center min-vh-100 pt-5 pt-lg-4">
        <article class="mt-5 card bg-cream container-fluid m-3 m-md-5 shadow-lg p-2 p-lg-5">
          <div class="card-header bg-transparent border-0">
            <h1 class="fs-1 text-center">Hasil Deteksi</h1>
          </div>
          <div id="result-body" class="card-body">
            <div class="row justify-content-center align-items-center mt-4">
              <div id="canvas-container" class="col-12 col-md-6">
                <canvas id="canvas" class="w-100"></canvas>
              </div>

              <div class="col-12 col-md-6 text-center">
                <div id="result-detail">
                  <h2 id="result-detail-title">Berdasarkan hasil deteksi kami, kemungkinan hewan yang terdeteksi adalah:</h2>
                  <h2 id="result-detail-name" class="fs-1 my-5 text-capitalize">Anoa</h2>
                  <p id="result-detail-probability" class="fs-5 text-center">Dengan Probabilitas: 0%</p>
                </div>

                <div id="container-aksi" class="mt-5">
                  <a id="detail-info-button" class="btn btn-primary mx-2 my-1 text-light" href="#">
                    <i class="bi bi-info-circle me-2"></i> Lihat Detail Informasi Hewan
                  </a>
                  <button type="button" id="report-button" class="btn btn-warning mx-2 my-1" data-bs-toggle="modal" data-bs-target="#bksdaTerdekatModal">
                    <i class="bi bi-geo-alt me-2"></i> Lihat BKSDA Terdekat
                  </button>
                  <a id="home-button" class="btn btn-secondary mx-2 my-1" href="#/">
                    <i class="bi bi-house me-2"></i> Kembali ke Halaman Utama
                  </a>
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
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new ResultPresenter({
      view: this,
      prediksiConfig: PrediksiConfig,
    });

    await this.#presenter.getPrediksi();
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

    resultDetailName.textContent = namaHewan;
    resultDetailProbability.textContent = `Dengan Probabilitas: ${(
      probabilitas
    ).toFixed(1)}%`;

    detailInfoButton.href = `#/hewan/${response.hewan_id}`;

    const dataBksdaTerdekat = response.bksda_terdekat;
    titleBksdaTerdekat.textContent = dataBksdaTerdekat.nama;
    nomorBksdaTerdekat.textContent = dataBksdaTerdekat.nomor_wa;
    linkBksdaTerdekat.href = `tel:${dataBksdaTerdekat.nomor_wa}`;

    this._drawPrediksi(
      `${CONFIG.BASE_URL}${response.uploaded_image_url}`,
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
      const width = (x2 - x1) * (img.naturalWidth / 640);
      const height = (y2 - y1) * (img.naturalHeight / 640);

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
