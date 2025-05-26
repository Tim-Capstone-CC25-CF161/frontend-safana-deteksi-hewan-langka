export default class HomePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async getPrediksi({ file }) {
    this.#view.showLoadingPrediksi();
    try {
      console.log('getPrediksi: file:', file);
      
      const response = await this.#model.getPrediksi({ file });

      if (!response.ok) {
        console.error('getPrediksi: response:', response);
        this.#view.prediksiFailed(response.message);

        return;
      }

      this.#view.prediksiSuccessfully();
    } catch (error) {
      console.error('getPrediksi: error:', error);

      this.#view.prediksiFailed(error.message);
    } finally {
      // this.#view.hideLoadingPrediksi();
    }
  }
}
