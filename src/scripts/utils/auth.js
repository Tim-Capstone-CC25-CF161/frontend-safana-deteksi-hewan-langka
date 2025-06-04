import { getActiveRoute } from '../routes/url-parser';
import { getLogout as getLogoutApi } from '../data/auth-model';
import { removeHasilPrediksi } from './prediction';
import CONFIG from '../config';

export function getUserDataLogin() {
  try {
    const userDataLogin = localStorage.getItem(CONFIG.USER_DATA_LOGIN);

    if (userDataLogin === 'null' || userDataLogin === 'undefined') {
      return null;
    }

    return JSON.parse(userDataLogin);
  } catch (error) {
    console.error('getUserDataLogin: error:', error);
    return null;
  }
}

export function putUserDataLogin(userDataLogin) {
  try {
    localStorage.setItem(CONFIG.USER_DATA_LOGIN, JSON.stringify(userDataLogin));

    return true;
  } catch (error) {
    console.error('getUserDataLogin: error:', error);

    return false;
  }
}

export function removeUserDataLogin() {
  try {
    localStorage.removeItem(CONFIG.USER_DATA_LOGIN);

    return true;
  } catch (error) {
    console.error('getLogout: error:', error);

    return false;
  }
}

const unauthenticatedRoutesOnly = ['/login', '/register'];

export function checkUnauthenticatedRouteOnly(page) {
  const url = getActiveRoute();
  const isLogin = !!getUserDataLogin();

  if (unauthenticatedRoutesOnly.includes(url) && isLogin) {
    location.hash = '/';

    return null;
  }

  return page;
}

export function checkAuthenticatedRoute(page) {
  const isLogin = !!getUserDataLogin();

  if (!isLogin) {
    location.hash = '/login';

    return null;
  }

  return page;
}

export async function getLogout() {
  try {
    const response = await getLogoutApi();

    if (!response.ok) {
      console.error('getLogout: response:', response);
      return false;
    }

    removeUserDataLogin();
    removeHasilPrediksi();
    return true;
  } catch (error) {
    console.error('getLogout: error:', error);
    return false;
  }
}
