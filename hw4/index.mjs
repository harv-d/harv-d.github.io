import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Home"
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Hardware route
app.get("/hardware", (req, res) => {
    res.render("hardware", {
        title: "Hardware"
    });
});

// Protocols route
app.get("/protocols", (req, res) => {
    res.render("protocols", {
        title: "Protocols"
    });
});

// Security route
app.get("/security", (req, res) => {
    res.render("security", {
        title: "Security"
    });
});

// Tools route
app.get("/tools", (req, res) => {
    res.render("tools", {
        title: "Network Tools"
    });
});