var pg = require('pg');
var bitacora = require('../Funciones/bitacora');
//var connect = "PostgreSQL://postgres:pruebas@127.0.0.1/postgres";
var connect = "PostgreSQL://postgres:fernandez@45.63.11.179/LUP";

function testConnection(reply) {
  pg.connect(connect, function(err, client, done) {
    if (err) {
      bitacora.error(err.stack);
      reply({ success: false,  message: err.stack });
    } else {
      reply({ success: true, message: "Connected successfully" });
    }
  });
}

function show(fields, table, restriction, order, reply) {
  var query = "";
  pg.connect(connect, function(err, client, done) {
    if (fields != "") {
      query = query + " SELECT " + fields;
      if (table != "") {
        query = query + " FROM " + table;
        if (restriction != "")  query = query + " WHERE " + restriction;
        if (order != "") {
          query = query + " ORDER BY " + order;
        } else {
          query = query + " ORDER BY 1";
        }
      } else {
        reply({ success: false, data: null });
      }
    } else {
      reply({ success: false, data: null });
    }
    bitacora.dblog(query);
    client.query(query, function(err, result) {
      done();
      if (err) {
        reply({ success: false, data: null });
        db.error(err.stack);
      } else {
        reply({ success: true, data: result });
      }
    });
  });
}

function showNoOrder(fields, table, restriction, reply) {
  var query = "";
  pg.connect(connect, function(err, client, done) {
    if (fields != "") {
      query = query + " SELECT " + fields;
      if (table != "") {
        query = query + " FROM " + table;
        if (restriction != "") {
          query = query + " WHERE " + restriction;
        }
      } else {
        reply({ success: false, data: null });
      }
    } else {
      reply({ success: false, data: null });
    }
    bitacora.dblog(query);
    client.query(query, function(err, result) {
      done();
      if (err) {
        reply({ success: false, data: null });
        db.error(err.stack);
      } else {
        reply({ success: true, data: result });
      }

    });
  });
}

function Correr(query, reply) {
  bitacora.dblog(query);
  pg.connect(connect, function(err, client, done) {
    if (query != "") {
    } else {
      reply({ success: false, data: null });
    }
    client.query(query, function(err, result) {
      done();
      if (err) {
        reply({ success: false, data: null, err: err.stack });
        bitacora.error(err.stack);
      } else {
        reply({ success: true, data: result });
      }
    });
  });
}

function addIdentity(fields, table, values, llave, reply) {
  var query = "";
  pg.connect(connect, function(err, client, done) {
    if (table != "") {
      query = query + " INSERT INTO " + table;
      if (fields != "") {
        query = query + "(" + fields + ")";
        if (values != "") query = query + "VALUES(" + values + ")";
        if (llave != "")  query = query + " returning " + llave
      } else {
        reply({ success: false, data: null });
      }
    } else {
      reply({ success: false, data: null });
    }
    bitacora.dblog(query);
    client.query(query, function(err, result) {
      done();
      if (err) {
        reply({ success: false, data: null });
        db.error(err.stack);
      } else {
        reply({ success: true, data: result });
      }

    });
  });

}

function add(fields, table, values, reply) {
  var query = "";
  pg.connect(connect, function(err, client, done) {
    if (table != "") {
      query = query + " INSERT INTO " + table;
      if (fields != "") {
        query = query + "(" + fields + ")";
        if (values != "") query = query + "VALUES(" + values + ")";
      } else {
        reply({ success: false, data: null });
      }
    } else {
      reply({ success: false, data: null });
    }
    bitacora.dblog(query);
    client.query(query, function(err, result) {
      done();
      if (err) {
        reply({ success: false, data: null, err: err.stack });
        console.log(err.stack);
        bitacora.error(err.stack);
      } else {
        reply({ success: true, data: result });
      }
    });
  });
}

function update(set, table, restriction, reply) {
  var query = "";
  pg.connect(connect, function(err, client, done) {
    if (table != "") {
      query = query + " UPDATE " + table;
      if (set != "") {
        query = query + " SET " + set;
        if (restriction != "") {
          query = query + " WHERE " + restriction;
        } else {
          reply({ success: false, data: null });
        }
      } else {
        reply({ success: false, data: null });
      }
    } else {
      reply({ success: false, data: null });
    }
    bitacora.dblog(query);
    client.query(query, function(err, result) {
      done();
      if (err) {
        reply({ success: false, data: null });
        bitacora.error(err.stack);
      } else {
        reply({ success: true, data: result });
      }
    });
  });
}

function remove(table, restriction, reply) {
  var query = "";
  pg.connect(connect, function(err, client, done) {
    if (table != "") {
      query = query + " DELETE FROM " + table;
      if (restriction != "") {
        query = query + " WHERE " + restriction;
      } else {
        reply({ success: false, data: null });
      }
    } else {
      reply({ success: false, data: null });
    }
    bitacora.dblog(query);
    client.query(query, function(err, result) {
      done();
      if (err) {
        reply({ success: false, data: null });
        bitacora.error(err.stack);
      } else {
        reply({ success: true, data: result });
      }
    });
  });
}

function addSelect(fields, table, values, reply) {
  var query = "";
  pg.connect(connect, function(err, client, done) {
    if (table != "") {
      query = query + " INSERT INTO " + table;
      if (fields != "") {
        query = query + "(" + fields + ")";
        if (values != "") {
          query = query + "(" + values + ")";
        } else {
          reply({
            success: false, data: null });
        }
      } else {
        reply({
          success: false, data: null });
      }
    } else {
      reply({ success: false, data: null });
    }
    bitacora.dblog(query);
    client.query(query, function(err, result) {
      done();
      if (err) {
        reply({ success: false, data: null });
        db.error(err.stack);
      } else {
        reply({ success: true, data: result });
      }
    });
  });
}

exports.testConnection = testConnection;
exports.show = show;
exports.showNoOrder = showNoOrder;
exports.add = add;
exports.update = update;
exports.remove = remove;
exports.addIdentity = addIdentity;
exports.addSelect = addSelect;
exports.Correr = Correr;
