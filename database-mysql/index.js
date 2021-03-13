const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Bh97488220',
  database : 'purchase_list'
});

// ****** Admin/Items Methods *******
const getIems = (callback)=> {
  connection.query(`SELECT item, price FROM items`, (err, items)=> {
    err ? callback(err, null) : callback(null, items)});
};

const addItem = function({item, price}, callback) {
  connection.query(`INSERT INTO items (item, price) VALUES (?, ?)`,[item, price],
         (err, result)=> err ? callback(err, null) : callback(null, result))
};

const setPrice = (itemID, newPrice, callback)=> {
  connection.query(`UPDATE items SET price = ${newPrice} WHERE id = ${itemID}`,
            (err, result)=> {err ? callback(err, null) : callback(null, result)})};

const dropItem = (itemID, callback)=> {
  connection.query(`DELETE FROM items WHERE id = ${itemID}`,(err, result)=> {
                    err ? callback(err, null) : callback(null, result)})
};

// ****** Admin/Users Methods *******
const getUsers = (callback)=> {
  connection.query(`SELECT firstname, lastname FROM users`, (err, users)=> {
    err ? callback(err, null) : callback(null, users)});
};

const addUser = (firstname, lastname , callback)=> {
  connection.query(`INSERT INTO users (firstname, lastname) VALUES (?, ?)`, [firstname, lastname],
                    (err, result)=> {err ? callback(err, null) : callback(null, result)});
};

const deleteUser = (userID, callback)=> {
  connection.query(`DELETE FROM users WHERE id = ${userID}`, (err, result)=> {
                    err ? callback(err, null) : callback(null, result)});
};

// ****** history Methods *******
const getHistory = (callback)=> {
  var sql = `SELECT users.firstname, items.item, qte, l_price, date 
             FROM purchase_history
             INNER JOIN users ON users.id = purchase_history.user_id
             INNER JOIN items ON items.id = purchase_history.item_id
             ORDER BY purchase_history.date DESC;`
  connection.query(sql, (err, result)=> {err ? callback(err, null) : callback(null, result)})
}

const addPurchase = ({user_id, item_id, qte, l_price}, callback)=> {
  connection.query(`INSERT INTO purchase_history (user_id, item_id, qte, l_price) VALUES (?, ?, ?, ?)`,
    [user_id, item_id, qte, l_price], (err, result)=> {err ? callback(err, null) : callback(null, result)})
} 


module.exports = {
  getIems,
  addItem,
  setPrice,
  dropItem,
  getUsers,
  addUser,
  deleteUser,
  getHistory,
  addPurchase
}
