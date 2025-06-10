import CONFIG from '../config';
import { getUserDataLogin } from '../utils/auth';

const ENDPOINTS = {
  HEWAN_DETAIL: (id) => `${CONFIG.BASE_URL}/hewandilindungi/${id}`,
  HEWAN_SERUPA: (id) => `${CONFIG.BASE_URL}/hewanidserupa/${id}`,
  RIWAYAT_DETEKSI: (id) => `${CONFIG.BASE_URL}/histories/${id}`,
  PREDIKSI: `${CONFIG.BASE_URL}/predict`,
  GALLERY: `${CONFIG.BASE_URL}/galeri`,
  MAPS: `${CONFIG.BASE_URL}/maps`,
};

export async function getDetailHewanById(id) {
  const fetchResponse = await fetch(ENDPOINTS.HEWAN_DETAIL(id), {
    method: 'GET',
    credentials: 'include',
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getDataHewanSerupa(id) {
  const fetchResponse = await fetch(ENDPOINTS.HEWAN_SERUPA(id), {
    method: 'GET',
    credentials: 'include',
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getDataRiwayatDeteksi(id, page = 1, per_page = 10, search_name = '') {
  const fetchResponse = await fetch(`${ENDPOINTS.RIWAYAT_DETEKSI(id)}?page=${page}&per_page=${per_page}&search_name=${search_name}`, {
    method: 'GET',
    credentials: 'include',
  })
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

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
