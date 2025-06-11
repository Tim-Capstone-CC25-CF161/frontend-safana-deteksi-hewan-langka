import Swal from "sweetalert2";
import * as HewanModel from "../../data/hewan-model";
import * as PrediksiConfig from '../../utils/prediction';
import HomePresenter from "./home-presenter";
import Map from "../../utils/maps";
import { Modal } from "bootstrap";

export default class HomePage {
  #presenter = null;

  async render() {
    return `
      <section class="min-vh-100 d-flex align-items-center justify-content-center background-img-head">
        <div class="d-flex align-items-center justify-content-center flex-column text-center container px-5 gap-3 text-light">
          <h1 class="fs-1 fw-bold">Kenali Satwa dari Fotomu!</h1>
          <p class="fs-4 text-center">Bisa jadi kamu baru saja melihat makhluk luar biasa! Unggah fotonya dan cari tahu apakah ia termasuk satwa yang sudah punah!</p>
          <button id="show-modal-opsi-button" class="btn btn-primary rounded-pill text-light px-5 fs-4 py-3 fw-semibold">
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
                <input type="hidden" name="latitude" id="latitude">
                <input type="hidden" name="longitude" id="longitude">
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

      <div class="modal fade" id="modalFunfact" tabindex="-1" aria-labelledby="modalFunfactLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="modalFunfactLabel">Tahukah Kamu?</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div id="carouselFunfact" class="carousel slide carousel-fade">
                <div class="carousel-inner"></div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-light" type="button" data-bs-target="#carouselFunfact" data-bs-slide="prev">
                <i class="bi bi-arrow-left"></i> Sebelumnya
              </button>
              <button class="btn btn-primary text-light" type="button" data-bs-target="#carouselFunfact" data-bs-slide="next">
                Selanjutnya <i class="bi bi-arrow-right"></i>
              </button>
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Tutup</button>
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
      prediksiConfig: PrediksiConfig
    });

    await this._setupForm();
    await this.#presenter.getFunfact();
  }

  async _setupForm() {
    const showModalButton = document.getElementById('show-modal-opsi-button');
    const modalOpsiUpload = new Modal('#modalOpsiUpload', {});

    showModalButton.addEventListener('click', async () => {
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

          document.getElementById('latitude').value = latitude;
          document.getElementById('longitude').value = longitude;
          modalOpsiUpload.show();
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Memuat Lokasi',
          text: 'Pastikan lokasi Anda diaktifkan untuk menjalankan fitur ini.',
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonText: 'Tutup',
          confirmButtonColor: '#8EC3B0',
        });
      }
    });

    document.getElementById('modalOpsiUpload').addEventListener('shown.bs.modal', async () => {
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
        const latitude = document.getElementById('latitude').value;
        const longitude = document.getElementById('longitude').value;

        await this.#presenter.getPrediksi({ file, latitude, longitude });
      });

      document.getElementById('upload-button').addEventListener('click', () => {
        document.getElementById('form-upload-button').click();
      });
    });
  }

  _showModalFunfact() {
    const checkSessionStorage = sessionStorage.getItem('showModalFunfact');

    if (checkSessionStorage !== 'true') {
      const modalFunfact = new Modal('#modalFunfact', {});
      modalFunfact.show();

      sessionStorage.setItem('showModalFunfact', 'true');
    }
  }

  setupModal(data) {
    const carouselFunfact = document.getElementById('carouselFunfact');
    const carouselInner = carouselFunfact.querySelector('.carousel-inner');

    carouselInner.innerHTML = data.fun_facts.map((funFact, index) => `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <div class="d-flex align-items-center justify-content-center bg-light" style="height: 400px;">
          <img src="${data.gambar_url}" class="object-fit-cover d-block w-100 h-100" style="filter: blur(15px);" alt="Gambar Hewan" onerror="this.onerror=null; this.src='https://placehold.co/700x500?text=Gambar%20Tidak%20Ditemukan';">
          <div class="card-img-overlay d-flex align-items-center justify-content-center p-3">
            <img src="${data.gambar_url}" class="d-block mw-100 mh-100" alt="Gambar Hewan" onerror="this.onerror=null; this.src='https://placehold.co/700x500?text=Gambar%20Tidak%20Ditemukan';">

            <div class="card-img-overlay d-flex align-items-end justify-content-center">
              <div class="card w-100 rounded-top rounded-bottom-0 ">
                <div class="card-body">
                  <h5 class="card-title fw-bold">${data.nama} <i class="fw-light">(${data.nama_ilmiah})</i></h5>
                  <q class="card-text" cite="${data.sumber}">
                    ${funFact}
                  </q>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    this._showModalFunfact();
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
