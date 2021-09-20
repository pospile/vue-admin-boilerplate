module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    "devServer": {
        proxy: {
            "^/": {
                target: "http://localhost:3001",
                changeOrigin: true
            }
        }
    },
    "outputDir": "../sazkovac/public"
}


/*
PRODUCTION VALUES
module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    "devServer": {
        host: "0.0.0.0",
        disableHostCheck: true
    },
    "outputDir": "../sazkovac/public"
}

 */