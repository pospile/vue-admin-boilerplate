<template>
  <v-app id="sandbox">
    <v-navigation-drawer
            :clipped="false"
            app
            overflow
            v-model="primaryDrawer.model">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{appName}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>

        <v-list-item>
          <v-list-item-content>
            <v-btn color="primary" text><v-icon>mdi-magnify</v-icon> vyhledávání</v-btn>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-btn v-on:click="openDialog" color="primary" light>Vytvořit novou zásilku</v-btn>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-apps-box</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <router-link to="/company/admin">
              <v-list-item-title>Správa boxu</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>

      </v-list>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-container class="title">Administrační rozhraní</v-container>
        <v-list-item :key="item.title" link v-for="item in items">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <router-link :to="item.link">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </router-link>
            </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list-item>
          <v-list-item-content>
            Scheme
          </v-list-item-content>
          <v-switch
                  label="Dark"
                  primary
                  @change="changeTheme"
                  v-model="$vuetify.theme.dark"
          />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="primaryDrawer.clipped" app>
      <v-app-bar-nav-icon @click.stop="primaryDrawer.model = !primaryDrawer.model" v-if="primaryDrawer.type !== 'permanent'"/>
      <v-toolbar-title>{{appName}}</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer
            :inset="false"
            app
    >
      <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>


    <!--
        APP WIDE DIALOGS
    -->
    <v-dialog v-model="$store.getters.dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Nová zásilka</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="$store.getters.delivery.phone" label="Telefonní číslo*" hint="Telefonní číslo*" v-on:change="changeDeliveryPhone" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="$store.getters.delivery.deliveryId" label="ID zásilky*" hint="ID zásilky*" v-on:change="changeDeliveryId" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                        :items="$store.getters.boxesWithAccess"
                        item-text="boxName"
                        item-value="id"
                        label="Box*"
                        v-model="$store.getters.delivery.boxId"
                        :disabled="$store.getters.delivery.boxName !== ''"
                        :readonly="$store.getters.delivery.boxName !== ''"
                        required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field label="ID Boxu*" hint="ID Boxu*" :value="$store.getters.delivery.boxId" disabled readonly required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="$store.commit('openClearDialog', {open: false})">Zrušit</v-btn>
          <v-btn color="green darken-1" text @click="createNewDelivery">Vytvořit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script>
  import {HTTP} from "./HTTP";
  export default {
    data: () => ({
      appName: "Administrace",
      primaryDrawer: {
        model: null,
      },
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', link: "/" },
        { title: 'Uživatelé', icon: 'mdi-account', link: "/user" },
        { title: 'Společnosti', icon: 'mdi-domain', link: "/company" },
        { title: 'Boxy', icon: 'mdi-nas', link: "/box" },
      ],
      select: {}
    }),
    async created() {
      if (JSON.parse(localStorage.getItem("dark"))) {
        this.$vuetify.theme.dark = JSON.parse(localStorage.getItem("dark"));
      }
      else {
        localStorage.setItem("dark", JSON.stringify(false));
      }
      const resultReceived = await HTTP.get("/box/owned");
      const result = resultReceived.data;

      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].__boxes__.length; j++) {
          this.$store.commit('addAccessibleBox', result[i].__boxes__[j]);
        }
      }
    },
    methods: {
      changeTheme() {
        localStorage.setItem("dark", JSON.stringify(this.$vuetify.theme.dark));
      },
      openDialog() {
        this.$store.commit('openClearDialog', {open: true});
      },
      changeDeliveryId(data) {
        this.$store.commit('changeDeliveryID', {deliveryId: data});
      },
      changeDeliveryPhone(data) {
        this.$store.commit('changePhoneNumber', {phone: data});
      },
      async createNewDelivery() {
        if (this.$store.getters.delivery.boxId && this.$store.getters.delivery.phone && this.$store.getters.delivery.deliveryId) {
          try {
            console.log(this.$store.getters.delivery);
            const result = await HTTP.post("/delivery", this.$store.getters.delivery);
            console.log(result);
            console.log(result.data);
            this.$store.commit('pushNewBoxContent', result.data);
            this.$store.commit('openClearDialog', {open: false});
          } catch (e) {
            // TODO doplnit error handling
          }
        }
        else {
          // TODO Doplnit error handling
        }
      }
    },
  }
</script>
