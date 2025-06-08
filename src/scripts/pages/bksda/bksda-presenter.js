export default class BksdaPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async getDataAllBksda() {
    try {
      const response = await this.#model.getAllBksda();

      if (!response.ok) {
        console.error('getDataAllBksda: response:', response);
        this.#view.getDataAllBksdaFailed(response.message);

        return;
      }

      this.#view.hideLoading();
      this.#view.getDataAllBksdaSuccessfully(response.data);
    } catch (error) {
      console.error('getDataAllBksda: error:', error);

      this.#view.getDataAllBksdaFailed(error.message);
    }
  }
}
