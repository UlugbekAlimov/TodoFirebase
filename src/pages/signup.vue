<template>
  <form class="d-flex justify-center align-center w-100 h-100" @submit.prevent="submitSignIn">
    <v-card
      style="border-radius: 12px;"
      class="mx-auto pa-8"
      elevation="16"
      width="550"
    >
      <v-card-title>
        <h1>Sign up</h1>
      </v-card-title>
      <div class="d-flex flex-column ga-1">
        <v-text-field
          v-model="email"
          class="pa-0"
          clearable
          label="Email"
          variant="outlined"
          hide-details
          :rules="emailRules"
        ></v-text-field>
        <v-text-field
          v-model="password"
          clearable
          label="Password"
          variant="outlined"
          hide-details
          type="password"
          :rules="passwordRules"
        ></v-text-field>
        <div class="d-flex justify-end align-center">
          <router-link to="/login" style="padding-right: 10px; text-decoration: none; color: blue;">Have an account?</router-link>
          <v-btn @click="submitSignIn" color="gray" style="width: 130px; height: 40px;">
            Submit
          </v-btn>
        </div>
        <div class="pt-4">
          <v-alert v-if="error" type="error">{{ error }}</v-alert>
          <v-alert v-if="success" type="success">{{ success }}</v-alert>
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

    const emailRules = [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ]
    const passwordRules = [
      v => !!v || 'Password is required',
      v => v.length >= 6 || 'Password must be at least 6 characters',
    ]

    const submitSignIn = async () => {
      try {
        const userSave = await createUserWithEmailAndPassword(auth, email.value, password.value)
        const idToken = await userSave.user.getIdToken()
        localStorage.setItem('userToken', idToken)
        success.value = 'SignIn successful'
        router.push('/todos')
        console.log(userSave)
        error.value = ''
      } catch (e) {
        console.error('Error signing in:', e)
        error.value = 'SignIn failed. Please check your credentials.'
        success.value = ''
      }
    }

    return {
      email,
      password,
      emailRules,
      passwordRules,
      error,
      success,
      submitSignIn
    }
  }
}
</script>

<style scoped>

</style>
