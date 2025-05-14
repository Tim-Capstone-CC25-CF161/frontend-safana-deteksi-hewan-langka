import CONFIG from '../config';

const ENDPOINTS = {
  // Auth
  LOGIN: `${CONFIG.BASE_URL}/login`,
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGOUT: `${CONFIG.BASE_URL}/logout`,
};

export async function getLogin({ username, password }) {
  const data = JSON.stringify({ username, password });

  const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getLogout() {
  const fetchResponse = await fetch(ENDPOINTS.LOGOUT, {
    method: 'POST',
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getRegister({ email, username, password }) {
  const data = JSON.stringify({ email, username, password });

  const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}
