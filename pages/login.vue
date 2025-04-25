<script setup>
const items = ref([
  {
    label: 'Sign-in with username/password',
    slot: 'username-password',
  },
  {
    label: 'Sign-in with email',
    slot: 'email',
  },
]);
</script>

<template>
  <UTabs :items="items" class="w-[50%] mx-auto" variant="pill">
    <template #username-password="{ item }">
      <UsernamePasswordLogin />
    </template>
    <template #email="{ item }">
      <EmailLogin />
    </template>
  </UTabs>
</template>
<style lang="scss" scoped></style>
