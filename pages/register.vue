<script setup>
import * as z from 'zod';

const state = reactive({
  email: '',
  password: '',
});

const { signUpWithUsernamePassword, pending, success } = useAuth();

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const onSubmit = () => {
  signUpWithUsernamePassword(state.email, state.password);
};
</script>
<template>
  <UCard class="w-[50%] mx-auto" v-if="!success">
    <template #header> Create New Account </template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <UButton type="submit" :disabled="pending" :loading="pending">
        Submit
      </UButton>
    </UForm>
  </UCard>
  <UCard v-else>
    <template #header> Account created successfully </template>
    <div class="text-center">
      <p class="mb-4">
        We have sent an email to <strong>{{ state.email }}</strong> with a link
        to confirm your account
      </p>
      <p><strong>Important:</strong> The link will be expir in 5 minutes</p>
    </div>
  </UCard>
</template>
