<template>
	<div>
		<v-card>
			<v-card-title>
				Administrace kuponů
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
					:items="coupons"
					:items-per-page="10"
					:search="search">
				<template v-slot:item.createdAt="{ item }">
					<span>{{ new Date(item.createdAt).toLocaleString() }}</span>
				</template>
				<template v-slot:item.wallet.money="{ item }">
					<span>{{ item.wallet.money }} Kč</span>
				</template>
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
									<v-text-field v-model="createUser.fullName" name="displayName" label="Celé jméno*"
												  hint="Celé jméno uživatele"
												  required></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field v-model="createUser.phoneNumber" label="Telefonní číslo*"
												  hint="Slouží jako přihlašovací jméno" required></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field v-model="createUser.password" label="Heslo*"
												  hint="Přihlašovací heslo uživatele"
												  type="password"
												  required></v-text-field>
								</v-col>
								<v-col cols="12" lg="4" md="4" sm="12">
									<v-text-field v-model="createUser.initialBalance" type="number"
												  label="Počáteční zůstatek"></v-text-field>
								</v-col>
							</v-row>
						</v-container>
						<small>*povinné pole</small>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
						<v-btn color="blue darken-1" text @click="createNewUser">Save</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-layout>
	</div>
</template>

<script>
import {HTTP} from "@/HTTP";

export default {
	name: "Users",
	data: () => ({
		dialog: false,
		search: '',
		headers: [
			{
				text: 'Jméno',
				align: 'left',
				sortable: false,
				value: 'fullName',
			},
			{text: 'Datum založení', value: 'createdAt'},
			{text: 'Telefonní číslo', value: 'phoneNumber'},
			{text: 'Zůstatek', value: 'wallet.money'},
		],
		users: [],
		createUser: {
			phoneNumber: "",
			fullName: "",
			password: "",
			initialBalance: ""
		}
	}),
	async mounted() {
		const users = await HTTP.get("/user");
		this.users = users.data;
		console.log(this.users);
	},
	methods: {
		async createNewUser() {
			try {
				const result = await HTTP.post("/user", this.createUser);
				this.users.push(result.data);
				console.log(result);
				this.dialog = false;
			} catch (e) {
				console.log(e);
			}
		},
	}
}
</script>

<style scoped>

</style>
