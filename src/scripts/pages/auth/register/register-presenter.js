export default class RegisterPresenter {
    #view;
    #model;
    #authModel;
  
    constructor({ view, model, authModel }) {
      this.#view = view;
      this.#model = model;
      this.#authModel = authModel;
    }
  
    async getRegister({ email, username, password }) {
    //   this.#view.showSubmitLoadingButton();
      try {
        // const response = await this.#model.getRegister({ email, username, password });
  
        // if (!response.ok) {
        //   console.error('getRegister: response:', response);
        //   this.#view.registerFailed(response.message);
  
        //   return;
        // }
  
        this.#view.registerSuccessfully();
      } catch (error) {
        console.error('getRegister: error:', error);
  
        this.#view.registerFailed(error.message);
      } finally {
        // this.#view.hideSubmitLoadingButton();
      }
    }
  }
  