import LoginPage from '../pages/auth/login/login-page';
import RegisterPage from '../pages/auth/register/register-page';
import GaleryPage from '../pages/galery/galery-page';
import HomePage from '../pages/home/home-page';
import MapsPage from '../pages/maps/maps-page';

const routes = {
  '/login': new LoginPage(),
  '/register': new RegisterPage(),

  '/': new HomePage(),
  '/maps': new MapsPage(),
  '/galery': new GaleryPage(),
};

export default routes;
