const { Parser } = require('node-sql-parser');
const users = require('./users.js');

const parser = new Parser();  // Create a new instance of the parser

function sanitizeSQL(sql) {
    return sql.replace(/`/g, '');  // Remove all backticks
}

function validateSQL(sql, username) {
    return new Promise((resolve) => {
        try {
            // Sanitize SQL to remove unsupported syntax
            const sanitizedSQL = sanitizeSQL(sql);

            // Split and clean SQL statements
            const sqlStatements = sanitizedSQL
                .split(';')
                .filter(statement => statement.trim() !== '')
                .map(statement => statement.trim());

            // Remove the last empty statement if exists
            // if last element of list starts with " --" then pop it
            if (sqlStatements[sqlStatements.length - 1].startsWith('--')) {
                sqlStatements.pop();
            }

            // Parse each SQL statement
            for (const statement of sqlStatements) {
                parser.astify(statement);  // This checks for syntax validity
            }

            if (sqlStatements.length > 1) {
                console.log("Multiple SQL statements detected. User " + username + " got it right!");

                // Log valid SQL statement in the user's history
                findUserByName(username).sql.push({
                    date: new Date().toISOString().split('T')[0],
                    time: new Date().toISOString().split('T')[1].split('.')[0],
                    query: sqlStatements.join('; ') + ';',  // Semicolon only for logging
                    valid: true
                });

                resolve({ valid: true, sql: sql});
            } else {
                console.log("Single SQL statement detected");

                findUserByName(username).sql.push({
                    date: new Date().toISOString().split('T')[0],
                    time: new Date().toISOString().split('T')[1].split('.')[0],
                    query: sql,
                    valid: false
                });
                
                resolve({ valid: false, sql: sql});
            }
        } catch (error) {
            // Save the invalid query to the user's history
            findUserByName(username).sql.push({
                date: new Date().toISOString().split('T')[0],
                time: new Date().toISOString().split('T')[1].split('.')[0],
                query: sql,
                valid: false
            });

            resolve({ valid: false, sql: sql});  // SQL is invalid
        }
    });
}

function findUserByName(name) {
    const user = users.find(user => user.name === name);
    
    if (user) {
        return user;
    }

    users.push({
        name: name,
        requests: [],
        sql: []
    });

    return users[users.length - 1];
}

module.exports = validateSQL;
