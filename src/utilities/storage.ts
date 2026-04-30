import { Preferences } from '@capacitor/preferences';

async function setObject(key: string, object: unknown): Promise<void> {
  await Preferences.set({
    key,
    value: JSON.stringify(object),
  });
}

async function getObject<T = unknown>(key: string): Promise<T | null> {
  const { value } = await Preferences.get({ key });
  return value ? (JSON.parse(value) as T) : null;
}

async function setValue(key: string, value: string): Promise<void> {
  await Preferences.set({ key, value });
}

async function getValue(key: string): Promise<string | null> {
  const { value } = await Preferences.get({ key });
  return value;
}

async function removeItem(key: string): Promise<void> {
  await Preferences.remove({ key });
}

async function listKeys(): Promise<string[]> {
  const { keys } = await Preferences.keys();
  return keys;
}

async function deleteAll(): Promise<void> {
  await Preferences.clear();
}

export {
  setObject,
  getObject,
  setValue,
  getValue,
  removeItem,
  listKeys,
  deleteAll,
};
