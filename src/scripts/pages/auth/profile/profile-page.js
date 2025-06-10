import ProfilePresenter from './profile-presenter';
import * as AuthModel from '../../../data/auth-model';
import * as AuthConfig from '../../../utils/auth';
import { getLogout } from '../../../utils/auth';
import Toast from '../../components/toats';
import {
  generateUnauthenticatedContainerNavbarButtonTemplate
} from '../../../templates';
import Swal from 'sweetalert2';

export default class ProfilePage {
  #id = null;
  #presenter = null;

  async render() {
    return `
      <section class="background-gradient d-flex justify-content-center min-vh-100 pt-5 pt-lg-4">
        <article class="mt-5 card bg-cream container-fluid m-3 m-md-5 shadow-lg p-2 p-lg-5">
          <div class="card-header bg-transparent border-0">
            <h1 class="fs-1 text-center">Profil Saya</h1>
          </div>
          <div id="profile-loading" class="d-flex align-items-center justify-content-center">
            <p class="loading-text fs-1">
              <i class="bi bi-gear loader-icon me-2 w-auto h-auto"></i>
              <span>Memuat Data Profil...</span>
            </p>
          </div>
          <div id="profile-body" class="card-body">
            <form id="profil-form" class="profil-form mt-3 w-100">
              <div class="mb-3">
                <label for="input-name" class="form-label">Nama Lengkap<span class="text-danger">*</span></label>
                <input id="input-name" class="form-control" type="text" name="name" placeholder="Masukkan nama lengkap Anda" required>
              </div>
              <div class="mb-3">
                <label for="input-username" class="form-label">Username<span class="text-danger">*</span></label>
                <input id="input-username" class="form-control" type="text" name="username" placeholder="Masukkan username Anda" required>
              </div>
              <div class="mb-2">
                <label for="input-password" class="form-label">Password<span class="text-danger">*</span></label>
                <div class="input-group">
                  <input id="input-password" class="form-control" type="password" name="password" placeholder="Masukkan password Anda" required>
                  <button class="btn btn-light border" type="button" id="button-toggle-password" tabindex="-1">
                    <i class="bi bi-eye-slash-fill"></i>
                  </button>
                </div>
              </div>
              <div id="container-submit-button">
                <button class="btn btn-secondary w-100 mt-5" type="submit">
                  <i class="bi bi-pencil-square me-2 w-auto h-auto"></i> Perbarui Profil
                </button>
              </div>
            </form>

            <div id="container-hapus-akun">
              <button class="btn btn-danger w-100 mt-5" type="submit" id="button-hapus-akun">
                <i class="bi bi-trash me-2 w-auto h-auto"></i> Hapus Akun
              </button>
            </div>
          </div>
        </article>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new ProfilePresenter({
      view: this,
      model: AuthModel,
      authConfig: AuthConfig,
    });

    await this.#presenter.getDataProfile();

    this._setupForm();
    this._setUpTogglePassword();
  }

  _setupForm() {
    document.getElementById('profil-form').addEventListener('submit', async (event) => {
      event.preventDefault();

      const data = {
        id: this.#id,
        name: document.getElementById('input-name').value,
        username: document.getElementById('input-username').value,
        password: document.getElementById('input-password').value,
      };

      await this.#presenter.getUpdateProfile(data);
    });
  }

  _setUpTogglePassword() {
    const passwordInput = document.getElementById('input-password');
    const buttonTogglePassword = document.getElementById('button-toggle-password');

    buttonTogglePassword.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        buttonTogglePassword.innerHTML = '<i class="bi bi-eye-fill"></i>';
      } else {
        passwordInput.type = 'password';
        buttonTogglePassword.innerHTML = '<i class="bi bi-eye-slash-fill"></i>';
      }
    });
  }

  getDataProfileSuccessfully(data) {
    const inputName = document.getElementById('input-name');
    const inputUsername = document.getElementById('input-username');

    this.#id = data.id;
    inputName.value = data.name || '';
    inputUsername.value = data.username || '';
    
    document.getElementById('button-hapus-akun').addEventListener('click', async () => {
      await Swal.fire({
        title: 'Hapus Akun',
        text: 'Anda yakin ingin menghapus akun ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#F9731A',
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { value: username } = await Swal.fire({
            title: 'Hapus Akun',
            input: 'text',
            inputLabel: 'Masukkan username Anda untuk konfirmasi',
            inputPlaceholder: 'Username',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#F9731A',
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            inputValidator: (value) => {
              if (value === data.username) {
                return null;
              }

              return 'Username tidak sesuai!';
            }
          });

          if (username) {
            await this.#presenter.getDeleteProfile(data.id);
          }
        }
      })
    });
  }

  async deleteProfileSuccessfully() {
    Toast.fire({
      icon: 'success',
      title: 'Pengguna berhasil dihapus!',
    });

    const isSuccess = await getLogout();

    if (!isSuccess) {
      return;
    }
    
    location.hash = '#/login';

    document.querySelector('#container-navbar-button').innerHTML = generateUnauthenticatedContainerNavbarButtonTemplate();
  }

  deleteProfileFailed(message) {
    Toast.fire({
      icon: 'error',
      title: message,
    });
  }

  showSubmitLoadingButton() {
    const buttonProses = `
      <button class="btn btn-secondary w-100 mt-5" type="submit" disabled>
        <i class="bi bi-gear loader-icon"></i> Memproses...
      </button>
    `;

    document.getElementById('container-submit-button').innerHTML = buttonProses;

    document.getElementById('button-hapus-akun').disabled = true;
    document.getElementById('button-hapus-akun').classList.add('disabled');
    document.getElementById('button-hapus-akun').innerHTML = `
      <i class="bi bi-gear loader-icon"></i> Memproses...
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById('container-submit-button').innerHTML = `
      <button class="btn btn-secondary w-100 mt-5" type="submit">
        <i class="bi bi-pencil-square me-2 w-auto h-auto"></i> Perbarui Profil
      </button>
    `;

    document.getElementById('button-hapus-akun').disabled = false;
    document.getElementById('button-hapus-akun').classList.remove('disabled');
    document.getElementById('button-hapus-akun').innerHTML = `
      <i class="bi bi-trash me-2 w-auto h-auto"></i> Hapus Akun
    `;
  }
  
  hideLoading() {
    const profileLoading = document.getElementById('profile-loading');
    profileLoading.classList.add('d-none');
  }

  updateProfileSuccessfully(data) {
    document.getElementById('profil-form').reset();

    this.getDataProfileSuccessfully(data);

    document.getElementById('dropdown-user-name').innerHTML = data.name;

    Toast.fire({
      icon: "success",
      title: 'Profil berhasil diperbarui!',
    });
  }

  updateProfileFailed(error) {
    Toast.fire({
      icon: "error",
      title: error,
    });
  }

  getDataProfileFailed(error) {
    const profileLoading = document.getElementById('profile-loading');
    profileLoading.innerHTML = `
      <p class="loading-text fs-1 text-danger">
        <i class="bi bi-exclamation-triangle-fill me-2 w-auto h-auto"></i>
        <span>Gagal Memuat Data Profil...</span>
      </p>
    `;

    Toast.fire({
      icon: "error",
      title: 'Terjadi kesalahan saat memuat profil!',
    });

    console.error(error);
  }
}
