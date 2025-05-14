export default class HomePage {
  async render() {
    return `
      <section class="min-vh-100 d-flex align-items-center justify-content-center background-img-head">
        <div class="d-flex align-items-center justify-content-center flex-column text-center container px-5 gap-3 text-light">
          <h1 class="fs-1 fw-bold">Kenali Satwa dari Fotomu!</h1>
          <p class="fs-4 text-center">Bisa jadi kamu baru saja melihat makhluk luar biasa! Unggah fotonya dan cari tahu apakah ia termasuk satwa yang sudah punah!</p>
          <button class="btn btn-primary rounded-pill text-light px-5 fs-4 py-3 fw-semibold">Unggah & Cari Tahu!</button>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Do your job here
  }
}
