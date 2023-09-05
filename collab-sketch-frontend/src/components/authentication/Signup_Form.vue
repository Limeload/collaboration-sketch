<template>
  <div>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();
const auth = getAuth(); // Get the auth instance

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("Successfully registered!");
      router.push('/');
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage.value = "Invalid email";
          break;
        case "auth/weak-password":
          errorMessage.value = "Weak password (at least 6 characters required)";
          break;
        default:
          errorMessage.value = "Email or password was incorrect";
          break;
      }
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user);
      router.push("/");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
}
</script>
