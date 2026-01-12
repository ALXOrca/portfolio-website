const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts"); // ADD THIS

const app = express();
const PORT = 3000;

// ==================== MIDDLEWARE ====================
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// ==================== EJS & LAYOUT SETUP ====================
app.use(expressLayouts); // Enable EJS layouts
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layout"); // Default layout is views/layout.ejs

// ==================== ROUTES ====================

// RAW TEST - Direct HTML (no EJS)
app.get("/rawtest", (req, res) => {
    console.log("? RAW TEST route hit");
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Raw Test</title></head>
        <body>
            <h1 style="color: green;">? RAW HTML TEST</h1>
            <p>If you see this, Express is working.</p>
        </body>
        </html>
    `);
});

// EJS TEST 1 - WITH LAYOUT (default)
app.get("/ejstest-with-layout", (req, res) => {
    console.log("? EJS TEST WITH LAYOUT route hit");
    res.render("minimal", {
        title: "EJS Test - With Layout",
        activePage: "test"
        // Uses default layout automatically
    });
});

// EJS TEST 2 - WITHOUT LAYOUT
app.get("/ejstest-no-layout", (req, res) => {
    console.log("? EJS TEST NO LAYOUT route hit");
    res.render("minimal", {
        title: "EJS Test - No Layout",
        activePage: "test",
        layout: false  // Disable layout
    });
});

// TEST PAGE (test.ejs)
app.get("/layouttest", (req, res) => {
    console.log("? LAYOUT TEST route hit");
    res.render("test", {
        title: "Layout Test | Your Name",
        activePage: "test"
    });
});

// HOME PAGE - Your portfolio
app.get("/", (req, res) => {
    console.log("? HOME PAGE route hit");
    res.render("index", {
        title: "Home | Your Name",
        activePage: "home"
    });
});

// OTHER PAGES
app.get("/projects", (req, res) => {
    res.render("projects", {
        title: "Projects | Your Name",
        activePage: "projects"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About | Your Name",
        activePage: "about"
    });
});

app.get("/contact", (req, res) => {
    res.render("contact", {
        title: "Contact | Your Name",
        activePage: "contact"
    });
});

// 404 HANDLER
app.use((req, res) => {
    res.status(404).render("404", {
        title: "404 | Page Not Found",
        activePage: "none"
    });
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
    console.log("=".repeat(60));
    console.log("?? SERVER WITH EXPRESS-EJS-LAYOUTS STARTED");
    console.log("=".repeat(60));
    console.log("Test URLs:");
    console.log("1. Express test:       http://localhost:${PORT}/rawtest");
    console.log("2. EJS with layout:    http://localhost:${PORT}/ejstest-with-layout");
    console.log("3. EJS no layout:      http://localhost:${PORT}/ejstest-no-layout");
    console.log("4. Layout test:        http://localhost:${PORT}/layouttest");
    console.log("5. Home page:          http://localhost:${PORT}/");
    console.log("=".repeat(60));
    console.log("IMPORTANT: Use incognito/private window or clear cache!");
    console.log("=".repeat(60));
});
