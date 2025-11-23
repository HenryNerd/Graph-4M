import Database from 'better-sqlite3'
var db = new Database("main.db")

db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author STRING,
        title STRING,
        content STRING
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username STRING,
        realname STRING,
        password STRING
    )    
`)