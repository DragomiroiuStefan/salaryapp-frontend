<template>
  <h1>Salary App</h1>
  <Button
    label="Add salary"
    id="new-button"
    icon="pi pi-plus"
    @click="addSalary"
  />
  <DataTable
    :value="salaries"
    class="p-datatable-sm"
    :paginator="true"
    :rows="20"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 50]"
    responsiveLayout="scroll"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
  >
    <Column field="jobTitle" header="Job Title" :sortable="true"></Column>
    <Column field="areaName" header="Area Name" :sortable="true"></Column>
    <Column field="companyName" header="Company" :sortable="true"></Column>
    <Column field="cityName" header="City" :sortable="true"></Column>
    <Column field="levelName" header="Level" :sortable="true"></Column>
    <Column field="added" header="Added" :sortable="true"></Column>
    <Column field="salary" header="Salary" :sortable="true">
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.salary) }}
      </template>
    </Column>
  </DataTable>
</template>

<script>
// import SalariesTable from "../components/SalariesTable.vue";
import axios from "axios";

export default {
  components: {
    // SalariesTable,
  },
  mounted() {
    axios
      .get("http://localhost:8081/salaryapp/salary")
      .then((response) => (this.salaries = response.data));
  },
  data() {
    return {
      salaries: [],
    };
  },
  methods: {
    addSalary() {},
    formatCurrency(value) {
      return value + " RON"
    },
  },
};
</script>

<style scoped></style>
