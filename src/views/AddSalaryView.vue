<template>
  <div id="add-salary-form">
    <h1>Add salary</h1>
    <p class="p-error">{{ errorMessage }}</p>
    <div class="p-field">
      <label for="job-title">Job Title</label>
      <InputText id="job-title" type="text" v-model="salary.jobTitle" />
    </div>
    <div class="p-field">
      <label for="job-area">Job Area</label>
      <Dropdown
        id="job-area"
        optionLabel="areaName"
        placeholder="Select a job area"
        v-model="salary.jobArea"
        :options="jobAreas"
      />
    </div>
    <div class="p-field">
      <label for="company">Company</label>
      <Dropdown
        id="company"
        optionLabel="companyName"
        placeholder="Select a company"
        v-model="salary.company"
        :options="companies"
      />
    </div>
    <div class="p-field">
      <label for="location">Location</label>
      <Dropdown
        id="location"
        optionLabel="cityName"
        placeholder="Select a location"
        v-model="salary.city"
        :options="cities"
      />
    </div>
    <div class="p-field">
      <label for="level">Career Level</label>
      <Dropdown
        id="level"
        optionLabel="levelName"
        placeholder="Select a Career Level"
        v-model="salary.level"
        :options="careerLevels"
      />
    </div>
    <div class="p-field">
      <label for="salary">Salary</label>
      <InputNumber id="salary" mode="decimal" v-model="salary.salary" />
    </div>
    <Button label="Submit" @click="addSalary" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  emits: ["salaryAdded"],
  mounted() {
    axios
      .get("http://localhost:8081/salaryapp/jobArea")
      .then((response) => (this.jobAreas = response.data));
    axios
      .get("http://localhost:8081/salaryapp/company")
      .then((response) => (this.companies = response.data));
    axios
      .get("http://localhost:8081/salaryapp/city")
      .then((response) => (this.cities = response.data));
    axios
      .get("http://localhost:8081/salaryapp/careerLevel")
      .then((response) => (this.careerLevels = response.data));
  },
  data() {
    return {
      errorMessage: null,
      salary: {
        jobTitle: null,
        jobArea: null,
        company: null,
        city: null,
        level: null,
        salary: null,
      },
      jobAreas: null,
      companies: null,
      cities: null,
      careerLevels: null,
    };
  },
  methods: {
    addSalary() {
      console.log(this.salary);
      axios
        .post("http://localhost:8081/salaryapp/salary", {
          jobTitle: this.salary.jobTitle,
          areaId: this.salary.jobArea.areaId,
          companyId: this.salary.company.companyId,
          locationId: this.salary.city.cityId,
          levelId: this.salary.level.levelId,
          salary: this.salary.salary,
        })
        .then(() => {
          this.$emit("salaryAdded");
        })
        .catch((err) => {
          this.errorMessage = err.response.data.message;
        });
    },
  },
};
</script>

<style scoped>
#add-salary-form {
  width: min-content;
  margin: auto;
}
label {
  margin-right: 20px;
}
</style>
