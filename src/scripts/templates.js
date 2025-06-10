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
