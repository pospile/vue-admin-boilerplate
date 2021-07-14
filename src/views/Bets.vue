<template>
	<v-card class="pa-0">
		<v-tabs v-model="tab" center-active grow show-arrows>
			<v-tab v-for="item in categories" :key="item.id" @click="getBetsInCategory(item.id)">
				{{ item.name }}
			</v-tab>
		</v-tabs>

		<v-tabs-items v-model="tab">
			<v-tab-item v-for="item in categories" :key="item.name">
				<v-card flat>
					<v-card-title>
						{{ item.name }}
					</v-card-title>
					<v-data-table :headers="betsHeaders" :items="$store.getters.boxContent">
						<template v-slot:item="row">
							<tr>
								<td>{{ row.item.betName }}</td>
								<td>{{ row.item.betValue }}</td>
								<td>{{ new Date(row.item.resolveDateTime).toLocaleString() }}</td>
								<td>{{ row.item.status }}</td>
								<td v-if='(row.item.betOptions.filter((betOption) => betOption.status === "WON")).length !== 0'>
									{{
										(row.item.betOptions.filter((betOption) => betOption.status === "WON"))[0].optionName
									}}
								</td>
								<td v-else>
									nerozhodnuto
								</td>
								<td>
									<v-btn class="mx-2" color="primary">
										<router-link
											style="text-decoration: none; color: inherit;"
											:to="`/bet/${row.item.id}`">
											spravovat
										</router-link>
									</v-btn>
								</td>
							</tr>
						</template>
					</v-data-table>
				</v-card>
				<v-card class="pa-8" flat>
					<v-row>
						<v-btn class="mx-2" dark small @click="openBetDialog">Vytvořit novou sázku</v-btn>
					</v-row>
				</v-card>
			</v-tab-item>
		</v-tabs-items>


		<v-dialog
			v-model="createDialog"
			fullscreen
			persistent
			transition="dialog-bottom-transition"
		>
			<v-card>
				<v-card-title class="success white--text headline">
					<v-container class="d-flex justify-space-between">
						<v-btn color="black" icon @click="createDialog = false">
							<v-icon>mdi-window-close</v-icon>
						</v-btn>
						<span class="headline">Vytvoření nové sázky</span>
						<v-btn @click="createNewBet">Save</v-btn>
					</v-container>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col cols="12">
								<v-text-field
									v-model="newBet.betName"
									label="Cíl sázky*"
									required
								></v-text-field>
							</v-col>
							<v-col cols="6">
								<v-text-field
									v-model="newBet.betOptions[0]"
									label="Jedna strana"
									required
								></v-text-field>
							</v-col>
							<v-col cols="6">
								<v-text-field
									v-model="newBet.betOptions[1]"
									label="Druhá strana"
									required
								></v-text-field>
							</v-col>
							<v-col cols="4">
								<v-text-field
									type="number"
									v-model="newBet.betValue"
									label="Hodnota sázky"
								></v-text-field>
							</v-col>
							<v-col cols="4">
								<v-menu
									ref="menu"
									v-model="dateMenu"
									:close-on-content-click="false"
									min-width="auto"
									offset-y
									transition="scale-transition"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="date"
											v-bind="attrs"
											v-on="on"
											label="Finish date"
											prepend-icon="mdi-calendar"
											readonly
										></v-text-field>
									</template>
									<v-date-picker
										v-model="date"
										:active-picker.sync="activePicker"
										:first-day-of-week="1"
										locale="cs-CZ"
										min="2021-05-30"
										@change="save"
									></v-date-picker>
								</v-menu>
							</v-col>
							<v-col cols="4">
								<v-menu
									ref="menu"
									v-model="timeMenu"
									:close-on-content-click="false"
									:nudge-right="40"
									:return-value.sync="time"
									max-width="290px"
									min-width="290px"
									offset-y
									transition="scale-transition"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="time"
											v-bind="attrs"
											v-on="on"
											label="Finish time"
											prepend-icon="mdi-clock-time-four-outline"
											readonly
										></v-text-field>
									</template>
									<v-time-picker
										v-if="timeMenu"
										v-model="time"
										format="24hr"
										full-width
										@click:minute="$refs.menu.save(time)"
									></v-time-picker>
								</v-menu>
							</v-col>
						</v-row>
						<v-card>
							<v-treeview :active.sync="active" :items="categories" activatable
										color="warning"
										hoverable
										multiple-active
							>
							</v-treeview>
						</v-card>
					</v-container>
				</v-card-text>
			</v-card>
		</v-dialog>

	</v-card>
</template>

<script>
import {HTTP} from "@/HTTP";

export default {
	name: "Categories.vue",
	data: () => ({
		activePicker: "YEAR",
		date: null,
		dateMenu: false,

		time: null,
		timeMenu: false,

		tab: null,
		search: "",
		data: [],
		categories: [],
		active: [],
		betsHeaders: [
			{text: 'Jméno sázky', value: 'betName'},
			{text: 'Hodnota sázky', value: 'money'},
			{text: 'Ukončení', value: 'resolveDateTime'},
			{text: 'Status', value: 'status'},
			{text: 'Vítěz', value: 'winner', sortable: false},
			{text: 'Akce', value: 'action', sortable: false},
		],
		boxStorageAreas: [],
		createDialog: false,
		newBet: {
			betName: "",
			betValue: 0,
			betOptions: ["", ""],
			resolveDateTime: "",
			categoriesId: [""]
		}
	}),
	async created() {
	},
	async mounted() {
		this.$store.commit('openDialog', {open: true});
		const categories = await HTTP.get("/category");
		this.categories = categories.data;
		await this.getBetsInCategory(categories.data[0].id);
		this.$store.commit('openDialog', {open: false});
	},
	watch: {
		menu(val) {
			val && setTimeout(() => (this.activePicker = 'YEAR'))
		},
	},
	methods: {
		async loadBoxStorageAreas(boxId) {
			const result = await HTTP.get(`/box/storage/${boxId}`);
			console.log(result);
			this.boxStorageAreas = result.data;
		},
		async getBetsInCategory(categoryId) {
			this.$store.commit('setBoxContent', []);
			this.$store.commit('openDialog', {open: true});
			console.log(`Načítám sázky ${categoryId}`);
			const result = await HTTP.get(`/bet/category/${categoryId}`);
			console.log(result);
			this.$store.commit('setBoxContent', result.data);
			console.log(this.$store.getters.boxContent);
			this.$store.commit('openDialog', {open: false});
		},
		openBetDialog() {
			this.createDialog = true;
		},
		async createNewBet() {
			this.$store.commit('openDialog', {open: true});
			const payload = {
				"betName": this.newBet.betName,
				"betOptions": this.newBet.betOptions,
				"betValue": this.newBet.betValue,
				"resolveDateTime": new Date(`${this.date} ${this.time}`),
				"categoriesId": this.active
			};
			console.log(payload);
			const result = await HTTP.post("/bet", payload);
			console.log(result);
			this.$store.commit('openDialog', {open: false});
			this.createDialog = false;
			window.location.reload();
		},
		save(date) {
			this.$refs.menu.save(date)
		},
	}
}
</script>

<style scoped>
</style>
