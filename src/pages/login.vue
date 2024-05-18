<template>
  <form class="d-flex justify-center align-center w-100 h-100">
    <v-card
      style="border-radius: 12px"
      class="mx-auto pa-8"
      elevation="16"
      width="550"
    >
      <v-card-title>
        <h1>Login</h1>
      </v-card-title>
      <div class="d-flex flex-column ga-1">
        <v-text-field
          v-model="email"
          class="pa-0"
          clearable
          label="email"
          variant="outlined"
          hide-details
          :rules="emailRules"
        />
        <v-text-field
          v-model="password"
          clearable
          label="password"
          variant="outlined"
          hide-details
          :rules="passwordRules"
        />
        <router-link
          to="/forgotPassword"
          style="padding-right: 10px; text-decoration: none; color: blue"
          >forgot password
        </router-link>
        <div class="d-flex justify-end align-center">
          <router-link
            to="/signup"
            style="padding-right: 10px; text-decoration: none; color: blue"
            >not registered yet ?</router-link
          >
          <v-btn
            @click="submitLogin()"
            color="gray"
            style="width: 130px; height: 40px"
          >
            submit
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
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase.js";
import router from "@/router/index.js";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const success = ref("");
    const error = ref("");

    const emailRules = [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ]
    const passwordRules = [
      v => !!v || 'Password is required',
      v => v.length >= 6 || 'Password must be at least 6 characters',
    ]

    const submitLogin = async () => {
      try {
        const userSave = await signInWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        const idToken = await userSave.user.getIdToken();
        localStorage.setItem("userToken", idToken);
        console.log(userSave);
        success.value = "Login successful!";
        router.push("/todos");
        error.value = "";
      } catch (e) {
        error.value = "Login failed. Please check your credentials.";
        success.value = "";
      }
    };
    return {
      email,
      password,
      error,
      success,
      submitLogin,
      emailRules,
      passwordRules,
    };
  },
};
</script>

<style scoped></style>
