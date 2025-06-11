import LoginPage from '../pages/auth/login/login-page';
import ProfilePage from '../pages/auth/profile/profile-page';
import RegisterPage from '../pages/auth/register/register-page';
import BksdaPage from '../pages/bksda/bksda-page';
import CameraPage from '../pages/camera/camera-page';
import DetailHewanPage from '../pages/detail-hewan/detail-hewan-page';
import GaleryPage from '../pages/galery/galery-page';
import HomePage from '../pages/home/home-page';
import MapsPage from '../pages/maps/maps-page';
import NotFoundPage from '../pages/not-found/not-found-page';
import ResultPage from '../pages/result/result-page';
import RiwayatPage from '../pages/riwayat/riwayat-page';

const routes = {
  '/login': new LoginPage(),
  '/register': new RegisterPage(),

  '/profile': new ProfilePage,

  '/': new HomePage(),
  '/maps': new MapsPage(),
  '/galery': new GaleryPage(),
  '/bksda': new BksdaPage(),

  '/riwayat': new RiwayatPage(),

  '/camera': new CameraPage(),
  '/result': new ResultPage(),
  '/hewan/:id': new DetailHewanPage(),

  '/not-found': new NotFoundPage(),
};

export default routes;
