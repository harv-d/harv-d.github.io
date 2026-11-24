import express from "express";
import si from "systeminformation";

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

// Network Tools route
app.get("/tools", async (req, res) => {

    let url = "https://ipinfo.io/8.8.8.8/json";
    let ipData = null;
    let networkData = [];

    // Web API
    try {
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        ipData = await response.json();

    } catch (error) {
        console.log("API Error:", error);
    }

    // Node package
    try {
        networkData = await si.networkInterfaces();

    } catch (error) {
        console.log("System Information Error:", error);
    }

    res.render("tools", {
        title: "Network Tools",
        ipData: ipData,
        networkData: networkData
    });
});