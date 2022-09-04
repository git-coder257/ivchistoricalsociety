const express = require("express")
const fs = require("fs")
const uuid = require("uuid").v4

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

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})