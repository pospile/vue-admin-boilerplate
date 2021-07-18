module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    "devServer": {
        host: "0.0.0.0",
        proxy: {
            "^/": {
                target: "be",
                changeOrigin: true
            }
        }
    },
    "outputDir": "../sazkovac/public"
}
