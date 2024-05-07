<template>
  <form class="d-flex justify-center align-center w-100 h-100">
    <v-card
      style="border-radius: 12px;"
      class=" mx-auto pa-8"
      elevation="16"
      width="550"
      >
        <v-card-title>
           <h1>Sign up</h1>
        </v-card-title>
        <div class="d-flex flex-column ga-1">
          <v-text-field v-model="email" class="pa-0" clearable label="email" variant="outlined" hide-details></v-text-field>
          <v-text-field v-model="password" clearable label="password" variant="outlined" hide-details></v-text-field>
        
        <div class="d-flex justify-end align-center">
          <router-link to="/login" style="padding-right: 10px; text-decoration: none; color: blue;">Have an account ?</router-link>
          <v-btn @click="submiSignIn()" color="gray" style="width: 130px; height: 40px;">
            submit
          </v-btn>
        </div>
      </div>
    </v-card>
  </form>
</template>

<script>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase.js'
import router from '@/router/index'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const success = ref('')
    const error = ref('')

    const submiSignIn = async () => {
      try {
        const userSave = await createUserWithEmailAndPassword(auth, email.value, password.value)
        const idToken = await userSave.user.getIdToken()
        localStorage.setItem('userToken', idToken)
        success.value = 'SignIn successful'
        router.push('/todos')
        console.log(userSave);
        error.value = ''
      } catch (e) {
        error.value = 'SignIn failed. Please check your credentials.'
        success.value = ''
      }
    }
    return {
      email,
      password,
      error,
      success,
      submiSignIn
    }
  }
}
</script>

<style scoped>

</style>
