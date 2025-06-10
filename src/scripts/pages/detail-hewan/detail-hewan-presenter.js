import CONFIG from '../../config';

export default class DetailHewanPresenter {
  #hewanId;
  #view;
  #apiModel;

  constructor(hewanId, { view, apiModel }) {
    this.#hewanId = hewanId;
    this.#view = view;
    this.#apiModel = apiModel;
  }

  async showDetailHewan() {
    this.#view.showDetailHewanLoading();
    try {
      const response = await this.#apiModel.getDetailHewanById(this.#hewanId);

      if (!response.ok) {
        console.error('showDetailHewan: response:', response);
        this.#view.getDetailHewanFailed(response.message);

        return;
      }

      const imageHewan = await this.getImageHewan(response.nama);
      response.imageHewan = imageHewan;

      const hewanSerupa = await this.getHewanSerupa();
      response.hewanSerupa = hewanSerupa;

      this.#view.hideDetailHewanLoading();
      this.#view.getDetailHewanSuccess(response);
    } catch (error) {
      console.error('showDetailHewan: error:', error);
      this.#view.getDetailHewanFailed(error.message);
    }
  }

  async getImageHewan(search_name) {
    try {
      const response = await this.#apiModel.getDataGalery(1, 10, search_name);

      if (!response.ok) {
        console.error('getImageHewan: response:', response);
        return [];
      }

      const mappingImageHewan = response.data.data.map((data) => data.image);
      let tempFilteringImageHewan = [];
      let filteringImageHewan = [];

      for (let i = 0; i < mappingImageHewan.length; i++) {
        let rawData = mappingImageHewan[i].split('_');
        const imageCheck = rawData.splice(1).join('_');
        
        if (!tempFilteringImageHewan.includes(imageCheck)) {
          tempFilteringImageHewan.push(imageCheck);
          filteringImageHewan.push(CONFIG.BASE_URL + mappingImageHewan[i]);
        }
      }

      return filteringImageHewan;
    } catch (error) {
      console.error('getImageHewan: error:', error);
      return [];
    }
  }

  async getHewanSerupa() {
    try {
      const response = await this.#apiModel.getDataHewanSerupa(this.#hewanId);

      if (!response.ok) {
        console.error('getHewanSerupa: response:', response);
        return [];
      }

      const mappingHewanSerupa = response.data.map((data) => {
        return {
          id: data.id,
          name: data.name,
          latin_name: data.namaLatin,
          image: CONFIG.BASE_URL + data.imageUrl,
        };
      });

      return mappingHewanSerupa;
    } catch (error) {
      console.error('getHewanSerupa: error:', error);
      return [];
    }
  }
}
