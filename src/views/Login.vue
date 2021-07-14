<template>
  <v-content>
    <v-container
        class="fill-height"
        fluid>
      <v-row
          align="center"
          justify="center">
        <v-col cols="12" md="5" sm="12">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Přihlášení</v-toolbar-title>
              <v-spacer/>
            </v-toolbar>
            <v-form @submit="onSubmit">
              <v-card-text>
                <v-text-field
                    v-model="phoneNumber"
                    label="Phone"
                    name="phoneNumber"
                    prepend-icon="person"
                    type="phone"
                />
                <v-text-field
                    id="password"
                    v-model="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                />
                <v-card-text class="red--text">
                  {{ errorMessage }}
                </v-card-text>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="primary" type="submit">Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import {HTTP} from "@/HTTP";

export default {
  name: "Login",
  data: () => ({
    phoneNumber: "",
    password: "",
    errorMessage: ""
  }),
  methods: {
    onSubmit: async function (e) {
      this.errorMessage = "";
      e.preventDefault();
      console.log("Zkouším se přihlásit jako: " + this.phoneNumber);
      try {
        const data = {
          phoneNumber: this.phoneNumber,
          password: this.password,
          otp: false
        };
        console.log(data);
        const response = await HTTP.post("/auth/login", data);
        localStorage.setItem("auth", JSON.stringify(response.data));
        await this.$router.replace("/");
      } catch (e) {
        console.log(e);
        this.errorMessage = "Error: Invalid credentials";
      }
    }
  }
}
</script>
