import { Capacitor, CapacitorHttp } from '@capacitor/core';

// TODO switch this for my own self hosted version
const CORS_PROXY = 'https://proxy.corsfix.com/?';

class HttpStatusError extends Error {
  status: number;
  constructor(status: number) {
    super(`Status code ${status}`);
    this.status = status;
    this.name = 'HttpStatusError';
  }
}

async function fetchText(url: string): Promise<string> {
  if (Capacitor.isNativePlatform()) {
    const res = await CapacitorHttp.get({ url });
    if (res.status < 200 || res.status >= 300) {
      throw new HttpStatusError(res.status);
    }
    return typeof res.data === 'string' ? res.data : String(res.data ?? '');
  }

  const res = await fetch(`${CORS_PROXY}${url}`);
  if (!res.ok) {
    throw new HttpStatusError(res.status);
  }
  return res.text();
}

export { fetchText, HttpStatusError };
