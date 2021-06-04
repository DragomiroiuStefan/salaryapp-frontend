<template>
  <h1 id="title">Salary App</h1>
  <SalariesView v-if="route == 'salaries'" @addSalary="processAddSalary" />
  <LoginRegisterView v-if="route == 'loginRegister'" @login="processLogin"/>
  <AddSalaryView v-if="route == 'addSalary'" />
</template>

<script>
import SalariesView from "./views/SalariesView.vue";
import LoginRegisterView from "./views/LoginRegisterView.vue";
import AddSalaryView from "./views/AddSalaryView.vue";

export default {
  name: "App",
  data() {
    return {
      route: "salaries",
    };
  },
  components: {
    SalariesView,
    LoginRegisterView,
    AddSalaryView,
  },
  methods: {
    processAddSalary() {
      if (localStorage.getItem("username")) {
        this.route = "addSalary"
      } else {
        this.route = "loginRegister";
      }
    },
    processLogin() {
      this.route = "addSalary";
    }
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
#title {
  text-align: center;
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>
