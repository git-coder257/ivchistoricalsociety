const express = require("express")
const fs = require("fs")
const uuid = require("uuid").v4

const app = express()
app.use(express.json())
app.use(express.static("./build"))
app.use(express.static("./EB499FAE0E869559E394EB775647A51E.txt"))

const app2 = express()
app2.use(express.static("./http"))

app2.get("/", (req, res) => {
    res.sendFile("./http/index.html")
})

app2.listen(80)

const PORT = 443

var https = require('https');

var https_options = {
  key: fs.readFileSync("./private_key.key"),
  cert: fs.readFileSync("./ivchistoricalsociety.com.crt"),
  ca: [

          fs.readFileSync('./ivchistoricalsociety.com.p7b'),
          fs.readFileSync('./ivchistoricalsociety.com.ca-bundle')
       ]
}

https.createServer(https_options, app).listen(PORT)

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
        fs.readFile("./presentations.json", "utf8", (err, data) => {
            if (err){
                console.error(err)
                res.json({
                    success: true,
                    error: false,
                    presentations: []
                })
            } else {
                let file = JSON.parse(data.toString())
                file.presentationinterests.push(
                    {
                        email: req.params.email,
                        presentation: req.body.presentation,
                        uuid: uuid()
                    }
                )

                fs.writeFile("./presentations.json", JSON.stringify(file, null, 2), "utf8", (err) => {
                    if (err){
                        console.error(err)
                        res.json({
                            success: false,
                            error: true
                        })
                    } else {
                        res.json({
                            success: true,
                            error: false
                        })
                    }
                })
            }
        })
    } catch (error) {
        console.error(error)
    }
})

app.get("/presentationinterests/:passcode", (req, res) => {
    try {
        if (req.params.passcode === "8342"){
            fs.readFile("./presentations.json", "utf8", (err, data) => {
                if (err){
                    console.error(err)
                    res.json({
                        success: false,
                        error: true,
                        presentations: []
                    })
                } else {
                    let response = {
                        success: true,
                        error: false,
                        presentations: []
                    }
                    response.presentations = JSON.parse(data).presentationinterests
    
                    res.json(
                        response
                    )
                }
            })
        } else {
            res.json({
                success: true,
                error: false,
                presentations: []
            })
        }
    } catch (error) {
        console.error(error)
    }
})

app.put("/presentation/:passcode/:uuid", (req, res) => {
    try {
        if (req.params.passcode === "8342"){
            fs.readFile("./presentations.json", "utf8", (err, data) => {
                if (err){
                    console.error(err)
                    res.json({
                        success: false,
                        error: true
                    })
                } else {
                    let response = {
                        success: true,
                        error: false
                    }

                    let file = JSON.parse(data.toString())
                    let presentations = file.presentationinterests
                    let index
                    let presentation

                    presentations.forEach((element, i) => {
                        if (element.uuid === req.params.uuid){
                            index = i
                            presentation = element
                        }
                    })

                    if (index === undefined){
                        console.log(":(")
                        response.success = false
                    } else {
                        presentations.splice(index, 1)
                        console.log(presentations)
                        file.presentationinterests = presentations
                        file.presentations.push(presentation)
                    }

                    fs.writeFile("./presentations.json", JSON.stringify(file, null, 2), "utf8", (err) => {
                        if (err){
                            console.error(err)
                            res.json({
                                success: false,
                                error: true
                            })
                        } else {
                            console.log("I made it here")
                            res.json(
                                response
                            )
                        }
                    })
                }
            })
        } else {
            res.json({
                success: false,
                error: false
            })
        }
    } catch (error) {
        console.error(error)
    }
})

app.delete("/presentationinterest/:passcode/:uuid", (req, res) => {
    try {
        if (req.params.passcode === "8342"){
            fs.readFile("./presentations.json", "utf8", (err, data) => {
                if (err){
                    console.error(err)
                    res.json({
                        success: false,
                        error: true
                    })
                } else {
                    let response = {
                        success: true,
                        error: false
                    }

                    let file = JSON.parse(data.toString())
                    let presentations = file.presentationinterests
                    let index

                    presentations.forEach((element, i) => {
                        if (element.uuid === req.params.uuid){
                            index = i
                        }
                    })

                    if (index === undefined){
                        response.success = false
                    } else {
                        presentations.splice(index, 1)
                        console.log(presentations)
                        file.presentationinterests = presentations
                    }

                    fs.writeFile("./presentations.json", JSON.stringify(file, null, 2), "utf8", (err) => {
                        if (err){
                            console.error(err)
                            res.json({
                                success: false,
                                error: true
                            })
                        } else {
                            res.json(
                                response
                            )
                        }
                    })
                }
            })
        } else {
            res.json({
                success: false,
                error: false
            })
        }
    } catch (error) {
        console.error(error)
    }
})

app.delete("/presentation/:passcode/:uuid", (req, res) => {
    try {
        if (req.params.passcode === "8342"){
            fs.readFile("./presentations.json", "utf8", (err, data) => {
                if (err){
                    console.error(err)
                    res.json({
                        success: false,
                        error: true
                    })
                } else {
                    let response = {
                        success: true,
                        error: false
                    }

                    let file = JSON.parse(data.toString())
                    let presentations = file.presentations
                    let index

                    presentations.forEach((element, i) => {
                        if (element.uuid === req.params.uuid){
                            index = i
                        }
                    })

                    if (index === undefined){
                        response.success = false
                    } else {
                        presentations.splice(index, 1)
                        console.log(presentations)
                        file.presentations = presentations
                    }

                    fs.writeFile("./presentations.json", JSON.stringify(file, null, 2), "utf8", (err) => {
                        if (err){
                            console.error(err)
                            res.json({
                                success: false,
                                error: true
                            })
                        } else {
                            res.json(
                                response
                            )
                        }
                    })
                }
            })
        } else {
            res.json({
                success: false,
                error: false
            })
        }
    } catch (error) {
        console.error(error)
    }
})

app.get("/", (req, res) => {
    res.sendFile("./build/index.html")
})

app.get("/presinterests", (req, res) => {
    res.sendFile(`${__dirname}/build/index.html`)
})

app.get("/.well-known/pki-validation/EB499FAE0E869559E394EB775647A51E.txt", (req, res) => {
    console.log("hi")
    res.sendFile(`${__dirname}/EB499FAE0E869559E394EB775647A51E.txt`)
})

// app.listen(PORT, () => {
//     console.log(`Server running on port: ${PORT}`)
// })