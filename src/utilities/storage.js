import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

async function setObject(key, object) {
  await Storage.set({
    key,
    value: JSON.stringify(object),
  });
}

async function getObject(key) {
  const ret = await Storage.get({ key });
  return JSON.parse(ret.value);
}

async function setValue(key, value) {
  await Storage.set({
    key,
    value,
  });
}

async function getValue(key) {
  const { value } = await Storage.get({ key });
  return value;
}

async function removeItem(key) {
  await Storage.remove({ key });
}

async function listKeys() {
  const { keys } = await Storage.keys();
  return keys;
}

async function deleteAll() {
  await Storage.clear();
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
