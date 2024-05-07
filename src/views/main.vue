<template>
  <signup></signup>
  <login></login>
  <forgotPassword></forgotPassword>
</template>

<script>
import signup from '@/pages/signup.vue';
import login from '@/pages/login.vue';
import forgotPassword from '@/pages/forgotPassword.vue';
export default {
  components:{
    signup,
    login,
    forgotPassword
  }
}
</script>

<style>

</style>