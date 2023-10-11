<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="login-container">
          <div class="login-form">
            <img src="/images/horizon_logo.png" alt="logo" class="img_icon" />
              <h5>Create an Account</h5>
              <br />
              <form @submit.prevent="signup">
                <div class="form-group">
                  <label for="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    v-model="name"
                    class="form-control"
                    placeholder="First name and last name"
                    required
                  />
                </div>
                <br />
                <div class="form-group">
                  <label for="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    v-model="username"
                    class="form-control"
                    placeholder="Username"
                    required
                  />
               </div>
               <br />
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  class="form-control"
                  placeholder="Email address"
                  required
                />
              </div>
              <br />
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  class="form-control"
                  placeholder="Password"
                  required
                />
              </div>
              <br />
              <div class="form-group">
                 <label for="confirmPassword">Confirm Password</label>
                 <input
                    type="password"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    class="form-control"
                    placeholder="Confirm Password"
                    required
                />
            </div>
              <br />
              <button type="submit" class="btn btn-login" @click="register">
                Continue
              </button>
              <br />
              or
              <br />
              <div class="text-align">
                <h8 class="text-color"> Already have an account? </h8>
                <h8><router-link to="/login" reload> Sign in</router-link></h8>
                <p><router-link to="/" class="skip-p"> Skip for now</router-link> </p>
              </div>
              <p v-if="errorMessage">{{ errorMessage }}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const name = ref("");
const username = ref("");
const confirmPassword = ref("");
const router = useRouter();
const auth = getAuth(); // Get the auth instance

const register = async () => {
  // Check if the username is unique
  const user = await fetchSignInMethodsForEmail(auth, email.value);
  if (user.length > 0) {
    errorMessage.value = "Email is already in use";
    return;
  }

  // Validate the username and confirm password fields
  if (username.value === "") {
    errorMessage.value = "Username is required";
    return;
  }

  if (confirmPassword.value === "") {
    errorMessage.value = "Confirm password is required";
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match";
    return;
  }

  // Create the user account
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("Successfully registered!");
      router.push("/");
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
</script>


<style scoped>
.container {
  margin-top: 10px;
  padding: 2rem 2rem;
}

.login-form {
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
 text-align: left;
}

.img_icon {
  width: 12rem;
  padding-bottom: 2rem;
}

.google-icon {
  width: 1.5rem;
  margin-right: 1rem;
}

.login-form h2 {
  margin-bottom: 20px;
}

.form-control {
  border-radius: 2rem;
  border-color: gray;

}

.text-align {
  text-align: center;
}

.btn-login  {
  border-radius: 2rem;
  background-color: #FE9F4F;
  color: rgb(255, 255, 255);
  font-size: 1rem;
  font-weight: 500;
}

.btn-google {
  border-radius: 2rem;
  color: #3e3c3c;
  background-color: rgb(231, 231, 231);
  border-color: transparent;
  padding: 0.5rem;
}

.text-align {
  padding: 2rem 2rem;
}

.text-color {
  color: #FE9F4F;
}

.skip-p {
  color: #a9a7a7;
  text-decoration: none;
  font-size: small;
}

</style>
