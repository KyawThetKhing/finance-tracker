// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/supabase'],
  // future: {
  //   compatibilityVersion: 4,
  // },
  imports: {
    dirs: ['composables/api'],
  },
  supabase: {
    redirect: false,
  },
  runtimeConfig: {
    public: {
      redirectDomain: process.env.REDIRECT_DOMAIN,
      redirectDomainAfterSignUp: process.env.REDIRECT_DOMAIN_AFTER_SIGNUP,
    },
  },
});
