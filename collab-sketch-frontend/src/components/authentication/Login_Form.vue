<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="login-container">
          <div class="login-form">
            <img src="/images/horizon_logo.png" alt="logo" class="img_icon" />
            <h5>Sign in</h5>
            <br />
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="email">Username or Email</label>
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  class="form-control"
                  placeholder="Username"
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
              <button type="submit" class="btn btn-login" @click="login">
                Sign In
              </button>
              <br />
              or
              <br />
               <button @click="signInWithGoogle" class="btn-google">
                <img src="/images/google.png" alt="logo" class="google-icon" />
              Sign In With Google
            </button>
              <div class="text-align">
                <h8 class="text-color"> Don't have an account? </h8>
                <h8><router-link to="/signup" reload>Create account</router-link></h8>
                <p><router-link to="/" class="skip-p"> Skip for now</router-link> </p>
              </div>
            </form>
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
const auth = getAuth();

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
