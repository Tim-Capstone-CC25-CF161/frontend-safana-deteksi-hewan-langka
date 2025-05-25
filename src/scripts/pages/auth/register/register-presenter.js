export default class RegisterPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async getRegister({ name, username, password }) {
    this.#view.showSubmitLoadingButton();
    try {
      const response = await this.#model.getRegister({ name, username, password });

      if (!response.ok) {
        console.error('getRegister: response:', response);
        this.#view.registerFailed(response.message);

        return;
      }

      this.#view.registerSuccessfully();
    } catch (error) {
      console.error('getRegister: error:', error);

      this.#view.registerFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
  