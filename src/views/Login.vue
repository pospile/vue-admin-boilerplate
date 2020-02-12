<template>
    <v-content>
        <v-container
                class="fill-height"
                fluid>
            <v-row
                    align="center"
                    justify="center">
                <v-col cols="12" sm="12" md="5">
                    <v-card class="elevation-12">
                        <v-toolbar color="primary" dark flat>
                            <v-toolbar-title>Přihlášení</v-toolbar-title>
                            <v-spacer />
                        </v-toolbar>
                        <v-form @submit="onSubmit">
                            <v-card-text>
                                <v-text-field
                                        label="Email"
                                        name="email"
                                        v-model="email"
                                        prepend-icon="person"
                                        type="email"
                                />
                                <v-text-field
                                        id="password"
                                        label="Password"
                                        name="password"
                                        v-model="password"
                                        prepend-icon="lock"
                                        type="password"
                                />
                                <v-card-text class="red--text">
                                    {{errorMessage}}
                                </v-card-text>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn type="submit" color="primary">Login</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
    import {HTTP} from "../HTTP";

    export default {
        name: "Login",
        data: () => ({
            email:"",
            password:"",
            errorMessage: ""
        }),
        methods: {
            onSubmit: async function (e) {
                this.errorMessage = "";
                e.preventDefault();
                console.log("Zkouším se přihlásit jako: " + this.email);
                try {
                    const response = await HTTP.post("/auth/login", {email: this.email, password: this.password});
                    console.log(response.data);
                    this.$store.set("auth", response.data);
                    this.$router.replace("/");
                }
                catch (e) {
                    console.log(e);
                    this.errorMessage = "Error: Invalid credentials";
                }
            }
        }
    }
</script>
