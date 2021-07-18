module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    "devServer": {
        proxy: {
            "^/": {
                target: "https://be-2002f-3001.app.zerops.io",
                changeOrigin: true
            }
        }
    },
    "outputDir": "../sazkovac/public"
}
