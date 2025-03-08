<script setup>
import { transactionViewOptions } from '@/constants';

const selectedView = ref(transactionViewOptions[1]);
const isOpen = ref(false);
const { current, previous } = useSelectedTimePeriod(selectedView);

const {
  refresh,
  pending,
  transactions: {
    incomeCount,
    expenseCount,
    incomeTotal,
    expenseTotal,
    grouped: { byDate },
  },
} = useFetchTransactions(current);

const {
  refresh: refreshPrevious,
  transactions: {
    incomeTotal: previousIncomeTotal,
    expenseTotal: previousExpenseTotal,
  },
} = useFetchTransactions(previous);

// await Promise.all([refresh(), refreshPrevious()]);
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
      :amount="incomeTotal"
      :previousAmount="previousIncomeTotal"
      :loading="pending"
    />
    <Trend
      title="Expense"
      :amount="expenseTotal"
      :previousAmount="previousExpenseTotal"
      :loading="pending"
    />
    <Trend
      title="Investments"
      :amount="200"
      :previousAmount="500"
      :loading="pending"
    />
    <Trend
      title="Saving"
      :amount="200"
      :previousAmount="150"
      :loading="pending"
    />
  </section>
  <section class="flex justify-between mb-10">
    <div>
      <h2 class="text-2xl font-extrabold">Transactions</h2>
      <div class="text-gray-500 dark:text-gray-400">
        You have {{ incomeCount }} incomes and {{ expenseCount }} expenses this
        period
      </div>
    </div>
    <div>
      <TransactionModel v-model="isOpen" @saved="refresh()" />
      <UButton
        icon="i-heroicons-plus-circle"
        color="white"
        variant="solid"
        label="Add"
        @click="isOpen = true"
      />
    </div>
  </section>
  <section v-if="!pending">
    <div v-for="(transactionOnDay, date) in byDate" :key="date">
      <DailyTransactionSummary :date="date" :transactions="transactionOnDay" />
      <Transaction
        v-for="transaction in transactionOnDay"
        :key="transaction.id"
        :transaction="transaction"
        @deleted="refresh()"
      />
    </div>
  </section>
  <section v-else>
    <USkeleton class="h-8 w-full mb-2" v-for="i in 5" :key="n" />
  </section>
</template>

<style scoped></style>
