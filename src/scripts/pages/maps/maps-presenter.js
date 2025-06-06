export default class MapsPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async showSebaranDeteksiMap() {
    this.#view.showMapLoading();

    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error('showSebaranDeteksiMap: error:', error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  async initialGalleryAndMap() {
    await this.showSebaranDeteksiMap();

    try {
      this.#view.showLoading();

      const response = await this.#model.getDataMaps(1, 100);

      if (!response.ok) {
        console.error('initialGalleryAndMap: response:', response);
        this.#view.setSebaranDeteksiError(response.message);
        return;
      }

      this.#view.hideLoading();
      this.#view.setDeteksiCoordinates(response.data.total_data, response.data.data);
    } catch (error) {
      console.error('initialGalleryAndMap: error:', error);
      this.#view.setSebaranDeteksiError(error.message);
    }
  }
}
