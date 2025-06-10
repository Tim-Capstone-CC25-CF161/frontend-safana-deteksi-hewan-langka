import CameraPresenter from "./camera-presenter";
import * as HewanModel from "../../data/hewan-model";
import * as PrediksiConfig from '../../utils/prediction';
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
      <section class="background-gradient d-flex justify-content-center min-vh-100">
        <div class="d-none">
          <label for="kamera-select" class="form-label">Pilih Kamera</label>
          <select id="kamera-select" class="form-select" readonly></select>
        </div>

        <article class="card bg-cream container-fluid m-3 m-md-5 shadow-lg p-2 p-lg-5">
          <div id="result-body" class="card-body">
            <video id="kamera-video" class="new-form-kamera-video w-100 h-100">
              Video stream not available.
            </video>

            <canvas id="kamera-canvas" class="new-form-kamera-canvas d-none"></canvas>

            <p id="new-form-photo-preview-title" class="d-none"></p>
            <div id="photo-taken-preview" class="new-form-photo-outputs d-none"></div>
          </div>
          <div class="card-footer text-center bg-transparent gap-2 d-flex ">
            <a id="back-button" class="btn btn-icon btn-light w-100 fw-bolder" href="#/">
              <i class="bi bi-arrow-left"></i>
            </a>
            <button id="kamera-take-button" class="btn btn-icon btn-primary w-100 text-light fw-bolder" type="button">
              <i class="bi bi-camera"></i>
            </button>
            <button id="submit-button" class="btn btn-icon btn-success w-100 fw-bolder d-none" type="button" disabled>
              <i class="bi bi-check-circle"></i>
            </button>
            <button id="change-camera" class="btn btn-icon btn-secondary w-100 fw-bolder" type="button">
              <i class="bi bi-arrow-repeat"></i>
            </button>
            <button id="take-again-photo-button" class="btn btn-icon btn-danger w-100 fw-bolder d-none" type="button" disabled>
              <i class="bi bi-arrow-counterclockwise"></i>
            </button>
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
