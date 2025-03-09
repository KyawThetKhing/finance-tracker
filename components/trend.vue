<script setup>
const props = defineProps({
  title: String,
  amount: Number,
  previousAmount: Number,
  color: String,
  loading: Boolean,
});

const { amount } = toRefs(props);

const trendingUp = computed(() => amount.value >= props.previousAmount);
const icon = computed(() =>
  trendingUp.value
    ? 'i-heroicons-arrow-trending-up'
    : 'i-heroicons-arrow-trending-down'
);
const { currency } = useCurrency(amount);

const percentageTrend = computed(() => {
  if (props.previousAmount === 0) {
    return props.amount === 0 ? '0%' : '∞%';
  }

  const change =
    ((props.amount - props.previousAmount) / props.previousAmount) * 100;
  return `${Math.ceil(change)}%`;
});
</script>
<template>
  <div>
    <div class="font-bold" :class="[color]">{{ title }}</div>

    <div class="text-2xl font-extrabold text-black dark:text-white mb-2">
      <USkeleton class="h-8 w-full" v-if="loading" />
      <span v-else>{{ currency }}</span>
    </div>

    <div>
      <USkeleton class="h-6 w-full" v-if="loading" />
      <div v-else class="flex space-x-1 items-center text-sm">
        <UIcon
          :name="icon"
          class="w-6 h-6"
          :class="{ green: trendingUp, red: !trendingUp }"
        />
        <div class="text-gray-500 dark:text-gray-400">
          {{ percentageTrend }} vs last period
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.green {
  @apply text-green-600 dark:text-green-400;
}
.red {
  @apply text-red-600 dark:text-red-400;
}
</style>
