<template>
  <div id="admin-page">
    <h1>Administration</h1>
    <TabView>
      <TabPanel header="Companies">
        <CompaniesTable />
      </TabPanel>
      <TabPanel header="Users">
        <UsersTable />
      </TabPanel>
      <TabPanel header="Roles"> </TabPanel>
    </TabView>
  </div>
</template>

<script>
import CompaniesTable from "../components/CompaniesTable.vue";
import UsersTable from "../components/UsersTable.vue";

export default {
  components: {
    CompaniesTable,
    UsersTable,
  },
};
</script>

<style></style>
