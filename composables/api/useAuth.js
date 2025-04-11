export const useAuth = () => {
  const supabase = useSupabaseClient();
  const { toastError, toastSuccess } = useAppToast();
  const config = useRuntimeConfig();

  const pending = ref(false);
  const success = ref(false);

  const signInWithOTP = async (email) => {
    try {
      pending.value = true;
      success.value = true;

      const { error } = await supabase.auth.signInWithOtp({
        email: email.value,
        options: {
          emailRedirectTo: config.public.redirectDomain,
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
      toastSuccess({
        title: 'Email sent successfully',
      });
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error(error);
      toastError({
        title: 'Error in signing out',
        description: error.message,
      });
    } finally {
      toastSuccess({
        title: 'Signed out successfully',
      });
      navigateTo('/login');
    }
  };

  return { signOut, signInWithOTP, pending, success };
};
