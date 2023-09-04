<template>
  <div>
    <h1>Create an Account</h1>
<p><input type="text" placeholder="Email" v-model="email" /></p>
<p><input type="text" placeholder="Password" v-model="password" /></p>
<p><button @click="signup">Submit</button></p>
<p><button @click="signInWithGoogle">Sign In With Google</button></p>
</template>

<script>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");
const router = useRouter();

const singup = () => {
createUserWithEmailAndPassword(getAuth(), email.value, password.value)
  .then((data) => {
  console.log("Successfully registered!");
  console.log(auth.currentUser);
  router.push('/')
  })
  .catch((error) => {
  console.log(error.code);
  alert(error.message);
  })
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
  .then((result) => {
    console.log(result.user);
    router.push("/");
  })
  .catch((error) => {
    console.log(error.code);
    alert(error.message);
  })
}
</script>
