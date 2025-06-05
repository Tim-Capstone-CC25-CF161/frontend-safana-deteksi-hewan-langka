import CONFIG from "../config";

export function getHasilPrediksi() {
  try {
    const hasilPrediksi = sessionStorage.getItem(CONFIG.PREDICTION_RESULT);

    if (hasilPrediksi === 'null' || hasilPrediksi === 'undefined') {
      return null;
    }

    return JSON.parse(hasilPrediksi);
  } catch (error) {
    console.error('getHasilPrediksi: error:', error);
    return null;
  }
}

export function putHasilPrediksi(hasilPrediksi) {
  try {
    sessionStorage.setItem(CONFIG.PREDICTION_RESULT, JSON.stringify(hasilPrediksi));

    return true;
  } catch (error) {
    console.error('getHasilPrediksi: error:', error);

    return false;
  }
}

export function removeHasilPrediksi() {
  try {
    sessionStorage.removeItem(CONFIG.PREDICTION_RESULT);

    return true;
  } catch (error) {
    console.error('getLogout: error:', error);

    return false;
  }
}
