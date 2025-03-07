<script setup>
import { categories, types } from '@/constants';
const model = defineModel();
</script>
<template>
  <UModal v-model="model">
    <UCard>
      <template #header> Add Transaction </template>
      <UFormGroup
        required="true"
        label="Transaction Type"
        name="type"
        class="mb-4"
      >
        <USelect placeholder="Transaction Type" :options="types" />
      </UFormGroup>

      <UFormGroup label="Amount" :required="true" name="amount" class="mb-4">
        <UInput type="number" placeholder="Amount" />
      </UFormGroup>
      <UFormGroup
        label="Transaction date"
        :required="true"
        name="created_at"
        class="mb-4"
      >
        <UInput type="date" icon="i-heroicons-calendar-days-20-solid" />
      </UFormGroup>
      <UFormGroup
        label="Description"
        hint="Optional"
        name="description"
        class="mb-4"
      >
        <UTextarea placeholder="Description" />
      </UFormGroup>
      <UFormGroup required="true" label="Category" name="category" class="mb-4">
        <USelect placeholder="Category" :options="categories" />
      </UFormGroup>

      <UButton type="submit" color="black" variant="solid" label="Save" />
    </UCard>
  </UModal>
</template>
