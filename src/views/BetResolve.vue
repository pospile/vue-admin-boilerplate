<template>
	<v-card elevation="10" class="pa-0">
		<v-card-title class="elevation-5 primary white--text headline">
			Sázka: {{ bet.betName }}
		</v-card-title>
		<v-card-text>
			<v-row>
				<v-card-subtitle>
					Status: {{ bet.status }}
				</v-card-subtitle>
			</v-row>
			<v-row>
				<v-col cols="6" v-for="betOption in bet.betOptions" v-bind:key="betOption.id">
					<v-card>
						<v-card-title
							:class="(betOption.status === 'WON') ? 'success white--text headline' : 'secondary white--text headline'">
							<div v-if="betOption.status === 'WON'">{{ betOption.optionName }} - VÍTĚZ</div>
							<div v-else>{{ betOption.optionName }}</div>
						</v-card-title>
						<v-card-text>
							<v-container>
								<span class="subtitle-2">Status: {{ betOption.status }}</span><br>
								<v-card elevation="5" v-for="user in betOption.users" v-bind:key="user.id" single-line
										class="mt-3 pa-3 d-flex justify-md-space-around">
									<v-icon class="mr-2">mdi-account</v-icon>
									{{ user.fullName }}
									<v-icon class="ml-auto">mdi-close</v-icon>
								</v-card>
							</v-container>
						</v-card-text>
						<v-card-actions v-if="bet.status !== 'BLOCKED' && bet.status !== 'FINISHED'">
							<v-btn text color="primary" @click="selectUserForBet(betOption.optionName, betOption.id)">
								Přidat uživatele do sázky
							</v-btn>
							<v-btn
								color="success" v-if="bet.status !== 'FINISHED'"
								@click="resolveBet(betOption.id, false, betOption.optionName)">
								Označit vítěze
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</v-card-text>
		<v-card-actions>
			<v-btn v-if="bet.status !== 'BLOCKED' && bet.status !== 'FINISHED'" color="error" @click="blockBet">
				zablokovat sázku
			</v-btn>
			<v-btn v-if="bet.status !== 'FINISHED'" color="warning" @click="resolveBet(undefined, true)">
				DRAW
			</v-btn>
			<span class="error title ml-2" v-if="errorMessage">{{ errorMessage }}</span>
		</v-card-actions>


		<v-dialog
			v-model="userPicker"
			max-width="800px"
			scrollable
			persistent
			transition="dialog-bottom-transition"
		>
			<v-card>
				<v-toolbar dark color="primary">
					<v-btn icon dark @click="userPicker = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
					<v-toolbar-title>Vybrat uživatele pro možnost {{ selectOptionName }}</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-toolbar-items>
						<v-btn v-if="selected.length !== 0" dark text @click="assignUserToBetOption">
							Vybrat {{ selected[0].fullName }}
						</v-btn>
					</v-toolbar-items>
				</v-toolbar>

				<v-card-title>
					<v-text-field
						v-model="search"
						append-icon="mdi-magnify"
						label="Vyhledat"
						single-line
						hide-details
					></v-text-field>
				</v-card-title>

				<v-data-table
					:loading="selectLoading"
					loading-text="Načítám, vyčkejte"
					v-model="selected"
					:headers="headers"
					:items="userList"
					single-select
					item-key="id"
					show-select
					:search="search"
					class="elevation-1">
				</v-data-table>

			</v-card>
		</v-dialog>

		<v-dialog
			v-model="confirmResolve"
			max-width="600"
		>
			<v-card>
				<v-card-title class="text-h5">
					Jste si jistý, že chcete vyhodnotit sázku?<br>
					{{ bet.betName }}
				</v-card-title>

				<v-card-text>
					Tato akce ukončí možnost sázet, vyhodnotí výsledky a vyplatí uživatelům jejich výhry.
					<div>
						Remíza: <span v-if="confirmDraw">Ano</span><span v-else>Ne</span>
						<br>
						Vítěz: <span v-if="confirmBetOptionName">{{ confirmBetOptionName }}</span><span v-else>Ne</span>
					</div>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>

					<v-btn color="danger darken-1" text @click="confirmResolve = false">
						Nesouhlasím
					</v-btn>

					<v-btn color="warning darken-1" @click="sendResolveBetRequest()">
						Ano
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>


	</v-card>
