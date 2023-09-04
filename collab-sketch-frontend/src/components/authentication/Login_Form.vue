<template>
  <div>
    <h1> Sign In to an Account</h1>
<p><input type="text" placeholder="Email" v-model="email" /></p>
<p><input type="text" placeholder="Password" v-model="password" /></p>
<p v-if="errorMessage">{{ errorMessage }}</p>
<p><button @click="login">Submit</button></p>
<p><button @click="signInWithGoogle">Sign In With Google</button></p>
</template>

<script>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");
const errorMessage = ref();
const router = useRouter();

const login = () => {
signInWithEmailAndPassword(getAuth(), email.value, password.value)
  .then((data) => {
  console.log("Successfully signed in!");
  router.push('/)
  })
  .catch((error) => {
  console.log(error.code);
  switch (error.code) {
  case "auth/invalid-email":
  errorMessage.value = "Invalid email";
  break;
  case "auth/invalid-password":
  errorMessage.value = "Invalid password";
  break;
  case "auth/wrong-password":
  errorMessage.value = "Incorrect password";
  break;
  default:
  errorMessage.value = " Email or password was incorrect"
  break;
  }
  })
};

const signInWithGoogle = () => {
}
</script>
