<template>
  <div>
    <v-card class="pa-0" elevation="10">
      <v-card-title class="elevation-5 primary white--text headline">
        Uživatel: {{ profileData.fullName }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-card-subtitle>
              Telefon: {{ profileData.phoneNumber }} <br>
              Zůstatek: {{ profileData.wallet.money }}
            </v-card-subtitle>
          </v-col>
          <v-col cols="6">
            <v-card v-for="transaction in profileData.wallet.transactions" v-bind:key="transaction.id" class="pa-0"
                    elevation="10">
              <v-card-title v-if="transaction.amount > 0" class="elevation-5 success white--text headline">
                {{ transaction.description }}
              </v-card-title>
              <v-card-title v-else class="elevation-5 error white--text headline">
                {{ transaction.description }}
              </v-card-title>
              <v-card-text class="pa-3">
                Čas: {{ new Date(transaction.createdAt) }} <br>
                Money: {{ transaction.amount }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error">
          zablokovat uživatele
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-layout class="pt-2">
      <v-dialog v-model="dialog" max-width="800px" persistent>
        <v-card>
          <v-card-title>
            <span class="headline">Vytvoření kuponu</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" lg="4" md="4" sm="12">
                  <v-text-field v-model="couponValue" label="Hodnota kupónu" type="number"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*povinné pole</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="createNewCoupon">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>

import {HTTP} from "@/HTTP";

export default {
  name: 'Home',
  data: () => ({
    dialog: false,
    profileData: {
      "id": "",
      "createdAt": "2021-07-22T16:53:05.696Z",
      "updatedAt": "2021-07-22T16:53:05.696Z",
      "deletedAt": null,
      "fullName": "Načítání",
      "phoneNumber": "",
      "enabled": true,
      "role": "USER",
      "wallet": {
        "id": "e69c8303-28ab-49c2-a72e-55d12d7666e9",
        "createdAt": "2021-07-22T16:53:05.696Z",
        "updatedAt": "2021-07-22T16:53:05.696Z",
        "deletedAt": null,
        "money": "načítáme"
      }
    }
  }),
  async mounted() {
    const result = await HTTP.get("/user/" + this.$route.params.userId);
    this.profileData = result.data;
  }
}
</script>
