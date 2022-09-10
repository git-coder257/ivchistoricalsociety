const app2 = express()
app2.use(express.static("./http"))

app2.get("/", (req, res) => {
    res.sendFile("./http/index.html")
})

app2.listen(80)