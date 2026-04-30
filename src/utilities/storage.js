import { Preferences } from "@capacitor/preferences";


async function setObject(key, object) {
  await Preferences.set({
    key,
    value: JSON.stringify(object),
  });
}

async function getObject(key) {
  const ret = await Preferences.get({ key });
  return JSON.parse(ret.value);
}

async function setValue(key, value) {
  await Preferences.set({
    key,
    value,
  });
}

async function getValue(key) {
  const { value } = await Preferences.get({ key });
  return value;
}

async function removeItem(key) {
  await Preferences.remove({ key });
}

async function listKeys() {
  const { keys } = await Preferences.keys();
  return keys;
}

async function deleteAll() {
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
