import LoginPresenter from './login-presenter';
import * as StoryKuAPI from '../../../data/api';
import * as AuthModel from '../../../utils/auth';
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
                <input id="input-password" class="form-control" type="password" name="password" placeholder="Masukkan password Anda" required>
              </div>
              <button class="btn btn-secondary w-100 mt-5" type="submit">Masuk</button>
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
      model: StoryKuAPI,
      authModel: AuthModel,
    });

    this._setupForm();
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

//   showSubmitLoadingButton() {
//     document.getElementById('container-submit-button').innerHTML = `
//       <button class="btn" type="submit" disabled>
//         <i class="fas fa-spinner loader-button"></i> Masuk
//       </button>
//     `;
//   }

//   hideSubmitLoadingButton() {
//     document.getElementById('container-submit-button').innerHTML = `
//       <button class="btn" type="submit">Masuk</button>
//     `;
//   }
}
