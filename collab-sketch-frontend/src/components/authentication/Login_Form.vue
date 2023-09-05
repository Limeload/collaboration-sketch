<template>
  <div>
    <h1> Sign In to an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p><button @click="login">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();
const auth = getAuth(); // Get the auth instance

const login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("Successfully signed in!");
      router.push('/');
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage.value = "Invalid email";
          break;
        case "auth/wrong-password":
          errorMessage.value = "Incorrect password";
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
