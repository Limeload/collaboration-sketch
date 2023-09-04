<template>
<nav>
<router-link to="/"> Home </router-link> |
<router-link to="/login"> Login </router-link> |
<button @click="handleLogOut" v-if="isLoggedIn"> Log Out </button>
<router-link to="/signup"> Signup </router-link> |
</nav>
  <router-view />
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const router = useRouter();
const isLoggedIn = ref(false);

let auth;
onMounted(() => {
auth = getAuth():
onAuthStateChanged(auth, (user) => {
if (user) {
isLoggedIn.value = true;
} else {
isLoggedIn.value = false;
}
});
});

const handleLogOut = () => {
signOut(auth).then(() => {
router.push("/");
});
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
