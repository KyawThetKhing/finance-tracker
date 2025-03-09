export const useCurrency = (amount) => {
  console.log(
    '🚀 ~ useCurrency ~ amount:',
    isRef(amount),
    amount,
    amount.value
  );
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
