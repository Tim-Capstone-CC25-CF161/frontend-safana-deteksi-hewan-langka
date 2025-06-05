export default class HomePresenter {
  #view;
  #model;
  #prediksiConfig;

  constructor({ view, model, prediksiConfig }) {
    this.#view = view;
    this.#model = model;
    this.#prediksiConfig = prediksiConfig;
  }

  async getPrediksi({ file, latitude, longitude }) {
    this.#view.showLoadingPrediksi();
    try {
      const response = await this.#model.getPrediksi({ file, latitude, longitude });

      if (!response.ok) {
        console.error('getPrediksi: response:', response);
        this.#view.prediksiFailed(response.message);

        return;
      }

      this.#prediksiConfig.putHasilPrediksi(response);
      this.#view.prediksiSuccessfully();
    } catch (error) {
      console.error('getPrediksi: error:', error);

      this.#view.prediksiFailed(error.message);
    } finally {
      // this.#view.hideLoadingPrediksi();
    }
  }
}
