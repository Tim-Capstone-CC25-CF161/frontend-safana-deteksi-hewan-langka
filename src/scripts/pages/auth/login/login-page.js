import LoginPresenter from './login-presenter';
import * as AuthModel from '../../../data/auth-model';
import * as AuthConfig from '../../../utils/auth';
import Toast from '../../components/toats';
import Swal from 'sweetalert2';

export default class LoginPage {
  #presenter = null;

  async render() {
    return `
      <section class="background-gradient d-flex justify-content-center min-vh-100 pt-5 pt-lg-4">
        <article class="mt-5 card bg-cream container-fluid m-3 m-md-5 shadow-lg p-2 p-lg-5">
          <div class="card-header bg-transparent border-0">
            <h1 class="fs-1 text-center">Masuk</h1>
          </div>
          <div class="card-body">
            <form id="login-form" class="login-form mt-3">
              <div class="mb-3">
                <label for="input-username" class="form-label">Username<span class="text-danger">*</span></label>
                <input id="input-username" class="form-control" type="text" name="username" placeholder="Masukkan username Anda" required autofocus>
              </div>
              <div class="mb-3">
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
                  Masuk
                </button>
              </div>
            </form>
          </div>
          <div class="card-footer bg-transparent border-0">
            <p class="text-center">Belum punya akun? <a href="#/register" class="text-decoration-none">Daftar</a></p>
          </div>
        </article>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new LoginPresenter({
      view: this,
      model: AuthModel,
      authConfig: AuthConfig,
    });

    this._setupForm();
    this._setUpTogglePassword();
  }
  
  _setupForm() {
    document.getElementById('login-form').addEventListener('submit', async (event) => {
      event.preventDefault();

      const data = {
        username: document.getElementById('input-username').value,
        password: document.getElementById('input-password').value,
      };

      await this.#presenter.getLogin(data);
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

  loginSuccessfully() {
    Toast.fire({
      icon: "success",
      title: 'Login Berhasil',
    });

    location.hash = '/';
  }

  loginFailed(message) {
    Swal.fire({
      icon: 'error',
      title: 'Login Gagal',
      text: message,
      confirmButtonText: 'Tutup',
      confirmButtonColor: '#8EC3B0',
    });
  }

  showSubmitLoadingButton() {
    document.getElementById('container-submit-button').innerHTML = `
      <button class="btn btn-secondary w-100 mt-5" type="submit">
        <i class="bi bi-gear loader-icon"></i> Memproses...
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById('container-submit-button').innerHTML = `
      <button class="btn btn-secondary w-100 mt-5" type="submit">Masuk</button>
    `;
  }
}
