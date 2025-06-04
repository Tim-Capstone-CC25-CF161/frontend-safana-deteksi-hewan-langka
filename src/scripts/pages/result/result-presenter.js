export default class ResultPresenter {
  #view;
  #prediksiConfig;

  constructor({ view, prediksiConfig }) {
    this.#view = view;
    this.#prediksiConfig = prediksiConfig;
  }

  async getPrediksi() {
    this.#view.showLoadingPrediksi();
    try {
      const response = await this.#prediksiConfig.getHasilPrediksi();
      this.#view.getPrediksiSuccessfully(response);
    } catch (error) {
      console.error('getPrediksi: error:', error);

      this.#view.getPrediksiFailed(error.message);
    } finally {
      this.#view.hideLoadingPrediksi();
    }
  }
}
