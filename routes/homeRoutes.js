const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authtoken");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
    try {
        const token = req.cookies['auth&token'];
        if (token) {
            jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
                if (err) {
                    return res.render("index.ejs");
                }
                return res.redirect('/dashboard');
            });
        } else {
            res.render("index.ejs");
        }
    } catch (error) {
        res.render("error.ejs");
    }
});

router.get("/signup", async (req, res) => {
    try {
        const token = req.cookies['auth&token'];
        if (token) {
            jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
                if (err) {
                    return res.render("signup.ejs");
                }
                return res.redirect('/dashboard');
            });
        } else {
            res.render("signup.ejs");
        }
    } catch (error) {
        res.render("error.ejs");
    }
});

router.get("/login", async (req, res) => {
    try {
        const token = req.cookies['auth&token'];
        if (token) {
            jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
                if (err) {
                    return res.render("login.ejs");
                }
                return res.redirect('/dashboard');
            });
        } else {
            res.render("login.ejs");
        }
    } catch (error) {
        console.log(error);
        res.render("error.ejs");
    }
});

router.get("/dashboard", authMiddleware, async (req, res) => {
    try {
        res.render("dashboard.ejs");
    } catch (error) {
        res.render("error.ejs");
    }
});

router.get("/course", async (req, res) => {
    try {
        const token = req.cookies['auth&token'];
        if (token) {
            jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
                if (err) {
                    return res.render("course.ejs");
                }
                return res.redirect('/dashboard');
            });
        } else {
            res.render("course.ejs");
        }
    } catch (error) {
        res.render("error.ejs");
    }
});


router.get("/account", async (req, res) => {
    try {
        const token = req.cookies['auth&token'];
        if (token) {
            jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
                if (err) {
                    return res.render("login.ejs");
                }
                return res.render("account.ejs", { user: decoded });
            });
        } else {
            res.render("account.ejs");
        }
    } catch (error) {
        res.render("error.ejs");
    }
});


router.get('*', (req, res) => {
    res.status(404).render("error.ejs", { message: 'Page not found.' });
});

module.exports = router;
