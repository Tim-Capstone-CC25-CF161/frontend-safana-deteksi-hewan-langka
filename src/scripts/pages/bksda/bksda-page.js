export default class BksdaPage {
  async render() {
    return `
      <section class="background-gradient d-flex justify-content-center min-vh-100 pt-5 pt-lg-4">
        <article class="mt-5 card bg-cream container-fluid m-3 m-md-5 shadow-lg p-2 p-lg-5">
          <div class="card-header bg-transparent border-0">
            <h1 class="fs-1 text-center">List BKSDA</h1>
          </div>
          <div id="list-bksda-filter" class="card-header bg-transparent border-0 d-flex justify-content-center gap-3">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Cari berdasarkan nama atau alamat" aria-label="Cari berdasarkan nama atau alamat" id="search" aria-describedby="button-addon-search">
              <button class="btn btn-outline-secondary" type="button" id="button-addon-search">Cari</button>
            </div>
            <button title="Gunakan lokasi saat ini" type="button" class="btn btn-primary" id="button-use-current-location">
              <i class="bi bi-geo-alt-fill"></i>
            </button>
          </div>
          <div id="list-bksda-body" class="card-body d-flex flex-wrap justify-content-center gap-4"></div>
        </article>
      </section>
    `;
  }

  async afterRender() {
    const bodyListBksda = document.getElementById('list-bksda-body');
    const templateCard = `
      <div class="card shadow-sm" style="width: 20rem;">
        <div class="card-body">
          <h5 class="card-title">BKSDA {index}</h5>
          <p class="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus, sapiente.</p>
        </div>
      </div>
    `;

    for (let index = 0; index < 15; index++) {
      bodyListBksda.innerHTML += templateCard.replace('{index}', index + 1);
    }
  }
}
