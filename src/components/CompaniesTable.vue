<template>
  <div id="admin-produse">
    <Button
      label="Add company"
      id="new-button"
      icon="pi pi-plus"
      @click="openNew"
    />
    <DataTable
      :value="companies"
      v-model:selection="selectedCompany"
      selectionMode="single"
      dataKey="companyId"
      class="p-datatable-sm"
    >
      <Column field="companyName" header="Company Name"></Column>
      <Column field="headquarters" header="Headquarters"></Column>
      <Column field="founded" header="Founded"></Column>
      <Column field="noOfEmployees" header="No. of employees"></Column>
      <Column field="website" header="Website"></Column>
      <Column :exportable="false">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success p-mr-2"
            @click="editCompany(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="confirmDeleteCompany(slotProps.data)"
          />
        </template>
      </Column>

      <Dialog
        v-model:visible="companyDialog"
        :style="{ width: '450px' }"
        header="Company Information"
        :modal="true"
        class="p-fluid"
      >
        <div class="p-field">
          <label for="companyName">Company Name</label>
          <InputText
            id="companyName"
            v-model.trim="company.companyName"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !company.companyName }"
          />
          <small class="p-error" v-if="submitted && !company.companyName"
            >Company Name required</small
          >
        </div>
        <div class="p-field">
          <label for="headquarters">Headquarters</label>
          <Dropdown
            id="headquarters"
            optionLabel="cityName"
            placeholder="Select a location"
            v-model="headquarters"
            :options="cities"
          />
        </div>
        <div class="p-field">
          <label for="founded">Founded</label>
          <Calendar
            id="founded"
            v-model="company.founded"
            dateFormat="yy-mm-dd"
          />
        </div>
        <div class="p-field">
          <label for="noOfEmployees">No. of employees</label>
          <InputNumber
            id="noOfEmployees"
            v-model="company.noOfEmployees"
            mode="decimal"
          />
        </div>
        <div class="p-field">
          <label for="website">Website</label>
          <InputText id="website" v-model.trim="company.website" />
        </div>

        <template #footer>
          <Button
            label="Cancel"
            icon="pi pi-times"
            class="p-button-text"
            @click="hideDialog"
          />
          <Button
            label="Save"
            icon="pi pi-check"
            class="p-button-text"
            @click="saveCompany"
          />
        </template>
      </Dialog>

      <Dialog
        v-model:visible="deleteCompanyDialog"
        :style="{ width: '450px' }"
        header="Confirm"
        :modal="true"
      >
        <div class="confirmation-content">
          <i
            class="pi pi-exclamation-triangle p-mr-3"
            style="font-size: 2rem"
          />
          <span v-if="company"
            >Delete company <b>{{ company.companyName }}</b
            >?</span
          >
        </div>
        <template #footer>
          <Button
            label="No"
            icon="pi pi-times"
            class="p-button-text"
            @click="deleteCompanyDialog = false"
          />
          <Button
            label="Yes"
            icon="pi pi-check"
            class="p-button-text"
            @click="deleteCompany"
          />
        </template>
      </Dialog>
    </DataTable>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      companies: [],
      cities: [],
      headquarters: null,
      companyDialog: false,
      deleteCompanyDialog: false,
      company: {},
      selectedCompany: null,
      submitted: false,
      edit: null,
    };
  },
  mounted() {
    axios
      .get("http://localhost:8081/salaryapp/company")
      .then((response) => (this.companies = response.data));
    axios
      .get("http://localhost:8081/salaryapp/city")
      .then((response) => (this.cities = response.data));
  },
  methods: {
    openNew() {
      this.company = {};
      this.submitted = false;
      this.companyDialog = true;
      this.edit = false;
    },
    editCompany(company) {
      this.company = { ...company };
      for (let i = 0; i < this.cities.length; i++) {
        if (this.cities[i].cityName === this.company.headquarters) {
          this.headquarters = this.cities[i];
        }
      }
      this.companyDialog = true;
      this.edit = true;
    },
    confirmDeleteCompany(company) {
      this.company = company;
      this.deleteCompanyDialog = true;
    },
    hideDialog() {
      this.companyDialog = false;
      this.submitted = false;
    },
    saveCompany() {
      this.submitted = true;

      if (typeof this.company.founded !== "string") {
        this.company.founded = this.company.founded
          .toISOString()
          .substring(0, 10);
      }

      if (this.company.companyName.trim()) {
        if (this.edit) {
          axios.put(
            "http://localhost:8081/salaryapp/company/" + this.company.companyId,
            {
              companyName: this.company.companyName,
              headquarters: this.headquarters.cityId,
              founded: this.company.founded,
              noOfEmployees: this.company.noOfEmployees,
              website: this.company.website,
            }
          );

          this.company.headquarters = this.headquarters.cityName;
          for (let i = 0; i < this.companies.length; i++) {
            if (this.companies[i].companyId === this.company.companyId) {
              this.companies[i] = this.company;
            }
          }

          this.companyDialog = false;
          this.company = {};
        } else {
          axios
            .post("http://localhost:8081/salaryapp/company", {
              companyName: this.company.companyName,
              headquarters: this.headquarters.cityId,
              founded: this.company.founded,
              noOfEmployees: this.company.noOfEmployees,
              website: this.company.website,
            })
            .then((response) => {
              this.company.companyId = response.data.companyId;
              this.company.headquarters = this.headquarters.cityName;
              this.companies.push(this.company);

              this.companyDialog = false;
              this.company = {};
            });
        }
      }
    },
    deleteCompany() {
      axios.delete(
        "http://localhost:8081/salaryapp/company/" + this.company.companyId
      );

      this.companies = this.companies.filter(
        (val) => val.companyId !== this.company.companyId
      );
      this.deleteCompanyDialog = false;
      this.company = {};
    },
  },
};
</script>

<style scoped>
#new-button {
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
