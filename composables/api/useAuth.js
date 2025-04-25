export const useAuth = () => {
  const supabase = useSupabaseClient();
  const { toastError, toastSuccess } = useAppToast();
  const config = useRuntimeConfig();

  const pending = ref(false);
  const success = ref(false);
  const router = useRouter();

  const signUpWithUsernamePassword = async (email, password) => {
    try {
      pending.value = true;
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: config.public.redirectDomainAfterSignUp,
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
      success.value = true;
    }
  };

  const signInWithUsernamePassword = async (email, password) => {
    console.log(
      '🚀 ~ useAuth.js:32 ~ signInWithUsernamePassword ~ email, password:',
      email,
      password
    );
    try {
      pending.value = true;
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log(
        '🚀 ~ useAuth.js:38 ~ signInWithUsernamePassword ~ error:',
        error
      );

      if (error) {
        toastError({
          title: 'Error authenicating',
          description: error.message,
        });
      } else {
        pending.value = false;
        toastSuccess({
          title: 'Login successfully',
        });
        router.replace('/');
      }
    } finally {
      pending.value = false;
    }
  };

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

  return {
    pending,
    success,
    signOut,
    signInWithOTP,
    signInWithUsernamePassword,
    signUpWithUsernamePassword,
  };
};
