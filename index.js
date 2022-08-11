const express = require("express")
const fs = require("fs")

const app = express()
app.use(express.json())
app.use(express.static("./build"))

const PORT = 8080

app.get("/presentations", (req, res) => {
    try {
        fs.readFile("./presentations.json", "utf8", (err, data) => {
            if (err){
                console.error(err)
                res.json({
                    success: true,
                    error: false,
                    presentations: []
                })
            } else {
                let response = {
                    success: true,
                    error: false,
                    presentations: JSON.parse(data.toString()).presentations
                }
                if (response.presentations.length > 5){
                    response.presentations.splice(5, response.presentations - 5)
                }
                res.json(response)
            }
        })
    } catch (error) {
        console.error(error)
    }
})

app.post("/presentation/:email", (req, res) => {
    try {
        fs.readFile("./presentations", "utf8", (err, data) => {
            if (err){
                console.error(err)
                res.json({
                    success: true,
                    error: false,
                    presentations: []
                })
            } else {
                let response = {
                    success: true,
                    error: false
                }

                let file = JSON.parse(data.toString())
                file.presentationinterests.push(
                    {
                        email: req.params.email,
                        presentation: req.body.presentation
                    }
                )
            }
        })
    } catch (error) {
        console.error(error)
    }
})

app.get("/", (req, res) => {
    res.sendFile("./build/index.html")
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})