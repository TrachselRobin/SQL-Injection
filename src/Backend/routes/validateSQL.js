const parser = require('sql-parser');

function validateSQL(sql) {
    return new Promise((resolve) => {
        try {
            parser.parse(sql);
            resolve(true);  // SQL is valid
        } catch (error) {
            resolve(false);  // SQL is invalid
        }
    });
}

module.exports = validateSQL;
