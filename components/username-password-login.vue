<script setup>
import * as z from 'zod';

const state = reactive({
  email: '',
  password: '',
});

const { signInWithUsernamePassword, pending } = useAuth();

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const onSubmit = () => {
  signInWithUsernamePassword(state.email, state.password);
};
</script>
<template>
  <UCard>
    <template #header> Sign-in with Username/Password </template>
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

    <p class="text-center mt-4">
      Don't have an account?
      <NuxtLink to="register" class="text-blue-500 cursor-pointer">
        Register
      </NuxtLink>
    </p>
  </UCard>
</template>
