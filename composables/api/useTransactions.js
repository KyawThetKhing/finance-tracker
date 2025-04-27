export const useTransactions = (period) => {
  console.log('🚀 ~ useTransactions.js:2 ~ useTransactions ~ period:', period);
  const supabase = useSupabaseClient();
  const transactions = ref([]);
  const pending = ref(false);
  const { toastError, toastSuccess } = useAppToast();

  const fetchTransactions = async () => {
    pending.value = true;
    try {
      const { data } = await useAsyncData(
        `transactions-${period.value.from.toDateString()}-${period.value.to.toDateString()}`,
        async () => {
          const { data, error } = await supabase
            .from('transactions')
            .select()
            .gte('created_at', period.value.from.toISOString())
            .lte('created_at', period.value.to.toISOString())
            .order('created_at', { ascending: false });
          if (error) return [];
          console.log('🚀 ~ useTransactions.js:15 ~ error:', error);

          return data;
        }
      );
      console.log(
        '🚀 ~ useTransactions.js:11 ~ fetchTransactions ~ data:',
        data.value
      );

      return data.value;
    } finally {
      pending.value = false;
    }
  };

  const refresh = async () => {
    console.log('🚀 ~ useTransactions.js:30 ~ refresh ~ period:');
    transactions.value = await fetchTransactions();
  };
  watch(period, async () => await refresh());

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
      let date = transaction.created_at.split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    }, {});
    return groupedByDate;
  });

  const saveTransaction = async (state, id) => {
    console.log('🚀 ~ useTransactions.js:69 ~ saveTransaction ~ state:', state);
    pending.value = true;
    try {
      const { error } = await supabase
        .from('transactions')
        .upsert({ ...state.value, id });

      if (!error) {
        toastSuccess({
          title: 'Transaction saved successfully',
        });
        return;
      }
      throw error;
    } catch (e) {
      toastError({
        title: 'Transaction not saved',
        description: e.message,
      });
    } finally {
      pending.value = false;
    }
  };

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
    saveTransaction,
  };
};
