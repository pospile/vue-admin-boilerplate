<template>
  <div>
    <v-card>
      <v-card-title>
        Centrum rozhodování sázek
        <v-spacer></v-spacer>
      </v-card-title>
    </v-card>

    <v-container>
      <v-row dense>
        <v-card class="mx-auto my-12" max-width="374">
          <v-card-title>Česko vs Švédsko</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <div class="grey--text">
                Kurz 1,12 : 2,8
              </div>
            </v-row>

          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>Vítěz</v-card-title>

          <v-card-text>
            <v-chip-group
                v-model="selection"
                active-class="deep-purple accent-4 white--text"
                column
            >
              <v-chip>ČESKO</v-chip>

              <v-chip>DRAW</v-chip>

              <v-chip>ŠVÉDSKO</v-chip>
            </v-chip-group>
          </v-card-text>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text>
              Reserve
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="mx-auto my-12" max-width="374">
          <v-card-title>Česko vs Švédsko</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <div class="grey--text">
                Kurz 1,12 : 2,8
              </div>
            </v-row>

          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>Vítěz</v-card-title>

          <v-card-text>
            <v-chip-group
                v-model="selection"
                active-class="deep-purple accent-4 white--text"
                column
            >
              <v-chip>ČESKO</v-chip>

              <v-chip>DRAW</v-chip>

              <v-chip>ŠVÉDSKO</v-chip>
            </v-chip-group>
          </v-card-text>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text>
              Reserve
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="mx-auto my-12" max-width="374">
          <v-card-title>Česko vs Švédsko</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <div class="grey--text">
                Kurz 1,12 : 2,8
              </div>
            </v-row>

          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>Vítěz</v-card-title>

          <v-card-text>
            <v-chip-group
                v-model="selection"
                active-class="deep-purple accent-4 white--text"
                column
            >
              <v-chip>ČESKO</v-chip>

              <v-chip>DRAW</v-chip>

              <v-chip>ŠVÉDSKO</v-chip>
            </v-chip-group>
          </v-card-text>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text>
              Reserve
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="mx-auto my-12" max-width="374">
          <v-card-title>Česko vs Švédsko</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <div class="grey--text">
                Kurz 1,12 : 2,8
              </div>
            </v-row>

          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-title>Vítěz</v-card-title>

          <v-card-text>
            <v-chip-group
                v-model="selection"
                active-class="deep-purple accent-4 white--text"
                column
            >
              <v-chip>ČESKO</v-chip>

              <v-chip>DRAW</v-chip>

              <v-chip>ŠVÉDSKO</v-chip>
            </v-chip-group>
          </v-card-text>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text>
              Reserve
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>


  </div>
</template>

<script>
export default {
  name: "resolution.vue",
  data: () => ({
    search: '',
    headers: [
      {
        text: 'Jméno',
        align: 'left',
        sortable: false,
        value: 'displayName',
      },
      {text: 'Email', value: 'email'},
      {text: 'Právo administrace', value: 'isAdmin'},
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
