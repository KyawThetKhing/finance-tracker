export const useRedirectIfAuthenicated = (url = '/') => {
  const user = useSupabaseUser();

  watch(
    user,
    (user) => {
      if (user) {
        return navigateTo(url);
      }
    },
    { immediate: true }
  );

  return { user };
};
