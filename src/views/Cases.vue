<template>
  <div>
    <v-card>
      <v-card-title>
        Administrace charitativních boxů
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            hide-details
            label="Hledat"
            single-line
        ></v-text-field>
      </v-card-title>
      <v-data-table
          :headers="headers"
          :items="cases"
          :items-per-page="10"
          :search="search">
        <template v-slot:item.createdAt="{ item }">
          <span>{{ new Date(item.createdAt).toLocaleString() }}</span>
        </template>
        <template v-slot:item.couponValue="{ item }">
          <span>{{ item.value }} Kč</span>
        </template>
        <template v-slot:item.id="{ item }">
          <v-btn class="mx-2" color="primary">
            <router-link
                style="text-decoration: none; color: inherit;"
                :to="`/case/${item.id}`">
              spravovat
            </router-link>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-layout class="pt-2">
      <v-dialog v-model="dialog" max-width="800px" persistent>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" color="primary" dark>Vytvořit nový case</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Vytvoření case</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" lg="4" md="4" sm="12">
                  <v-text-field v-model="value" label="Hodnota case" type="number"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*povinné pole</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="createNewCase">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import {HTTP} from "@/HTTP";

export default {
  name: "Cases",
  data: () => ({
    dialog: false,
    search: '',
    headers: [
      {
        text: 'Jméno case',
        align: 'left',
        sortable: true,
        value: 'name',
      },
      {text: 'Popis', value: 'description'},
      {text: 'Datum vytvoření', value: 'createdAt'},
      {text: 'Investováno kuponů', value: 'caseUsers.length'},
      {text: 'Hodnota', value: 'value'},
      {text: 'Akce', value: 'id'},
    ],
    cases: [],
    couponValue: 0
  }),
  async mounted() {
    const cases = await HTTP.get("/case");
    this.cases = cases.data;
    console.log(this.cases);
  },
  methods: {
    async createNewCase() {
      try {
        const createCoupon = {
          couponValue: this.couponValue
        }
        const result = await HTTP.post("/coupon", createCoupon);
        this.coupons.push(result.data);
        console.log(result);
        this.dialog = false;
      } catch (e) {
        console.log(e);
      }
    },
  }
}
</script>

<style scoped>

</style>
