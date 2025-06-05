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
              <div class="col-12 col-md-6">
                <canvas id="canvas" class="w-100"></canvas>
              </div>

              <div class="col-12 col-md-6 text-center">
                <div id="result-detail">
                  <h2>Berdasarkan hasil deteksi kami, kemungkinan hewan yang terdeteksi adalah:</h2>
                  <h2 id="result-detail-name" class="fs-1 my-5 text-capitalize">Anoa</h2>
                  <p id="result-detail-probability" class="fs-5 text-center">Dengan Probabilitas: 0%</p>
                </div>

                <div id="container-aksi" class="mt-5">
                  <button id="detail-info-button" class="btn btn-info mx-2 my-1">
                    Lihat Detail Informasi Hewan
                  </button>
                  <button id="report-button" class="btn btn-warning mx-2 my-1">
                    Laporkan
                  </button>
                  <button id="home-button" class="btn btn-secondary mx-2 my-1">
                    Kembali ke Menu Home
                  </button>
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
    const resultDetailName = document.getElementById('result-detail-name');
    const resultDetailProbability = document.getElementById(
      'result-detail-probability'
    );

    resultDetailName.textContent = response.data.class.replaceAll('_', ' ');
    resultDetailProbability.textContent = `Dengan Probabilitas: ${(
      response.data.score * 100
    ).toFixed(1)}%`;

    this._drawPrediksi(
      `${CONFIG.BASE_URL}${response.uploaded_image_url}`,
      response.data
    );
  }

  _drawPrediksi(url, data) {
    const img = new Image();
    img.onload = async () => {
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;

      context.drawImage(img, 0, 0);

      const [x1, y1, x2, y2] = data.bbox;
      const width = x2 - x1;
      const height = y2 - y1;

      context.strokeStyle = 'red';
      context.lineWidth = 5;
      context.strokeRect(x1, y1, width, height);

      context.fillStyle = 'red';
      context.font = '18px Arial';
      context.fillText(
        `${data.class} (${(data.score * 100).toFixed(1)}%)`,
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