</template>

<script>

import {HTTP} from "@/HTTP";

export default {
	name: 'Home',
	data: () => ({
		bet: {
			"id": "",
			"createdAt": "",
			"updatedAt": "",
			"deletedAt": null,
			"betName": "načítám...",
			"resolveDateTime": "",
			"status": "načítám",
			"betValue": 0,
			"betOptions": [
				{
					"id": "03a2b90b-e510-4df7-af12-7b546e19dbfe",
					"createdAt": "2021-05-31T01:46:36.903Z",
					"updatedAt": "2021-05-31T01:46:36.903Z",
					"deletedAt": null,
					"optionName": "načítám",
					"status": "EMPTY",
					"users": null
				},
				{
					"id": "45176bba-e44a-48b8-94e4-d33be0da757a",
					"createdAt": "2021-05-31T01:46:36.903Z",
					"updatedAt": "2021-05-31T01:46:36.903Z",
					"deletedAt": null,
					"optionName": "načítám",
					"status": "EMPTY",
					"users": null
				}
			]
		},
		userPicker: false,
		selected: [],
		userList: [],
		headers: [
			{
				text: 'Celé jméno',
				align: 'start',
				sortable: true,
				value: 'fullName',
			},
			{text: 'Telefonní číslo', value: 'phoneNumber'},
			{text: 'Datum založení účtu', value: 'createdAt'},
		],
		selectOptionName: "",
		selectOptionId: "",
		selectLoading: true,
		search: "",
		errorMessage: null,
		confirmResolve: false,
		confirmDraw: undefined,
		confirmBetOptionId: undefined,
		confirmBetOptionName: undefined,
	}),
	async mounted() {
		this.$store.commit('openDialog', {open: true});
		const result = await HTTP.get("/bet/" + this.$route.params.betId);
		this.bet = result.data;
		this.$store.commit('openDialog', {open: false});
	},
	methods: {
		async blockBet() {
			this.$store.commit('openDialog', {open: true});
			const result = await HTTP.delete("/bet/" + this.$route.params.betId);
			this.bet = result.data;
			this.$store.commit('openDialog', {open: false});
		},
		async selectUserForBet(selectOptionName, selectOptionId) {
			this.selectOptionName = selectOptionName;
			this.selectOptionId = selectOptionId;
			this.userPicker = true;
			this.userList = (await HTTP.get("/user")).data;
			this.selectLoading = false;
		},
		async assignUserToBetOption() {
			this.$store.commit('openDialog', {open: true});
			try {
				const payload = {
					betOptionId: this.selectOptionId,
					userId: this.selected[0].id
				}
				await HTTP.post("/bet/user/admin", payload);
				window.location.reload();
			} catch (e) {
				this.userPicker = false;
				this.errorMessage = e.response.data.description;
				this.$store.commit('openDialog', {open: false});
			}
		},
		async resolveBet(betOptionId, draw, betOptionName = undefined) {
			this.confirmResolve = true;
			this.confirmBetOptionId = betOptionId;
			this.confirmDraw = draw;
			this.confirmBetOptionName = betOptionName;
		},
		async sendResolveBetRequest() {
			this.$store.commit('openDialog', {open: true});
			try {
				const payload = {
					betId: this.$route.params.betId,
					draw: this.confirmDraw,
					betOptionId: this.confirmBetOptionId
				}
				await HTTP.patch("/bet", payload);
				window.location.reload();
			} catch (e) {
				this.errorMessage = e.response.data.description;
				this.$store.commit('openDialog', {open: false});
			}
		}
	}
}
</script>
