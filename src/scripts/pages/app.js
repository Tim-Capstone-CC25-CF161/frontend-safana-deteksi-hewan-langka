import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';
import { transitionHelper } from '../utils';
import { Offcanvas } from 'bootstrap';
import Swal from 'sweetalert2';
import { getUserDataLogin, getLogout } from '../utils/auth';
import {
  generateAuthenticatedContainerNavbarButtonTemplate,
  generateUnauthenticatedContainerNavbarButtonTemplate
} from '../templates'
import Toast from './components/toats';

class App {
  #content = null;
  #containerNavbarButton = null;
  #loadingMain = null;

  constructor({ content, containerNavbarButton, loadingMain }) {
    this.#content = content;
    this.#containerNavbarButton = containerNavbarButton;
    this.#loadingMain = loadingMain;
  }

  _setupNavigationList() {
    const isLogin = !!getUserDataLogin();

    if (!isLogin) {
      this.#containerNavbarButton.innerHTML = generateUnauthenticatedContainerNavbarButtonTemplate();
      return;
    }

    this.#containerNavbarButton.innerHTML = generateAuthenticatedContainerNavbarButtonTemplate();
    
    const dataUserLogin = getUserDataLogin();
    
    const dropdownNamaPengguna = document.getElementById('dropdown-user-name');
    dropdownNamaPengguna.textContent = dataUserLogin?.name || 'Pengguna';

    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', (event) => {
      event.preventDefault();

      Swal.fire({
        title: 'Konfirmasi',
        text: 'Apakah Anda yakin ingin keluar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
        confirmButtonColor: '#2F1C0E',
        cancelButtonColor: '#D9534F',
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Aksi Sedang Diproses...",
            didOpen: () => {
              Swal.showLoading();
            },
          })

          const isSuccess = await getLogout();

          Swal.close();

          if (!isSuccess) {
            Swal.fire({
              icon: 'error',
              title: 'Gagal Keluar',
              text: 'Terjadi kesalahan saat mencoba keluar dari akun Anda',
              confirmButtonText: 'Tutup',
              confirmButtonColor: '#8EC3B0',
            });

            return;
          }

          Toast.fire({
            icon: "success",
            title: 'Anda telah keluar dari akun',
          });

          location.hash = '#/login';

          this.#containerNavbarButton.innerHTML = generateUnauthenticatedContainerNavbarButtonTemplate();
        }
      });
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url];

    const transition = transitionHelper({
      updateDOM: async () => {
        this.#content.innerHTML = await page.render();
        await page.afterRender();
      }
    });

    transition.ready.catch(console.error);
    transition.updateCallbackDone.then(() => {
      scrollTo({ top: 0, behavior: 'smooth' });

      const offcanvas = Offcanvas.getOrCreateInstance(document.querySelector('#offcanvasNavbar'));
      offcanvas.hide();

      this._setupNavigationList();
    });

    if (this.#loadingMain) {
      this.#loadingMain.remove();
    }
  }
}

export default App;
