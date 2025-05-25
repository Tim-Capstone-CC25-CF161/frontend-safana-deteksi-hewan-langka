import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';
import { Offcanvas } from 'bootstrap';
import { transitionHelper } from '../utils';

class App {
  #loadingMain = null;
  #content = null;

  constructor({ content, loadingMain }) {
    this.#content = content;
    this.#loadingMain = loadingMain;
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url];

    const transition = transitionHelper({
      updateDOM: async () => {
        this.#content.innerHTML = await page.render();
        await page.afterRender();
      }
    });

    transition.ready.catch(console.error);
    transition.updateCallbackDone.then(() => {
      scrollTo({ top: 0, behavior: 'smooth' });

      const offcanvas = Offcanvas.getOrCreateInstance(document.querySelector('#offcanvasNavbar'));
      offcanvas.hide();
    });

    if (this.#loadingMain) {
      this.#loadingMain.remove();
    }
  }
}

export default App;
