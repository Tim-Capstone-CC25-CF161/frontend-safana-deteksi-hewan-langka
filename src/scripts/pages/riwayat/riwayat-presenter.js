export default class RiwayatPresenter {
  #view;
  #model;
  #authConfig;

  constructor({ view, model, authConfig }) {
    this.#view = view;
    this.#model = model;
    this.#authConfig = authConfig;
  }

  async getDataRiwayat(page = 1, per_page = 10, search_name = '') {
    try {
      const userLogin = await this.#authConfig.getUserDataLogin();
      const response = await this.#model.getDataRiwayatDeteksi(userLogin.id ?? '', page, per_page, search_name);

      if (!response.ok) {
        console.error('getDataRiwayat: response:', response);
        this.#view.getDataRiwayatFailed(response.message);

        return;
      }
      
      this.#view.hideLoadingRiwayat();
      this.#view.getDataRiwayatSuccessfully(response.data);
    } catch (error) {
      console.error('getDataRiwayat: error:', error);

      this.#view.getDataRiwayatFailed(error.message);
    }
  }
}
