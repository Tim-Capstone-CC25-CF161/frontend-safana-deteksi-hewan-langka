export function generateUnauthenticatedContainerNavbarButtonTemplate() {
  return `
    <a href="#/login" class="btn btn-light rounded-pill px-3">
      Masuk
    </a>
    <a href="#/register" class="btn btn-primary rounded-pill text-light px-3">
      Daftar
    </a>
  `;
}

export function generateAuthenticatedContainerNavbarButtonTemplate() {
  return `
    <div class="dropdown">
      <button class="btn btn-transparent dropdown-toggle rounded-pill" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <span id="dropdown-user-name">Nama Pengguna</span>
      </button>
      <ul class="dropdown-menu">
        <li>
          <a class="dropdown-item" href="#">Riwayat Pencarian</a>
        </li>
        <li>
          <button id="logout-button" class="dropdown-item">
            Keluar dari Akun
          </button>
        </li>
      </ul>
    </div>
  `;
}
