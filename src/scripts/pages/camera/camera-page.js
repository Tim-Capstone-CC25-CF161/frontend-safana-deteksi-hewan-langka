import CameraPresenter from "./camera-presenter";
import * as HewanModel from "../../data/hewan-model";
import * as PrediksiConfig from '../../utils/prediction';
import { Tooltip } from "bootstrap";
import Camera from "../../utils/camera";
import Map from "../../utils/maps";
import Swal from "sweetalert2";

export default class CameraPage {
  #camera;
  #presenter = null;
  #latitude = null;
  #longitude = null;
  #takenPhoto = null;
  #kameraVideoElement = null;
  #previewPhotoElement = null;
  #buttonKameraTake = null;
  #buttonSubmit = null;
  #buttonChangeCamera = null;
  #buttonTakeAgainPhoto = null;

  async render() {
    return `
      <section class="background-gradient d-flex justify-content-center align-items-center min-vh-100">
        <div class="d-none">
          <label for="kamera-select" class="form-label">Pilih Kamera</label>
          <select id="kamera-select" class="form-select" readonly></select>
        </div>

        <article id="container-camera" class="bg-cream container-fluid m-3 m-md-5 shadow-lg p-2 p-lg-5 row">
          <div id="result-body" class="p-1 col-12 col-md-10">
            <video id="kamera-video" class="new-form-kamera-video h-100 w-100">
              Video stream not available.
            </video>

            <canvas id="kamera-canvas" class="new-form-kamera-canvas d-none"></canvas>

            <p id="new-form-photo-preview-title" class="d-none"></p>
            <div id="photo-taken-preview" class="new-form-photo-outputs d-none"></div>
          </div>

          <div class="col-12 col-md-2 d-flex d-md-block m-0 m-md-auto flex-column-reverse">
              <div class="text-center bg-transparent gap-3 row ms-md-1">
                <a id="back-button" class="btn btn-icon btn-light fw-bolder col col-md-12 py-md-5" href="#/" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Batal dan Kembali">
                  <i class="bi bi-arrow-left fs-2"></i>
                </a>
                <button id="kamera-take-button" class="btn btn-icon btn-primary text-light fw-bolder col col-md-12 py-md-5" type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Ambil Foto">
                  <i class="bi bi-camera fs-2"></i>
                </button>
                <button id="submit-button" class="btn btn-icon btn-success fw-bolder col col-md-12 py-md-5 d-none" type="button" disabled data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Unggah dan Proses Foto">
                  <i class="bi bi-check-circle fs-2"></i>
                </button>
                <button id="change-camera" class="btn btn-icon btn-secondary fw-bolder col col-md-12 py-md-5" type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Ganti Kamera">
                  <i class="bi bi-arrow-repeat fs-2"></i>
                </button>
                <button id="take-again-photo-button" class="btn btn-icon btn-danger fw-bolder col col-md-12 py-md-5 d-none" type="button" disabled data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Ulangi Foto">
                  <i class="bi bi-arrow-counterclockwise fs-2"></i>
                </button>
              </div>
              <hr class="d-block d-md-none">
            </div>
          </div>
        </article>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new CameraPresenter({
      view: this,
      model: HewanModel,
      prediksiConfig: PrediksiConfig
    });

    this.#takenPhoto = null;
    this.#kameraVideoElement = document.getElementById('kamera-video');
    this.#previewPhotoElement = document.getElementById('photo-taken-preview');
    this.#buttonKameraTake = document.getElementById('kamera-take-button');
    this.#buttonSubmit = document.getElementById('submit-button');
    this.#buttonChangeCamera = document.getElementById('change-camera');
    this.#buttonTakeAgainPhoto = document.getElementById('take-again-photo-button');

    try {
      Swal.fire({
        title: 'Memuat Lokasi...',
        text: 'Mohon aktifkan lokasi Anda untuk melanjutkan.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const position = await Map.getCurrentPosition();

      if (position) {
        Swal.close();
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.#latitude = latitude;
        this.#longitude = longitude;
      }
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Gagal Memuat Lokasi',
        text: 'Pastikan lokasi Anda diaktifkan untuk menjalankan fitur ini.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Kembali',
        confirmButtonColor: '#8EC3B0',
      }).then(() => {
        location.hash = '#/';
      });

      return;
    }

    this._setupCamera();
    await this.#camera.launch();

    this.#buttonChangeCamera.onclick = async () => {
      const selectCameraElement = document.getElementById('kamera-select');
      const selectedIndex = selectCameraElement.selectedIndex;
      const nextIndex = (selectedIndex + 1) % selectCameraElement.options.length;
      selectCameraElement.selectedIndex = nextIndex;

      await this.#camera.stop();
      await this.#camera.launch();
    };

    document.querySelector("nav").classList.add("d-none");

    this.#buttonSubmit.onclick = async (e) => {
      e.preventDefault();
      console.log(this.#latitude, this.#longitude);
      
      const file = this.#takenPhoto;
      const latitude = this.#latitude;
      const longitude = this.#longitude;

      await this.#presenter.getPrediksi({ file, latitude, longitude });
    };

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));
  }

  _setupCamera() {
    if (!this.#camera) {
      this.#camera = new Camera({
        video: document.getElementById('kamera-video'),
        cameraSelect: document.getElementById('kamera-select'),
        canvas: document.getElementById('kamera-canvas'),
      });
    }

    this.#camera.addCheeseButtonListener('#kamera-take-button', async () => {
      const image = await this.#camera.takePicture();
      await this._addTakenPicture(image);
      this._prosesTakenPhoto();

      await this.#camera.stop();
    });
  }

  async _addTakenPicture(image) {
    let blob = image;

    if (image instanceof String) {
      blob = await convertBase64ToBlob(image, 'image/png');
    }

    this.#takenPhoto = blob;
  }

  async _takenAgainPhoto() {
    this.#takenPhoto = null;

    this.#kameraVideoElement.classList.remove('d-none');
    this.#previewPhotoElement.classList.add('d-none');

    document.getElementById('new-form-photo-preview-title').innerHTML = '';

    this.#buttonKameraTake.classList.remove('d-none');
    this.#buttonSubmit.classList.add('d-none');
    this.#buttonSubmit.disabled = true;

    this.#buttonChangeCamera.classList.remove('d-none');
    this.#buttonTakeAgainPhoto.classList.add('d-none');
    this.#buttonTakeAgainPhoto.disabled = true;

    await this.#camera.launch();
  }

  _prosesTakenPhoto() {
    if (this.#takenPhoto) {
      const imageUrl = URL.createObjectURL(this.#takenPhoto);

      this.#kameraVideoElement.classList.add('d-none');
      this.#previewPhotoElement.classList.remove('d-none');

      this.#previewPhotoElement.innerHTML = `
        <img src="${imageUrl}" class="w-100 h-100" alt="Gambar story yang diambil">
      `;

      document.getElementById('new-form-photo-preview-title').innerHTML = 'Preview Foto/Gambar';

      this.#buttonKameraTake.classList.add('d-none');
      this.#buttonSubmit.classList.remove('d-none');
      this.#buttonSubmit.disabled = false;

      this.#buttonChangeCamera.classList.add('d-none');
      this.#buttonTakeAgainPhoto.classList.remove('d-none');
      this.#buttonTakeAgainPhoto.disabled = false;
  
      this.#buttonTakeAgainPhoto.addEventListener('click', async () => {
        this.#takenPhoto = null;

        document.getElementById('new-form-photo-preview-title').innerHTML = '';

        await this._takenAgainPhoto();
        this.#buttonTakeAgainPhoto.removeEventListener('click', await this._takenAgainPhoto.bind(this));
      });
    } else {
      this.#previewPhotoElement.innerHTML = '';
    }
  }
  
  prediksiSuccessfully() {
    Swal.fire({
      icon: 'success',
      title: 'Prediksi Berhasil',
      text: 'Foto berhasil diproses. Silakan lihat hasilnya.',
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Lihat Hasil',
      confirmButtonColor: '#8EC3B0',
    }).then(() => {
      this.hideLoadingPrediksi();

      location.hash = '/result';
    });
  }

  prediksiFailed(message) {
    Swal.fire({
      icon: 'error',
      title: 'Prediksi Gagal',
      text: message || 'Terjadi kesalahan saat memproses foto. Silakan coba lagi nanti.',
      confirmButtonText: 'Oke',
      confirmButtonColor: '#D9534F',
    });
  }

  showLoadingPrediksi() {
    Swal.fire({
      title: 'Memproses Foto...',
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
