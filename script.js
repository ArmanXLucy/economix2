import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg"

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "economix",
    password: "#Arman2005",
    port: 5432,
})
db.connect()

// Serve static files from a "public" directory (optional but useful)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.post("/signin", async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log("email: ", email);
    console.log("password: ", password);
    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1 AND password = $2", [email, password]);

        if (result.rows.length > 0) {
            res.sendFile(path.join(__dirname, "homepage.html"));
        } else {
            res.send("Invalid email or password");
        }
    } catch (err) {
        console.error(err);
        res.send("Error during login");
    }
})

app.post("/signup", async(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log("name:", name);
    console.log("email:", email);
    console.log("password:", password);
        const into= await db.query("INSERT INTO users (name,email,password) VALUES ($1,$2,$3) ",[
        name,email,password
    ])
    try{
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if(result.rows.length>0){
            res.sendFile(path.join(__dirname, "homepage.html"));

        }else{
            res.send("Email already exists")
        }
    }catch(err){
        console.log("Error: ",err);
        res.send("Error during send")
    }
});



app.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
});
