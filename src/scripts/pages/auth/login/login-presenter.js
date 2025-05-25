export default class LoginPresenter {
  #view;
  #model;
  #authConfig;

  constructor({ view, model, authConfig }) {
    this.#view = view;
    this.#model = model;
    this.#authConfig = authConfig;
  }

  async getLogin({ username, password }) {
    this.#view.showSubmitLoadingButton();
    try {
      const response = await this.#model.getLogin({ username, password });

      if (!response.ok) {
        console.error('getLogin: response:', response);
        this.#view.loginFailed(response.message);

        return;
      }

      this.#authConfig.putUserDataLogin(response.data);

      this.#view.loginSuccessfully();
    } catch (error) {
      console.error('getLogin: error:', error);

      this.#view.loginFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
