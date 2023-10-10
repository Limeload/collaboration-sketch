<template>
  <nav class="navbar">
    <div class="navbar-left">
     <router-link to="/login"><img src="/images/logo.png" alt="Logo" /></router-link>
     <span v-if="isLoggedIn">
      <h8> What's up today, <b>{{ currentUser }}</b>?</h8>
     </span>
    </div>
    <div class="navbar-right">
      <ul>
        <li>
          <router-link to="/boards">
          <button class="btn btn-board"> ▭ Boards </button>
          </router-link>
        </li>
        <li>
          <router-link to="/notification">
          <img src="/images/notification.png" alt="Notification" class="icon_img" />
          </router-link>
        </li>
        <li>
          <router-link to="/settings">
          <img src="/images/settings.png" alt="Settings" class="icon_img" />
          </router-link>
        </li>
        <li>
          <span v-if="isLoggedIn">
        <button @click="handleLogOut" class="btn-logout"> Log Out </button>
      </span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script >
export default {
  name: 'NavBar',
};
</script>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const router = useRouter();
const isLoggedIn = ref(false);
const currentUser = ref(null);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
      currentUser.value = user.displayName;
    } else {
      isLoggedIn.value = false;
      currentUser.value = null;
    }
  });
});

const handleLogOut = () => {
  signOut(auth)
    .then(() => {
      router.push("/login");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
      // Handle the error (e.g., show an error message)
    });
};
</script>

<style scoped>

.navbar {
  margin-right: 4rem;
  margin-left: 4rem;
  background-color: #fff;
  border-bottom: 1px solid #e7e7e7;
}

.navbar-left {
  float: left;
}

.navbar-right {
  float: right;
}

.icon_img {
  width: 2rem;
}

.btn-board {
   border-radius: 2rem;
   background-color: #FE9F4F;
   color: rgb(255, 255, 255);
   font-size: 0.75rem;
   font-weight: 500;
   padding: 0.5rem 0.75rem;
}

.navbar-left img {
  height: 30px;
}

.navbar-right ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.navbar-right li {
  display: inline-block;
}

.navbar-right a {
  display: inline-block;
  padding: 0.5rem 1rem;
  text-decoration: none;
}

.navbar-right a:hover {
  background-color: #eee;
}

.navbar-right a.active {
  color: #fff;
}

.btn-logout {
border-radius: 2rem;
background-color: #eee;
border-color: transparent;
font-size: 0.75rem;

}
</style>
