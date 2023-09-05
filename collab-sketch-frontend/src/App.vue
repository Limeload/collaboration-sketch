<template>
  <div>
    <nav>
      <router-link to="/"> Home </router-link> |
      <router-link to="/login"> Login </router-link> |
      <span v-if="isLoggedIn">
        <button @click="handleLogOut"> Log Out </button>
      </span> |
      <router-link to="/signup"> Signup </router-link> |
    </nav>

    <router-view />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const router = useRouter();
const isLoggedIn = ref(false);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleLogOut = () => {
  signOut(auth)
    .then(() => {
      router.push("/");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
      // Handle the error (e.g., show an error message)
    });
};
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
