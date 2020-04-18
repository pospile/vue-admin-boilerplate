<template>
    <div>
        <v-card>
            <v-card-title>
                Administrace boxů
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
    </div>
</template>

<script>
    export default {
        name: "UsersCRUD.vue",
        data: () => ({
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
