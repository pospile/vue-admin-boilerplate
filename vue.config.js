module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    "devServer": {
        proxy: {
            "^/": {
                target: "http://localhost:3001/v1",
                changeOrigin: true
            }
        }
    },
    "outputDir": "../sazkovac/public"
}
