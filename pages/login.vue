<script setup>
const success = ref(false);
const email = ref('');
const pending = ref(false);
const { toastError } = useAppToast();
const supabase = useSupabaseClient();

const handleLogin = async () => {
  pending.value = true;
  success.value = true;

  try {
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: 'http://localhost:3000/confirm',
      },
    });

    if (error) {
      toastError({
        title: 'Error authenicating',
        description: error.message,
      });
    } else {
      pending.value = false;
    }
  } finally {
    pending.value = false;
  }
};
</script>
<template>
  <UCard v-if="!success">
    <template #header> Sign-in to Finance Tracker </template>
    <form @submit.prevent="handleLogin">
      <UFormGroup label="Email" name="email" class="mb-4" :required="true">
        <UInput type="email" placeholder="Email" required="" v-model="email" />
      </UFormGroup>

      <UButton
        type="submit"
        variant="solid"
        color="black"
        :loading="pending"
        :disabled="pending"
      >
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
<style lang="scss" scoped></style>
