<script setup>
definePageMeta({
  middleware: 'auth',
});
const links = [
  {
    label: 'Profile',
    to: '/settings/profile',
  },
  {
    label: 'Avatar',
    to: '/settings/avatar',
  },
  {
    label: 'Settings',
    to: '/settings/settings',
  },
];
</script>
<template>
  <div class="grid grid-cols-6 gap-8">
    <UVerticalNavigation :links="links" />

    <div class="col-span-4">
      <NuxtPage />
    </div>
  </div>
</template>
