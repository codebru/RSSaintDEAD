import { Capacitor, CapacitorHttp } from '@capacitor/core';

// TODO switch this for my own self hosted version
const CORS_PROXY = 'https://proxy.corsfix.com/?';

async function fetchText(url) {
  if (Capacitor.isNativePlatform()) {
    const res = await CapacitorHttp.get({ url });
    if (res.status < 200 || res.status >= 300) {
      const err = new Error(`Status code ${res.status}`);
      err.status = res.status;
      throw err;
    }
    return typeof res.data === 'string' ? res.data : String(res.data ?? '');
  }

  const res = await fetch(`${CORS_PROXY}${url}`);
  if (!res.ok) {
    const err = new Error(`Status code ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.text();
}

export { fetchText };
