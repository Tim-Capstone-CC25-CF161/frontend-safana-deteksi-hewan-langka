export default class GaleryPage {
  async render() {
    return `
      <section class="background-gradient d-flex justify-content-center min-vh-100 pt-5 pt-lg-4">
        <article class="mt-5 card bg-cream container-fluid m-3 m-md-5 shadow-lg p-2 p-lg-5">
          <div class="card-header bg-transparent border-0">
            <h1 class="fs-1 text-center">Galeri</h1>
          </div>
          <div id="galery-body" class="card-body d-flex flex-wrap justify-content-center gap-4"></div>
        </article>
      </section>
    `;
  }

  async afterRender() {
    const bodyGalery = document.getElementById('galery-body');
    const templateCard = `
      <div class="card shadow-sm" style="width: 20rem;">
        <img src="https://placehold.co/600x400?text=Foto+Hewan" class="card-img-top" alt="Foto Hewan">
        <div class="card-body">
          <h5 class="card-title">Lorem, ipsum.</h5>
          <p class="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus, sapiente.</p>
          <button class="btn btn-primary text-light">Lihat Detail</button>
        </div>
      </div>
    `;

    for (let index = 0; index < 10; index++) {
      bodyGalery.innerHTML += templateCard;
    }
  }
}
