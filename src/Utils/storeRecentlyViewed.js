// export const saveRecentlyViewedStore = (store) => {
//   const key = 'recentlyViewedStores';
//   let viewed 

//   viewed = JSON.parse(localStorage.getItem(key)) || [];
//   viewed = viewed.filter((s) => s.id !== store.id);

//   viewed.unshift(store);

//   localStorage.setItem(key, JSON.stringify(viewed));
// };

// export const getRecentlyViewedStores = () => {
//   const key = 'recentlyViewedStores';
//   return JSON.parse(localStorage.getItem(key)) || [];
// };
const KEY = 'recentlyViewedStores';
const MAX = 10;

export const saveRecentlyViewedStore = (storeId) => {
  let ids = JSON.parse(localStorage.getItem(KEY)) || [];
  ids = ids.filter((id) => id !== storeId);
  ids.unshift(storeId);
  if (ids.length > MAX) ids = ids.slice(0, MAX);
  localStorage.setItem(KEY, JSON.stringify(ids));
};

export const getRecentlyViewedStoreIds = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};