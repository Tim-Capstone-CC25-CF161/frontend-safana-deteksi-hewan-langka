export default class ResultPage {
  async render() {
    return `
      <section class="background-gradient d-flex justify-content-center min-vh-100 pt-5 pt-lg-4">
        <article class="mt-5 card bg-cream container-fluid m-3 m-md-5 shadow-lg p-2 p-lg-5">
          <div class="card-header bg-transparent border-0">
            <h1 class="fs-1 text-center">Hasil Deteksi</h1>
          </div>
          <div id="result-body" class="card-body"></div>
        </article>
      </section>
    `;
  }

  async afterRender() {
    // Do your job here
  }
}
