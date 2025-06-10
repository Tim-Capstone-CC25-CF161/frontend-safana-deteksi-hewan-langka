export default class ProfilePresenter {
  #view;
  #model;
  #authConfig;

  constructor({ view, model, authConfig }) {
    this.#view = view;
    this.#model = model;
    this.#authConfig = authConfig;
  }

  async getDataProfile() {
    try {
      const response = await this.#authConfig.getUserDataLogin();

      this.#view.hideLoading();
      this.#view.getDataProfileSuccessfully(response);
    } catch (error) {
      console.error('getDataProfile: error:', error);

      this.#view.getDataProfileFailed(error.message);
    }
  }

  async getUpdateProfile({ id, name, username, password }) {
    this.#view.showSubmitLoadingButton();
    try {
      const response = await this.#model.getUpdateProfile({ id, name, username, password });

      if (!response.ok) {
        console.error('getUpdateProfile: response:', response);
        this.#view.updateProfileFailed(response.message);

        return;
      }

      const dataTersimpan = await this.#authConfig.getUserDataLogin();
      const dataUpdate = { ...dataTersimpan, name, username, password };

      this.#authConfig.putUserDataLogin(dataUpdate);
      this.#view.updateProfileSuccessfully(response.data);
    } catch (error) {
      console.error('getUpdateProfile: error:', error);

      this.#view.updateProfileFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }

  async getDeleteProfile(id) {
    this.#view.showSubmitLoadingButton();
    try {
      const response = await this.#model.getDeleteProfile(id);

      if (!response.ok) {
        console.error('getDeleteProfile: response:', response);
        this.#view.deleteProfileFailed(response.message);

        return;
      }

      this.#view.deleteProfileSuccessfully();
    } catch (error) {
      console.error('getDeleteProfile: error:', error);

      this.#view.deleteProfileFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
