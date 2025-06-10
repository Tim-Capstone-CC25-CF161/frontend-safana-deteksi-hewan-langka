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
      <ul class="dropdown-menu end-0" style="left: auto;">
        <li>
          <a class="dropdown-item" href="#/profile">
            <i class="bi bi-person me-2"></i> Profil Saya
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#/riwayat">
            <i class="bi bi-clock-history me-2"></i> Riwayat Deteksi
          </a>
        </li>
        <li>
          <button id="logout-button" class="dropdown-item">
            <i class="bi bi-box-arrow-right me-2"></i> Keluar dari Akun
          </button>
        </li>
      </ul>
    </div>
  `;
}

export function generateLoadingPageTemplate() {
  return `
    <div class="content-loading">
      <svg class="loader-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
      </svg>
      Memuat Halaman...
    </div>
  `;
}

export function generatePaginationButton() {
  return `
    <div id="nav-pagination" aria-label="Pagination Data Search">
      <ul class="pagination">
        <li class="page-item">
          <a id="paginate-first" class="page-link" href="#" aria-label="First Page" data-page="1">
            <i aria-hidden="true" class="bi bi-chevron-double-left fw-bold"></i>
          </a>
        </li>
        <li class="page-item">
          <a id="paginate-prev" class="page-link" href="#" aria-label="Previous" data-page="1">
            <i aria-hidden="true" class="bi bi-chevron-left fw-bold"></i>
          </a>
        </li>
        <li class="page-item"><a id="paginate-numberfirst" class="page-link d-none" data-page="1" href="#">1</a></li>
        <li class="page-item active"><a id="paginate-numbermiddle" class="page-link" data-page="1" aria-current="page">2</a></li>
        <li class="page-item"><a id="paginate-numberlast" class="page-link d-none" data-page="1" href="#">3</a></li>
        <li class="page-item">
          <a id="paginate-next" class="page-link" href="#" aria-label="Next" data-page="1">
            <i aria-hidden="true" class="bi bi-chevron-right fw-bold"></i>
          </a>
        </li>
        <li class="page-item">
          <a id="paginate-last" class="page-link" href="#" aria-label="Last Page" data-page="1">
            <i aria-hidden="true" class="bi bi-chevron-double-right fw-bold"></i>
          </a>
        </li>
      </ul>
    </div>
  `;
}
