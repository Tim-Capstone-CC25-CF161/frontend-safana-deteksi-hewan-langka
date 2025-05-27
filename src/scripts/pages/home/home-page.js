import Swal from "sweetalert2";
import * as HewanModel from "../../data/hewan-model";
import HomePresenter from "./home-presenter";

export default class HomePage {
  #presenter = null;

  async render() {
    return `
      <section class="min-vh-100 d-flex align-items-center justify-content-center background-img-head">
        <div class="d-flex align-items-center justify-content-center flex-column text-center container px-5 gap-3 text-light">
          <h1 class="fs-1 fw-bold">Kenali Satwa dari Fotomu!</h1>
          <p class="fs-4 text-center">Bisa jadi kamu baru saja melihat makhluk luar biasa! Unggah fotonya dan cari tahu apakah ia termasuk satwa yang sudah punah!</p>
          <button class="btn btn-primary rounded-pill text-light px-5 fs-4 py-3 fw-semibold" data-bs-toggle="modal" data-bs-target="#modalOpsiUpload">
            Unggah & Cari Tahu!
          </button>
        </div>
      </section>

      <div class="modal fade" id="modalOpsiUpload" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalOpsiUploadLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="modalOpsiUploadLabel">Pilih Sumber Foto</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div id="container-opsi-upload" class="d-flex flex-column gap-3">
                <button class="btn btn-outline-primary fs-5 fw-semibold" id="camera-button">
                  <i class="bi bi-camera"></i> Gunakan Kamera
                </button>
                <button class="btn btn-outline-primary fs-5 fw-semibold" id="gallery-button">
                  <i class="bi bi-images"></i> Pilih dari Galeri
                </button>
              </div>

              <img id="preview-image" class="img-fluid d-none w-100" alt="Preview Foto">

              <form id="upload-form" class="d-none">
                <input type="file" id="file-input" accept="image/*" class="form-control mt-3">
                <button type="submit" class="btn btn-primary mt-3 w-100" id="form-upload-button">Unggah Foto</button>
              </form>
            </div>
            <div class="modal-footer">
              <button id="cancel-button" type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Batal</button>
              <button type="button" class="btn btn-primary text-light d-none" id="upload-button">Proses Foto</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      view: this,
      model: HewanModel,
    });

    this._setupForm();
  }

  _setupForm() {
    document.getElementById('camera-button').addEventListener('click', () => {
      document.getElementById('cancel-button').click();

      location.hash = '/camera';
    });

    document.getElementById('gallery-button').addEventListener('click', () => {
      document.getElementById('file-input').click();
    });

    const fileInput = document.getElementById('file-input');
    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];

      if (file) {
        this._setPreviewImage(file);
        document.getElementById('upload-button').classList.remove('d-none');
        document.getElementById('container-opsi-upload').classList.add('d-none');
        document.getElementById('modalOpsiUploadLabel').textContent = 'Pratinjau Foto';
      } else {
        document.getElementById('preview-image').classList.add('d-none');
        document.getElementById('upload-button').classList.add('d-none');
        document.getElementById('container-opsi-upload').classList.remove('d-none');
        document.getElementById('modalOpsiUploadLabel').textContent = 'Pilih Sumber Foto';
      }
    });

    document.querySelector('.modal').addEventListener('hidden.bs.modal', () => {
      document.getElementById('preview-image')?.classList.add('d-none');
      document.getElementById('upload-button')?.classList.add('d-none');
      document.getElementById('container-opsi-upload')?.classList.remove('d-none');
      if (document.getElementById('modalOpsiUploadLabel')) {
        document.getElementById('modalOpsiUploadLabel').textContent = 'Pilih Sumber Foto';
      }
      fileInput.value = '';
    });

    document.getElementById('upload-form').addEventListener('submit', async (event) => {
      event.preventDefault();

      document.getElementById('cancel-button').click();

      const file = fileInput.files[0];
      await this.#presenter.getPrediksi({ file });
    });

    document.getElementById('upload-button').addEventListener('click', () => {
      document.getElementById('form-upload-button').click();
    });
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

  _setPreviewImage(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const previewImage = document.getElementById('preview-image');
      previewImage.src = e.target.result;
      previewImage.classList.remove('d-none');
    };
    reader.readAsDataURL(file);
  }
}
