const useLocaleStorage = () => {
  const updateLocaleStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return { updateLocaleStorage };
};

export default useLocaleStorage;
