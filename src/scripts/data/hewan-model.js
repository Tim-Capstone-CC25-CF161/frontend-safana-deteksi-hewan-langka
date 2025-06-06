import CONFIG from '../config';
import { getUserDataLogin } from '../utils/auth';

const ENDPOINTS = {
  PREDIKSI: `${CONFIG.BASE_URL}/predict`,
  GALLERY: `${CONFIG.BASE_URL}/galeri`,
  MAPS: `${CONFIG.BASE_URL}/maps`,
};

export async function getPrediksi({ file, latitude, longitude }) {
  const userDataLogin = getUserDataLogin();

  const data = new FormData();
  data.append('file', file);
  data.append('latitude', latitude);
  data.append('longitude', longitude);
  data.append('user_id', userDataLogin?.id || '');

  const fetchResponse = await fetch(ENDPOINTS.PREDIKSI, {
    method: 'POST',
    body: data,
    credentials: 'include',
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getDataGalery(page = 1, per_page = 10, search_name = '') {
  const fetchResponse = await fetch(`${ENDPOINTS.GALLERY}?page=${page}&per_page=${per_page}&search_name=${search_name}`, {
    method: 'GET',
    credentials: 'include',
  })
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getDataMaps(page = 1, per_page = 10) {
  const fetchResponse = await fetch(`${ENDPOINTS.MAPS}?page=${page}&per_page=${per_page}`, {
    method: 'GET',
    credentials: 'include',
  })
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}
