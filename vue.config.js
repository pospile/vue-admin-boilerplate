module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  "devServer": {
    "proxy": {
      "^/": {
        "target": "http://localhost:3001"
      }
    }
  },
  "outputDir": "..\\box-be\\public"
}
