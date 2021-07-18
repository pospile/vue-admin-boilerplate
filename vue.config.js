module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    "devServer": {
        host: "0.0.0.0",
        disableHostCheck: true,
        proxy: {
            "^/": {
                target: "be",
                changeOrigin: true
            }
        }
    },
    "outputDir": "../sazkovac/public"
}
