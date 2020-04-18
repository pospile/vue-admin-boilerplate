<template>
    <div>
        <v-card>
            <v-card-title>
                Administrace uživatelů
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        label="Hledat"
                        single-line
                        hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="data"
                    :items-per-page="5"
                    :search="search">
            </v-data-table>
        </v-card>
        <v-layout class="pt-2">
            <v-dialog v-model="dialog" persistent max-width="800px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on">Vytvořit nového uživatele</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">Vytvoření uživatele</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field name="displayName" label="Celé jméno*" hint="Celé jméno uživatele" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Email*" hint="Slouží jako přihlašovací jméno" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Heslo*" hint="Přihlašovací heslo uživatele" type="password" required></v-text-field>
                                </v-col>
                                <v-col cols="12" lg="8" md="8" sm="12">
                                    <v-autocomplete
                                            :items="['Underholding s.r.o.', 'Město Kolín a.s.', 'Zruč Nad Sázavou s.p.']"
                                            label="Společnosti"
                                            multiple
                                    ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" lg="4" md="4" sm="12">
                                    <v-checkbox label="Je administrátor"></v-checkbox>
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>*povinné pole</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "UsersCRUD.vue",
        data: () => ({
            dialog: false,
            search: '',
            headers: [
                {
                    text: 'Jméno',
                    align: 'left',
                    sortable: false,
                    value: 'displayName',
                },
                { text: 'Email', value: 'email' },
                { text: 'Právo administrace', value: 'isAdmin' },
            ],
            data: [
                {
                    "id": "83d95a42-af01-4b52-93e3-dcedf9b7eac9",
                    "displayName": "Vojtěch Pospíchal",
                    "email": "pospichal@underholding.cz",
                    "password": "pbkdf2_sha256$150000$DquPOhKeUJ9C+vSfG6fSIQ==$THz4ejUXoBtPJQoXtZ/PXecgo2zqRDlxa2s1D4LebL4=",
                    "isAdmin": true,
                    "__companys__": [
                        {
                            "id": 1,
                            "name": "Underholding s.r.o."
                        }
                    ]
                },
                {
                    "id": "38282474-4374-416f-9a4c-be542cffee8b",
                    "displayName": "Lukáš Hellmann",
                    "email": "hellmann@underholding.cz",
                    "password": "pbkdf2_sha256$150000$IDJ/6Y+YSGG2+PpV1p0m8Q==$ywbU85WtAvAYQcVfjfjmmcwVEpAtT12ejShQ/TvErbU=",
                    "isAdmin": false,
                    "__companys__": [
                        {
                            "id": 2,
                            "name": "Město Kolín a.s."
                        }
                    ]
                }
            ],
        }),
    }
</script>

<style scoped>

</style>
