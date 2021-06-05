<template>
  <h1 id="header">Salary App</h1>
  <SalariesView v-if="route == 'salaries'" @addSalary="processAddSalary" />
  <LoginRegisterView v-if="route == 'loginRegister'" @login="processLogin" />
  <AddSalaryView
    v-if="route == 'addSalary'"
    @salaryAdded="processSalaryAdded"
  />
  <AdminView v-if="route == 'admin'" />
</template>

<script>
import SalariesView from "./views/SalariesView.vue";
import LoginRegisterView from "./views/LoginRegisterView.vue";
import AddSalaryView from "./views/AddSalaryView.vue";
import AdminView from "./views/AdminView.vue";

export default {
  name: "App",
  data() {
    return {
      route: localStorage.getItem("roleId") === "2" ? "admin" : "salaries",
    };
  },
  components: {
    SalariesView,
    LoginRegisterView,
    AddSalaryView,
    AdminView,
  },
  methods: {
    processAddSalary() {
      if (localStorage.getItem("username")) {
        this.route = "addSalary";
      } else {
        this.route = "loginRegister";
      }
    },
    processSalaryAdded() {
      this.route = "salaries";
    },
    processLogin() {
      let isAdmin = localStorage.getItem("roleId") === "2";
      if (isAdmin) {
        this.route = "admin";
      } else {
        this.route = "addSalary";
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 80%;
  margin: auto;
  margin-top: 60px;
}
#header {
  margin-top: 100px;
  margin-bottom: 100px;
}
</style>
