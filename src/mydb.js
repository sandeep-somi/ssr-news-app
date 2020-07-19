import Dexie from 'dexie';

var db = new Dexie('news-app');

db.version(1).stores({
    hits: '++id, objectID'
});

export default db;
