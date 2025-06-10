export default class RiwayatPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async getDataRiwayat() {
    try {
      // const response = await this.#model.getAllBksda();

      // if (!response.ok) {
      //   console.error('getDataRiwayat: response:', response);
      //   this.#view.getDataRiwayatFailed(response.message);

      //   return;
      // }

      this.#view.hideLoading();
      this.#view.getDataRiwayatSuccessfully({});
    } catch (error) {
      console.error('getDataRiwayat: error:', error);

      this.#view.getDataRiwayatFailed(error.message);
    }
  }
}
