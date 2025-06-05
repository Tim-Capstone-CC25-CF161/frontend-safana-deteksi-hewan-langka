export default class GaleryPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async getDataGalery(page = 1, per_page = 10, search_name = '') {
    try {
      const response = await this.#model.getDataGalery(page, per_page, search_name);

      if (!response.ok) {
        console.error('getGalery: response:', response);
        this.#view.getGaleryFailed(response.message);

        return;
      }
      
      this.#view.getGalerySuccessfully(response.data);
    } catch (error) {
      console.error('getGalery: error:', error);

      this.#view.getGaleryFailed(error.message);
    }
  }
}
