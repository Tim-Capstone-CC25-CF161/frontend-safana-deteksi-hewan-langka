import RegisterPresenter from './register-presenter';
import * as AuthModel from '../../../data/auth-model';
import Toast from '../../components/toats';
import Swal from 'sweetalert2';

export default class RegisterPage {
  #presenter = null;

  async render() {
    return `
      <section class="background-gradient d-flex justify-content-center min-vh-100 pt-5 pt-lg-4">
        <article class="mt-5 card bg-cream container-fluid m-3 m-md-5 shadow-lg p-2 p-lg-5">
          <div class="card-header bg-transparent border-0">
            <h1 class="fs-1 text-center">Daftar</h1>
          </div>
          <div class="card-body">
            <form id="register-form" class="register-form mt-3">
              <div class="mb-3">
                <label for="input-name" class="form-label">Nama Lengkap<span class="text-danger">*</span></label>
                <input id="input-name" class="form-control" type="text" name="name" placeholder="Masukkan nama lengkap Anda" required autofocus>
              </div>
              <div class="mb-3">
                <label for="input-username" class="form-label">Username<span class="text-danger">*</span></label>
                <input id="input-username" class="form-control" type="text" name="username" placeholder="Masukkan username Anda" required>
              </div>
              <div class="mb-3">
                <label for="input-password" class="form-label">Password<span class="text-danger">*</span></label>
                <input id="input-password" class="form-control" type="password" name="password" placeholder="Masukkan password Anda" required>
              </div>
              <div id="container-submit-button">
                <button class="btn btn-secondary w-100 mt-5" type="submit">
                  Daftar
                </button>
              </div>
            </form>
          </div>
          <div class="card-footer bg-transparent border-0">
            <p class="text-center">Sudah punya akun? <a href="#/login" class="text-decoration-none">Masuk</a></p>
          </div>
        </article>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new RegisterPresenter({
      view: this,
      model: AuthModel,
    });

    this._setupForm();
  }
  
  _setupForm() {
    document.getElementById('register-form').addEventListener('submit', async (event) => {
      event.preventDefault();

      const data = {
        name: document.getElementById('input-name').value,
        username: document.getElementById('input-username').value,
        password: document.getElementById('input-password').value,
      };

      await this.#presenter.getRegister(data);
    });
  }

  registerSuccessfully() {
    Toast.fire({
      icon: "success",
      title: 'Pendaftaran Akun Berhasil',
    });

    location.hash = '/login';
  }

  registerFailed(message) {
    Swal.fire({
      icon: 'error',
      title: 'Pendaftaran Akun Gagal',
      text: message,
      confirmButtonText: 'Tutup',
      confirmButtonColor: '#8EC3B0',
    });
  }

  showSubmitLoadingButton() {
    document.getElementById('container-submit-button').innerHTML = `
      <button class="btn btn-secondary w-100 mt-5" type="submit" disabled>
        <i class="bi bi-gear loader-icon"></i> Memproses...
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById('container-submit-button').innerHTML = `
      <button class="btn btn-secondary w-100 mt-5" type="submit">Daftar</button>
    `;
  }
}
