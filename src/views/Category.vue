<template>
  <v-container>
    <v-card class="pa-0">
      <v-card-title class="indigo white--text headline">
        <v-container>
          <v-row class="pb-3">Kategorie</v-row>
          <v-row>
            <v-text-field
                v-model="search"
                label="Vyhledat kategorii"
                dark
                flat
                solo-inverted
                hide-details
                clearable
                clear-icon="mdi-close-circle-outline"
            ></v-text-field>
          </v-row>
        </v-container>
      </v-card-title>
      <v-container>
        <v-treeview activatable hoverable color="warning"
                    :items="categories"
                    :active.sync="active"
                    :search="search"
        >
        </v-treeview>
        <v-card-actions>
          <v-row>
            <v-container>
              <v-btn color="success" @click="createDialog = true">Přidat subcategory {{ active }}</v-btn>
            </v-container>
            <v-container v-if="active.length > 0">
              <v-btn color="error" @click="deleteDialog = true">Smazat kategorii {{ active }}</v-btn>
            </v-container>
          </v-row>
        </v-card-actions>
      </v-container>
    </v-card>

    <v-dialog
        v-model="createDialog"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title class="success white--text headline">
          <v-container>
            <span class="headline">Vytvoření subkategorie</span>
          </v-container>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="Jméno kategorie*"
                    v-model="createCategory"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Parent category id"
                    disabled
                    :value="active"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="createDialog = false"
          >
            Close
          </v-btn>
          <v-btn
              color="success darken-1"
              text
              @click="createSubCategory"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="deleteDialog"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title class="error white--text headline">
          <v-container>
            <span class="headline">Smazání kategorie</span>
          </v-container>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="Category id"
                    disabled
                    :value="active"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="deleteDialog = false"
          >
            Close
          </v-btn>
          <v-btn
              color="error darken-1"
              text
              @click="deleteCategory"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import {HTTP} from "@/HTTP";

export default {
  name: "Categories.vue",
  data: () => ({
    tab: null,
    createDialog: false,
    deleteDialog: false,
    search: "",
    createCategory: "",
    categories: [],
    active: [],
  }),
  async created() {
  },
  async mounted() {
    const categories = await HTTP.get("/category");
    this.categories = categories.data;
  },
  methods: {
    async createSubCategory() {
      const data = {
        "name": this.createCategory,
        "parentCategoryId": (this.active.length > 0) ? this.active[0] : undefined
      };
      const created = await HTTP.post("/category", data);
      console.log(created);
      window.location.reload();
    },
    async deleteCategory() {
      const deleted = await HTTP.delete(`/category/${(this.active.length > 0) ? this.active[0] : undefined}`);
      console.log(deleted);
      window.location.reload();
    }
  }
}
</script>

<style scoped>
</style>
