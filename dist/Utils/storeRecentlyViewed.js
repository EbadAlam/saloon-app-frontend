"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveRecentlyViewedStore = exports.getRecentlyViewedStores = void 0;
const saveRecentlyViewedStore = store => {
  const key = 'recentlyViewedStores';
  let viewed;
  viewed = JSON.parse(localStorage.getItem(key)) || [];
  viewed = viewed.filter(s => s.id !== store.id);
  viewed.unshift(store);
  localStorage.setItem(key, JSON.stringify(viewed));
};
exports.saveRecentlyViewedStore = saveRecentlyViewedStore;
const getRecentlyViewedStores = () => {
  const key = 'recentlyViewedStores';
  return JSON.parse(localStorage.getItem(key)) || [];
};
exports.getRecentlyViewedStores = getRecentlyViewedStores;