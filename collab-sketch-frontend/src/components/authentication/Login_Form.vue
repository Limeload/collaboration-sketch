<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="login-container">
          <div class="login-form">
            <h2>Login</h2>
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  class="form-control"
                  required
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  class="form-control"
                  required
                />
              </div>
              <button type="submit" class="btn btn-outline-primary btn-block" @click="login">
                Sign In
              </button>
            </form>
            <button @click="signInWithGoogle" class="btn btn-outline-primary btn-block">
              Sign In With Google
            </button>
          </div>
        </div>
      </div>
    </div>
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


<style scoped>
/* Add your custom styles here */
.container {
  margin-top: 50px;
}

.login-container {
  display: flex;
  justify-content: space-between;
}

.login-form {
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.login-form h2 {
  margin-bottom: 20px;
}
</style>
