import CONFIG from '../config';

const ENDPOINTS = {
  ALL_BKSDA: `${CONFIG.BASE_URL}/bksda`,
};

export async function getAllBksda() {
  const fetchResponse = await fetch(ENDPOINTS.ALL_BKSDA, {
    method: 'GET',
    credentials: 'include',
  })
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}
