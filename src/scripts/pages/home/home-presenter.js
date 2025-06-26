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
        const backupResponse = await this.#model.getPrediksiBackup({ file, latitude, longitude });

        if (!backupResponse.ok) {
          console.error('getPrediksi: response:', response);
          console.error('getPrediksi: backup response:', backupResponse);
          this.#view.prediksiFailed(response.message || backupResponse.message);

          return;
        }

        console.warn('getPrediksi: using backup response');
        this.#prediksiConfig.putHasilPrediksi(backupResponse);
      } else {
        this.#prediksiConfig.putHasilPrediksi(response);
      }

      this.#view.prediksiSuccessfully();
    } catch (error) {
      console.error('getPrediksi: error:', error);

      this.#view.prediksiFailed(error.message);
    }
  }

  async getFunfact() {
    const data = this.#model.getOneRandomFunFact();
    this.#view.setupModal(data);
  }
}
