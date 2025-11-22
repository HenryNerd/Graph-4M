import Database from 'better-sqlite3';

// let db: InstanceType<typeof Database>;

declare global {
    var _db: Database.Database | undefined
}

const db = global._db || new Database("main.db")
if(!global._db) {
    global._db = db
}

export default db