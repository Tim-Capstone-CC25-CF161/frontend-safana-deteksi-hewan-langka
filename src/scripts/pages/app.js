import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';
import { Offcanvas } from 'bootstrap';
import { transitionHelper } from '../utils';

class App {
  #content = null;

  constructor({ content }) {
    this.#content = content;
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
  }
}

export default App;
