<script setup>
import { z } from 'zod';
import { transactionViewOptions } from '@/constants';

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const state = ref({
  seletedView:
    user.value.user_metadata?.transaction_view || transactionViewOptions[1],
});
const pending = ref(false);
const { toastSuccess, toastError } = useAppToast();

const schema = z.object({
  seletedView: z.enum(transactionViewOptions),
});

const saveSettings = async () => {
  pending.value = true;
  try {
    const { error } = await supabase.auth.updateUser({
      data: {
        transaction_view: state.value.seletedView,
      },
    });
    if (error) throw error;
    toastSuccess({
      title: 'Settings saved successfully',
      description: 'Your settings have been saved!!',
    });
  } catch (error) {
    toastError({
      title: 'Error saving settings',
      description: error.message,
    });
  } finally {
    pending.value = false;
  }
};
</script>
<template>
  <UForm :state="state" :schema="schema" @submit.prevent="saveSettings">
    <UFormGroup
      label="Transaction View"
      class="mb-4"
      help="Choose how you want to show your transactions"
    >
      <USelect v-model="state.seletedView" :options="transactionViewOptions" />
    </UFormGroup>

    <UButton
      type="submit"
      color="white"
      variant="solid"
      :loading="pending"
      :disabled="pending"
    >
      Save
    </UButton>
  </UForm>
</template>
