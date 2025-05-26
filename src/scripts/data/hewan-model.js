import CONFIG from '../config';

const ENDPOINTS = {
  PREDIKSI: `${CONFIG.BASE_URL}/predict`,
};

export async function getPrediksi({ file }) {
  const data = new FormData();
  data.append('file', file);

  const fetchResponse = await fetch(ENDPOINTS.PREDIKSI, {
    method: 'POST',
    body: data,
    // credentials: 'include',
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}
