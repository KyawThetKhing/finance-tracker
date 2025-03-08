export const useFetchTransactions = () => {
  const supabase = useSupabaseClient();
  const transactions = ref([]);
  const pending = ref(false);

  const fetchTransactions = async () => {
    pending.value = true;
    try {
      const { data } = await useAsyncData('transactions', async () => {
        const { data, error } = await supabase
          .from('transactions')
          .select()
          .order('created_at', { ascending: false });
        if (error) return [];
        return data;
      });
      return data.value;
    } finally {
      pending.value = false;
    }
  };

  const refresh = async () => {
    transactions.value = await fetchTransactions();
  };

  const income = computed(() =>
    transactions.value.filter((t) => t.type === 'Income')
  );
  const expense = computed(() =>
    transactions.value.filter((t) => t.type === 'Expense')
  );

  const incomeCount = computed(() => income.value.length);
  const expenseCount = computed(() => expense.value.length);

  const incomeTotal = computed(() =>
    income.value.reduce(
      (total, transaction) => (total += transaction.amount),
      0
    )
  );
  const expenseTotal = computed(() =>
    expense.value.reduce(
      (total, transaction) => (total += transaction.amount),
      0
    )
  );

  const transactionsGroupedByDate = computed(() => {
    const groupedByDate = transactions.value.reduce((acc, transaction) => {
      let date = new Date(transaction.created_at).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    }, {});
    return groupedByDate;
  });

  return {
    transactions: {
      all: transactions,
      grouped: {
        byDate: transactionsGroupedByDate,
      },
      income,
      expense,
      incomeCount,
      expenseCount,
      incomeTotal,
      expenseTotal,
    },
    refresh,
    pending,
  };
};
