<template>
  <v-form class="d-flex justify-center align-center w-100 h-100">
    <v-card
      style="border-radius: 12px"
      class="mx-auto pa-8"
      elevation="16"
      width="550"
    >
      <v-card-title>
        <h1>Reset password</h1>
      </v-card-title>

      <div class="d-flex flex-column ga-4">
        <v-text-field
          v-model="email"
          class="pa-0"
          clearable
          label="Email"
          variant="outlined"
          hide-details
          :rules="passwordRules"
        ></v-text-field>
        <router-link
          to="/login"
          style="padding-right: 10px; text-decoration: none; color: blue"
          >Back to login</router-link
        >
      </div>
      <div class="pt-4">
        <v-alert v-if="error" type="error">{{ error }}</v-alert>
        <v-alert v-if="success" type="success">{{ success }}</v-alert>
      </div>
      <div class="d-flex justify-end align-center">
        <v-btn @click="resetPass()">Reset Password</v-btn>
      </div>
    </v-card>
  </v-form>
</template>

<script>
import { ref } from "vue";
import { auth } from "@/firebase.js";
import { sendPasswordResetEmail } from "firebase/auth";
import router from "@/router/index";

export default {
  setup() {
    const email = ref("");
    const success = ref("");
    const error = ref("");

    const passwordRules = [
      v => !!v || 'Password is required',
      v => v.length >= 6 || 'Password must be at least 6 characters',
    ]

    const resetPass = async () => {
      try {
        await sendPasswordResetEmail(auth, email.value);
        success.value = "SignIn successful!";
        error.value = "";
        router.push("/login");
      } catch (e) {
        error.value = "SignIn failed. Please check your credentials.";
        success.value = "";
      }
    };
    return {
      email,
      success,
      error,
      resetPass,
      passwordRules
    };
  },
};
</script>
