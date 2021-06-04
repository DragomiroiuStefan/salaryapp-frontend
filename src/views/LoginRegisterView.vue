<template>
  <div id="login-register">
    <h1>Login</h1>
    <div class="p-formgrid p-grid">
      <p class="p-error">{{ loginUser.errorMessage }}</p>
      <div class="p-field p-col">
        <label for="username">username: </label>
        <InputText
          id="username"
          type="text"
          v-model="loginUser.username"
          @input="loginUser.errorMessage = null"
        />
      </div>
    </div>
    <div class="p-formgrid p-grid">
      <div class="p-field p-col">
        <label for="password">password: </label>
        <Password
          v-model="loginUser.password"
          :feedback="false"
          @input="loginUser.errorMessage = null"
        />
      </div>
    </div>
    <Button label="Login" id="login-button" @click="login" />
  </div>
  <div id="login-register">
    <h1>Register</h1>
    <div class="p-formgrid p-grid">
      <p class="p-error">{{ registerUser.errorMessage }}</p>
      <div class="p-field p-col">
        <label for="username">username: </label>
        <InputText
          id="username"
          type="text"
          v-model="registerUser.username"
          @input="registerUser.errorMessage = null"
        />
      </div>
    </div>
    <div class="p-formgrid p-grid">
      <div class="p-field p-col">
        <label for="password">password: </label>
        <Password
          v-model="registerUser.password"
          :feedback="false"
          @input="registerUser.errorMessage = null"
        />
      </div>
    </div>
    <div class="p-formgrid p-grid">
      <div class="p-field p-col">
        <label for="username">email: </label>
        <InputText
          id="email"
          type="text"
          v-model="registerUser.email"
          @input="registerUser.errorMessage = null"
        />
      </div>
    </div>
    <Button label="Register" id="login-button" @click="register" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  emits: ["login"],
  data() {
    return {
      loginUser: {
        username: null,
        password: null,
        errorMessage: null,
      },
      registerUser: {
        username: null,
        password: null,
        email: null,
        errorMessage: null,
      },
    };
  },
  methods: {
    login() {
      axios
        .get("http://localhost:8081/salaryapp/user/authenticate", {
          auth: {
            username: this.loginUser.username,
            password: this.loginUser.password,
          },
        })
        .then((response) => {
          localStorage.setItem("username", this.loginUser.username);
          localStorage.setItem("password", this.loginUser.password);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("roleId", response.data.roleId);

          this.$emit("login");
        })
        .catch((err) => {
          this.loginUser.errorMessage = err.response.data.message;
        });
    },
    register() {
      axios
        .post("http://localhost:8081/salaryapp/user/register", {
          username: this.registerUser.username,
          password: this.registerUser.password,
          email: this.registerUser.email,
        })
        .then((response) => {
          localStorage.setItem("username", this.registerUser.username);
          localStorage.setItem("password", this.registerUser.password);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("roleId", response.data.roleId);

          this.$emit("login");
        })
        .catch((err) => {
          this.registerUser.errorMessage = err.response.data.message;
        });
    },
  },
};
</script>

<style scoped>
#login-register {
  width: 20%;
  margin: auto;
  margin-top: 100px;
}
.p-grid {
  margin-bottom: 2%;
}
label {
  margin-right: 2%;
}
#login-button,
h1 {
  margin-left: 40%;
}
</style>
