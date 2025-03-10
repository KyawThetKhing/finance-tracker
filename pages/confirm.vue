<script setup>
const { user } = useRedirectIfAuthenicated('/');
</script>
<template>
  <UCard>
    <template #header> Signing In... </template>
    Wait a moment while we sign you in
  </UCard>
</template>
