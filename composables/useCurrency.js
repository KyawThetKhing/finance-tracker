export const useCurrency = (amount) => {
  const currency = computed(() =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(isRef(amount) ? amount.value : amount)
  );
  return {
    currency,
  };
};
