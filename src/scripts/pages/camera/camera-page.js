import Camera from "../../utils/camera";

export default class CameraPage {
  #camera;
  #takenPhoto = null;
  #kameraVideoElement = null;
  #previewPhotoElement = null;
  #buttonKameraTake = null;
  #buttonTakeAgainPhoto = null;

  async render() {
    return `
      <section class="background-gradient d-flex justify-content-center min-vh-100 pt-5 pt-lg-4">
        <article class="mt-5 card bg-cream container-fluid m-3 m-md-5 shadow-lg p-2 p-lg-5">
          <div class="card-header">
            <div>
              <label for="kamera-select" class="form-label">Pilih Kamera</label>
              <select id="kamera-select" class="form-select"></select>
            </div>
          </div>
          <div id="result-body" class="card-body">
            <video id="kamera-video" class="new-form-kamera-video w-100 h-100">
              Video stream not available.
            </video>

            <canvas id="kamera-canvas" class="new-form-kamera-canvas d-none"></canvas>
            
            <p id="new-form-photo-preview-title" class="d-none"></p>
            <div id="photo-taken-preview" class="new-form-photo-outputs d-none"></div>
          </div>
          <div class="card-footer text-center bg-transparent gap-2">
            <button id="kamera-take-button" class="btn btn-primary w-100 text-light fw-bolder" type="button">
              <i class="bi bi-camera me-2"></i> Ambil Gambar
            </button>
            <button id="take-again-photo-button" type="button" class="btn btn-danger w-100 fw-bolder mt-2 d-none" disabled>
              <i class="bi bi-arrow-clockwise me-2"></i> Ulangi Ambil Gambar
            </button>
          </div>
        </article>
      </section>
    `;
  }

  async afterRender() {
    this.#takenPhoto = null;
    this.#kameraVideoElement = document.getElementById('kamera-video');
    this.#previewPhotoElement = document.getElementById('photo-taken-preview');
    this.#buttonKameraTake = document.getElementById('kamera-take-button');
    this.#buttonTakeAgainPhoto = document.getElementById('take-again-photo-button');

    this._setupCamera();
    await this.#camera.launch();
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
}
