<script setup>
const email = ref('');
const { signInWithOTP, pending, success } = useAuth();

const handleLogin = () => {
  signInWithOTP(email);
};
</script>
<template>
  <UCard v-if="!success">
    <template #header> Sign-in with OTP </template>
    <form @submit.prevent="handleLogin">
      <UFormGroup label="Email" name="email" class="mb-4" :required="true">
        <UInput type="email" placeholder="Email" required="" v-model="email" />
      </UFormGroup>

      <UButton type="submit" :loading="pending" :disabled="pending">
        Sign-in
      </UButton>
    </form>
  </UCard>
  <UCard v-else>
    <template #header> Email has been sent </template>
    <div class="text-center">
      <p class="mb-4">
        We have sent an email to <strong>{{ email }}</strong> with a link to
        sign-in
      </p>
      <p><strong>Important:</strong> The link will be expir in 5 minutes</p>
    </div>
  </UCard>
</template>
