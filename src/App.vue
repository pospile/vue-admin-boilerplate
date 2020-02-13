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
            Tmavý režim
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
      <v-container class="pa-4">
        <router-view/>
      </v-container>
    </v-content>

    <v-footer
            :inset="false"
            app
    >
      <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      appName: "Administrace",
      primaryDrawer: {
        model: null,
      },
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', link: "/" },
        { title: 'Transakce', icon: 'mdi-file-table-box-multiple-outline', link: "/transactions" },
        { title: 'Administrátoři', icon: 'mdi-account-group', link: "/users" },
      ],
    }),
    created() {
      if (this.$store.get("dark")) {
        this.$vuetify.theme.dark = this.$store.get("dark");
      }
      else {
        this.$store.set("dark", false);
      }
    },
    methods: {
      changeTheme() {
        this.$store.set("dark", this.$vuetify.theme.dark);
      }
    }
  }
</script>
