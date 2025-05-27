import LoginPage from '../pages/auth/login/login-page';
import RegisterPage from '../pages/auth/register/register-page';
import BksdaPage from '../pages/bksda/bksda-page';
import CameraPage from '../pages/camera/camera-page';
import GaleryPage from '../pages/galery/galery-page';
import HomePage from '../pages/home/home-page';
import MapsPage from '../pages/maps/maps-page';
import ResultPage from '../pages/result/result-page';

const routes = {
  '/login': new LoginPage(),
  '/register': new RegisterPage(),

  '/': new HomePage(),
  '/maps': new MapsPage(),
  '/galery': new GaleryPage(),
  '/bksda': new BksdaPage(),

  '/camera': new CameraPage(),
  '/result': new ResultPage(),
};

export default routes;
