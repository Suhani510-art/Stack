const express = require("express")
const noteModel = require("./models/note.models")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.post("/notes", async (req, res) => {

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Body missing" })
    }

    const { title, description } = req.body

    await noteModel.create({
        title,
        description
    })

    res.status(201).json({
        message: "Note created successfully"
    })
})

app.get("/notes", async (req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
})

app.delete('/notes/:id', async (req, res) => {
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted successfully"
    })
})

app.patch('/notes/:id', async (req, res) => {
    const id = req.params.id
    const { description } = req.body

    await noteModel.findByIdAndUpdate(id, { description })

    res.status(200).json({
        message: "Note updated successfully"
    })
})

module.exports = app
