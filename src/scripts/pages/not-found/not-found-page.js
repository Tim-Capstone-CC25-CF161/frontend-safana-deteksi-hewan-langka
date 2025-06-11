export default class NotFoundPage {

  async render() {
    return `
      <section class="background-gradient d-flex justify-content-center align-items-center min-vh-100 pt-5 pt-lg-4">
        <article class="mt-5 card bg-cream container-fluid m-3 m-md-5 shadow-lg p-2 p-lg-5">
          <div class="card-header bg-transparent border-0">
            <h1 class="fs-1 text-center">404 - Halaman Tidak Ditemukan</h1>
          </div>
          <div class="card-body text-center">
            <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>
            <p>Silakan kembali ke <a href="#/">beranda</a> atau gunakan menu navigasi untuk menemukan halaman yang Anda inginkan.</p>
          </div>
        </article>
      </section>
    `;
  }

  async afterRender() {}
}
