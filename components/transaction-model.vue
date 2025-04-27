<script setup>
import { z } from 'zod';
import { categories, types } from '@/constants';
const isOpen = defineModel();
const emit = defineEmits(['saved']);
const isLoading = ref(false);
const { saveTransaction } = useTransactions();

const props = defineProps({
  transaction: {
    type: Object,
    required: false,
  },
});
const isEditing = computed(() => !!props.transaction);
const initialState = isEditing.value
  ? {
      type: props.transaction.type,
      amount: props.transaction.amount,
      created_at: props.transaction.created_at.split('T')[0],
      description: props.transaction.description,
      category: props.transaction.category,
    }
  : {
      type: undefined,
      amount: 0,
      created_at: undefined,
      description: undefined,
      category: undefined,
    };

const state = ref({ ...initialState });

const resetForm = () => {
  state.value = { ...initialState };
};

const form = ref();

const defaultSchema = z.object({
  created_at: z.string(),
  description: z.string().optional(),
  amount: z.number().positive('Amount must be greater than 0'),
});
const incomeSchema = z.object({
  type: z.literal('Income'),
});
const expenseSchema = z.object({
  type: z.literal('Expense'),
  category: z.enum(categories),
});
const investmentSchema = z.object({
  type: z.literal('Investment'),
});
const savingSchema = z.object({
  type: z.literal('Saving'),
});
const schema = z.intersection(
  z.discriminatedUnion('type', [
    incomeSchema,
    expenseSchema,
    investmentSchema,
    savingSchema,
  ]),
  defaultSchema
);

const save = async () => {
  if (form.value.errors.length > 0) return;
  saveTransaction(state, props.transaction.id);
  isOpen.value = false;
  emit('saved');
};

watch(isOpen, (newVal) => {
  if (!newVal) resetForm();
});
</script>
<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        {{ isEditing ? 'Edit Transaction' : 'Add Transaction' }}
      </template>
      <UForm :state="state" :schema="schema" ref="form" @submit.prevent="save">
        <UFormGroup
          required="true"
          label="Transaction Type"
          name="type"
          class="mb-4"
        >
          <USelect
            placeholder="Transaction Type"
            :options="types"
            :disabled="isEditing"
            v-model="state.type"
          />
        </UFormGroup>

        <UFormGroup label="Amount" :required="true" name="amount" class="mb-4">
          <UInput
            type="number"
            placeholder="Amount"
            v-model.number="state.amount"
          />
        </UFormGroup>
        <UFormGroup
          label="Transaction date"
          :required="true"
          name="created_at"
          class="mb-4"
        >
          <UInput
            type="date"
            icon="i-heroicons-calendar-days-20-solid"
            v-model="state.created_at"
          />
        </UFormGroup>
        <UFormGroup
          label="Description"
          hint="Optional"
          name="description"
          class="mb-4"
        >
          <UTextarea placeholder="Description" v-model="state.description" />
        </UFormGroup>
        <UFormGroup
          required="true"
          label="Category"
          name="category"
          class="mb-4"
          v-if="state.type === 'Expense'"
        >
          <USelect
            placeholder="Category"
            :options="categories"
            v-model="state.category"
          />
        </UFormGroup>

        <UButton
          type="submit"
          color="black"
          variant="solid"
          label="Save"
          :loading="isLoading"
        />
      </UForm>
    </UCard>
  </UModal>
</template>
