<template>
    <v-card class="pa-0">
        <v-tabs v-model="tab" grow show-arrows center-active>
            <v-tab v-for="item in $store.getters.boxesWithAccess" :key="item.id" @click="getBoxContent(item.id)">
                {{ item.boxName }}
            </v-tab>
            <v-tab>
                Nastavení
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in $store.getters.boxesWithAccess" :key="item.boxName">
                <v-card flat>
                    <v-card-title>
                        {{item.boxName}}
                        <v-spacer></v-spacer>
                        <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Hledat"
                                single-line
                                hide-details
                        ></v-text-field>
                    </v-card-title>
                    <v-data-table :headers="boxHeaders" :items="$store.getters.boxContent" :search="search">
                        <template v-slot:item="row">
                            <tr>
                                <td>{{row.item.deliveryId}}</td>
                                <td>{{row.item.phone}}</td>
                                <td>{{row.item.storageUnit}}</td>
                                <td>
                                    <v-btn class="mx-2" dark small>editovat</v-btn>
                                    <v-btn class="mx-2" dark small color="warning">vydat zásilku</v-btn>
                                    <v-btn class="mx-2" dark small color="error">smazat</v-btn>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
                <v-card flat class="pa-8">
                    <v-row>
                        <v-btn class="mx-2" dark small @click="createDelivery(item.id, item.boxName)">uložit zásilku</v-btn>
                        <v-btn class="mx-2" small>zobrazit vydané</v-btn>
                    </v-row>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>Nastavení vašich boxů</v-card-text>
                    <v-row justify="center">
                        <v-expansion-panels popout>
                            <v-expansion-panel
                                    v-for="item in $store.getters.boxesWithAccess"
                                    :key="item.id"
                                    @click="loadBoxStorageAreas(item.id)"
                            >
                                <v-expansion-panel-header>{{item.boxName}}</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-row>
                                        <v-col>
                                            <v-container>
                                                <v-row>
                                                    <v-switch
                                                            :disabled="false"
                                                            :loading="false"
                                                            color="error"
                                                            label="Vyřadit box (maintenance mode)"
                                                            hint="Maintenance mode"
                                                    ></v-switch>
                                                </v-row>
                                                <v-row>
                                                    <v-text-field label="Adresa boxu" hint="Adresa boxu" :value="item.address" required></v-text-field>
                                                </v-row>
                                                <v-row>
                                                    <v-text-field class="mr-4" label="Latitude" hint="Latitude boxu" :value="item.lat" required></v-text-field>
                                                    <v-text-field label="Longitude" hint="Longitude boxu" :value="item.long" required></v-text-field>
                                                </v-row>
                                                <v-row>
                                                    <v-text-field label="Vlastník boxu" hint="Vlastník boxu"  :value="item.ownedBy.name" disabled readonly></v-text-field>
                                                </v-row>
                                                <v-btn color="error">Uložit změnu v boxu</v-btn>
                                                <v-btn color="success" class="ml-6">Provést diagnostiku boxu</v-btn>
                                            </v-container>
                                        </v-col>
                                        <v-col>
                                            <v-simple-table>
                                                <template v-slot:default>
                                                    <thead>
                                                    <tr>
                                                        <th class="text-left">Schránky (storage area)</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr v-for="unit in boxStorageAreas" v-bind:key="unit">
                                                        <td>{{ unit }}</td>
                                                    </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </v-col>
                                    </v-row>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-row>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
    import {HTTP} from "../HTTP";

    export default {
        name: "CompanyAdmin.vue",
        data: () => ({
            tab: null,
            search: "",
            data: [],
            boxHeaders: [
                { text: 'ID', value: 'deliveryId' },
                { text: 'Telefon', value: 'phone' },
                { text: 'Storage unit', value: 'storageUnit'},
                { text: 'Akce', value: 'action', sortable: false},
            ],
            boxStorageAreas: [],
        }),
        async created() {
            console.log("Prvni box: " + this.$store.getters.boxesWithAccess[0].id);
            await this.getBoxContent(this.$store.getters.boxesWithAccess[0].id);
        },
        methods: {
            createDelivery(boxId, boxName) {
                this.$store.commit('openDialog', {open: true, boxId, boxName});
                console.log(this.$store.getters.dialog);
            },
            async loadBoxStorageAreas(boxId) {
                const result = await HTTP.get(`/box/storage/${boxId}`);
                console.log(result);
                this.boxStorageAreas = result.data;
            },
            async getBoxContent(boxId) {
                // TODO:// Optimalizovat uložením do cache a načtením jen pokud se změní
                console.log(boxId);
                const result = await HTTP.get(`/delivery/box/${boxId}`);
                console.log(result);
                this.$store.commit('setBoxContent', result.data);
                console.log(this.$store.getters.boxContent);
            }
        }
    }
</script>

<style scoped>

</style>
