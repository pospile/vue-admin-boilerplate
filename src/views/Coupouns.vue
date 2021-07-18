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
        <template v-slot:item.used="{ item }">
          <v-icon v-if="item.used">mdi-check-all</v-icon>
          <v-icon v-else>mdi-close</v-icon>
        </template>
				<template v-slot:item.couponValue="{ item }">
					<span>{{ item.couponValue }} Kč</span>
				</template>
			</v-data-table>
		</v-card>
		<v-layout class="pt-2">
			<v-dialog v-model="dialog" persistent max-width="800px">
				<template v-slot:activator="{ on }">
					<v-btn color="primary" dark v-on="on">Vytvořit nový kupon</v-btn>
				</template>
				<v-card>
					<v-card-title>
						<span class="headline">Vytvoření kuponu</span>
					</v-card-title>
					<v-card-text>
						<v-container>
							<v-row>
								<v-col cols="12" lg="4" md="4" sm="12">
									<v-text-field v-model="couponValue" type="number" label="Hodnota kupónu"></v-text-field>
								</v-col>
							</v-row>
						</v-container>
						<small>*povinné pole</small>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
						<v-btn color="blue darken-1" text @click="createNewCoupon">Save</v-btn>
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
				text: 'Kód kuponu',
				align: 'left',
				sortable: true,
				value: 'couponCode',
			},
			{text: 'Datum vytvoření', value: 'createdAt'},
			{text: 'Použito', value: 'used'},
      {text: 'Využil', value: 'usedBy.fullName'},
			{text: 'Hodnota', value: 'couponValue'},
		],
		coupons: [],
		couponValue: 0
	}),
	async mounted() {
		const coupons = await HTTP.get("/coupon");
		this.coupons = coupons.data;
		console.log(this.coupons);
	},
	methods: {
		async createNewCoupon() {
			try {
				const result = await HTTP.post("/coupon", this.createUser);
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
