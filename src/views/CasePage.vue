<template>
  <div>
    <v-card class="pa-0" elevation="10">
      <v-card-title class="elevation-5 primary white--text headline">
        Case: {{ caseData.name }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-card-subtitle>
              Popis: {{ caseData.description }} <br>
              Hodnota: {{ caseData.value }} Kč
            </v-card-subtitle>
          </v-col>
          <v-col cols="6">
            <v-card v-for="caseUser in caseData.caseUsers" v-bind:key="caseUser.id" class="mb-3">
              <v-card-title class="warning white--text headline">
                Jméno uživatele: {{ caseUser.user.fullName }}
              </v-card-title>
              <v-card-text class="mt-3">
                Čas: {{ new Date(caseUser.createdAt) }} <br>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error">
          zablokovat bednu
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>

import {HTTP} from "@/HTTP";

export default {
  name: 'Home',
  data: () => ({
    dialog: false,
    caseData: {
      "name": "Staňte se kapitánem!",
      "description": "Vyhrajte možnost stát se na celý den kapitánem na luxusní jachtě!",
      "value": 20,
      "id": "4583f13b-1d5a-4f8c-be95-15df401b8aa2",
      "createdAt": "2021-09-04T20:34:29.607Z",
      "updatedAt": "2021-09-04T20:34:29.607Z",
      "deletedAt": null,
      "caseUsers": [
        {
          "id": "c94c0bb1-f4df-4f21-afca-e083441aa4bb",
          "createdAt": "2021-09-05T19:49:40.057Z",
          "updatedAt": "2021-09-05T19:49:40.057Z",
          "deletedAt": null,
          "user": {
            "id": "7de640df-6fed-46d7-a44f-a768b072add0",
            "createdAt": "2021-07-22T15:19:51.314Z",
            "updatedAt": "2021-07-22T15:19:51.314Z",
            "deletedAt": null,
            "fullName": "Vojtěch Pospíchal",
            "phoneNumber": "+420773699983",
            "enabled": true,
            "role": "ADMIN"
          }
        },
        {
          "id": "574a01e0-0bda-4ffa-856d-6a6c11e5c762",
          "createdAt": "2021-09-05T20:13:21.417Z",
          "updatedAt": "2021-09-05T20:13:21.417Z",
          "deletedAt": null,
          "user": {
            "id": "7de640df-6fed-46d7-a44f-a768b072add0",
            "createdAt": "2021-07-22T15:19:51.314Z",
            "updatedAt": "2021-07-22T15:19:51.314Z",
            "deletedAt": null,
            "fullName": "Vojtěch Pospíchal",
            "phoneNumber": "+420773699983",
            "enabled": true,
            "role": "ADMIN"
          }
        }
      ]
    }
  }),
  async mounted() {
    const result = await HTTP.get("/case/" + this.$route.params.caseId);
    this.caseData = result.data;
  }
}
</script>
