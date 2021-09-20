<template>
  <v-app id="sandbox">
    <v-navigation-drawer
        v-model="primaryDrawer.model"
        :clipped="false"
        app
        overflow>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ appName }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!--

            <v-list dense nav>


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
      -->

      <v-divider></v-divider>
      <v-list dense nav>
        <v-container class="title">Administrační rozhraní</v-container>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <router-link :to="item.link">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>

        <v-divider/>

        <v-list-item>
          <v-list-item-content>
            Scheme
          </v-list-item-content>
          <v-switch
              v-model="$vuetify.theme.dark"
              label="Dark"
              primary
              @change="changeTheme"
          />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="primaryDrawer.clipped" app>
      <v-app-bar-nav-icon v-if="primaryDrawer.type !== 'permanent'"
                          @click.stop="primaryDrawer.model = !primaryDrawer.model"/>
      <v-toolbar-title>{{ appName }}</v-toolbar-title>
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
    <v-dialog
        v-model="$store.getters.dialog"
        hide-overlay
        persistent
        width="300"
    >
      <v-card
          color="warning"
          dark
          class="pa-4"
      >
        <v-card-text>
          <span class="subtitle-1">Načítám</span>
          <v-progress-linear indeterminate color="white">
          </v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script>
import {HTTP} from "./HTTP";

export default {
  data: () => ({
    appName: "SAZKOVAC",
    primaryDrawer: {
      model: null,
    },
    items: [
      {title: 'Dashboard', icon: 'mdi-view-dashboard', link: "/"},
      {title: 'Uživatelé', icon: 'mdi-account', link: "/user"},
      {title: 'Sázky', icon: 'mdi-cash-100', link: "/bets"},
      {title: 'Kategorie', icon: 'mdi-file-tree', link: "/category"},
      {title: 'Kupóny', icon: 'mdi-ticket-percent', link: "/coupon"},
      {title: 'Bedny', icon: 'mdi-box', link: "/case"}
    ],
    select: {}
  }),
  async created() {
    if (JSON.parse(localStorage.getItem("dark"))) {
      this.$vuetify.theme.dark = JSON.parse(localStorage.getItem("dark"));
    } else {
      localStorage.setItem("dark", JSON.stringify(false));
    }
  },
  async mounted() {
    setInterval(async () => {
      try {
        const health = await HTTP.get("/health");
        console.log(this.$router.currentRoute.path);
        if (this.$router.currentRoute.path !== "/login") {
          console.log(window.localStorage.auth.token);
          if (!health.data.auth) {
            console.log("Not authenticated");
            await this.$router.push("/login");
          } else {
            console.log(health.data);
            window.localStorage.setItem("auth", JSON.stringify({token: health.data.refreshedToken}));
          }
        }
      } catch (e) {
        if (e.response.status === 401 && this.$router.currentRoute.path !== "/login") {
          await this.$router.push("/login");
        }
      }
    }, 60000);
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
      } else {
        // TODO Doplnit error handling
      }
    }
  },
}
</script>
