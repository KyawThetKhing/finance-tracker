<script setup>
import { transactionViewOptions } from '@/constants';

const selectedView = ref(transactionViewOptions[1]);
const transactions = ref([]);
const isLoading = ref(false);

const supabase = useSupabaseClient();

const fetchTransactions = async () => {
  isLoading.value = true;
  try {
    const { data } = await useAsyncData('transactions', async () => {
      const { data, error } = await supabase.from('transactions').select();
      if (error) return [];
      return data;
    });
    return data.value;
  } finally {
    isLoading.value = false;
  }
};

const refreshTransactions = async () => {
  transactions.value = await fetchTransactions();
};
await refreshTransactions();

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
</script>
<template>
  <section class="flex items-center justify-between mb-10">
    <h1 class="text-4xl font-extrabold">Summary</h1>
    <div>
      <USelectMenu v-model="selectedView" :options="transactionViewOptions" />
    </div>
  </section>
  <section
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
  >
    <Trend
      title="Income"
      :amount="1000"
      :previousAmount="800"
      :loading="isLoading"
    />
    <Trend
      title="Expense"
      :amount="200"
      :previousAmount="100"
      :loading="isLoading"
    />
    <Trend
      title="Investments"
      :amount="200"
      :previousAmount="500"
      :loading="isLoading"
    />
    <Trend
      title="Saving"
      :amount="200"
      :previousAmount="150"
      :loading="isLoading"
    />
  </section>
  <section v-if="!isLoading">
    <div
      v-for="(transactionOnDay, date) in transactionsGroupedByDate"
      :key="date"
    >
      <DailyTransactionSummary :date="date" :transactions="transactionOnDay" />
      <Transaction
        v-for="transaction in transactionOnDay"
        :key="transaction.id"
        :transaction="transaction"
        @deleted="refreshTransactions()"
      />
    </div>
  </section>
  <section v-else>
    <USkeleton class="h-8 w-full mb-2" v-for="i in 5" :key="n" />
  </section>
</template>

<style scoped></style>
