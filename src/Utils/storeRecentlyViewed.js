export const saveRecentlyViewedStore = (store) => {
  const key = 'recentlyViewedStores';
  let viewed 

  viewed = JSON.parse(localStorage.getItem(key)) || [];
  viewed = viewed.filter((s) => s.id !== store.id);

  viewed.unshift(store);

  localStorage.setItem(key, JSON.stringify(viewed));
};

export const getRecentlyViewedStores = () => {
  const key = 'recentlyViewedStores';
  return JSON.parse(localStorage.getItem(key)) || [];
};
