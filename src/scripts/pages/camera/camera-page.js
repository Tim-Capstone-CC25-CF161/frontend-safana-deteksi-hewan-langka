import Camera from "../../utils/camera";

export default class CameraPage {
  #camera;
  #takenPhoto = null;

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
          <div class="card-footer text-center bg-transparent">
            <button id="kamera-take-button" class="btn btn-primary w-100 text-light fw-bolder" type="button">
              <i class="bi bi-camera me-2"></i> Ambil Gambar
            </button>
            <button id="btn-delete-taken-photo" type="button" class="btn-delete-photo" title="Klik untuk menghapus gambar">
            </button>
          </div>
        </article>
      </section>
    `;
  }

  async afterRender() {
    this.#takenPhoto = null;

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

      this.#camera.stop();
    });
  }

  async _addTakenPicture(image) {
    let blob = image;

    if (image instanceof String) {
      blob = await convertBase64ToBlob(image, 'image/png');
    }

    this.#takenPhoto = blob;
  }

  _prosesTakenPhoto() {
    if (this.#takenPhoto) {
      const imageUrl = URL.createObjectURL(this.#takenPhoto);
      document.getElementById('photo-taken-preview').innerHTML = `
        <img src="${imageUrl}" alt="Gambar story yang diambil">
      `;

      document.getElementById('new-form-photo-preview-title').innerHTML = 'Preview Foto/Gambar';
  
      document.getElementById('btn-delete-taken-photo').addEventListener('click', () => {
        this.#takenPhoto = null;

        document.getElementById('new-form-photo-preview-title').innerHTML = '';

        this._prosesTakenPhoto();
      });
    } else {
      document.getElementById('photo-taken-preview').innerHTML = '';
    }
  }
}
