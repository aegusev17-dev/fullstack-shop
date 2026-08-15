export const getCategoriesData = (data) => {
  if (data && Array.isArray(data)) {
    const res = {};
    data.forEach((item) => {
      res[item.id] = { title: item.meta.title };
    });
    return res;
  } else {
    return [];
  }
};
