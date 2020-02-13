<template>
    <v-card>
        <v-card-title>
            Poslední transakce v systému
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
                :items="transactions"
                :items-per-page="10"
                :search="search"
                item-key="id"
                :expanded="expanded"
                @click:row="rowClicked">
            <template v-slot:expanded-item="{ item }">
                <td :colspan="headers.length">
                    <v-btn color="primary" dark @click="dialog = !dialog">Historie {{item.id}}</v-btn>
                </td>
            </template>
        </v-data-table>

        <v-row justify="center">
            <v-dialog v-model="dialog" width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Historie transakce</span>
                    </v-card-title>
                    <v-card-text>
                        <v-card class="mt-2">
                            <v-card-text class="py-0">
                                <v-timeline dense>
                                        <v-timeline-item v-for="item in currentHistory" :key="item.id">
                                            Transakce přesunuta ze stavu <b>{{item.status_before}}</b> do stavu <b>{{item.status_after}}</b>
                                            <br>
                                            Transakce přesunuta ze substavu <b>{{item.substate_before}}</b> do substavu <b>{{item.substate_after}}</b>
                                            <br>
                                            <span class="`headline font-weight-bold`"
                                                  v-text="item.updated_at.split('.')[0]">
                                            </span>
                                            <v-spacer></v-spacer>
                                            id: <b>{{item.id}}</b>
                                        </v-timeline-item>
                                </v-timeline>
                            </v-card-text>
                        </v-card>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="dialog = false">Zavřít</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

    </v-card>
</template>

<script>
    import {HTTP} from "../HTTP";

    export default {
        name: "ApiTable",
        data: () => ({
            dialog: false,
            expanded: [],
            currentHistory: [],
            search: '',
            headers: [
                { value: "id", text: "id"},
                { value: "email", text: "Email"},
                { value: "status", text: "Stav"},
                { value: "substate", text: "Substav"},
                { value: "createdAt", text: "Vytvořena"},
                { value: "updated_at", text: "Naposledy upraveno"},
                { value: "user_id", text: "Uživatel #"},
            ],
            transactions: [
            ],
        }),
        methods: {
            rowClicked: function (value) {
                this.expanded = value === this.expanded[0] ? [] : [value]
                this.loadHistoryData(value.id);
            },
            loadHistoryData: async function (id) {
                const response = await HTTP.get(`/admin/history/${id}`)
                console.log(response.data);
                this.currentHistory = response.data;
            }
        },
        async mounted() {
            const response = await HTTP.get("/admin/transactions");
            this.transactions = response.data;
        }
    }
</script>

<style scoped>

</style>
