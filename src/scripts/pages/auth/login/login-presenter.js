export default class LoginPresenter {
    #view;
    #model;
    #authModel;
  
    constructor({ view, model, authModel }) {
      this.#view = view;
      this.#model = model;
      this.#authModel = authModel;
    }
  
    async getLogin({ username, password }) {
    //   this.#view.showSubmitLoadingButton();
      try {
        // const response = await this.#model.getLogin({ username, password });
  
        // if (!response.ok) {
        //   console.error('getLogin: response:', response);
        //   this.#view.loginFailed(response.message);
  
        //   return;
        // }
  
        // this.#authModel.putAccessToken(response.loginResult.token);
  
        this.#view.loginSuccessfully();
      } catch (error) {
        console.error('getLogin: error:', error);
  
        this.#view.loginFailed(error.message);
      } finally {
        // this.#view.hideSubmitLoadingButton();
      }
    }
  }
  