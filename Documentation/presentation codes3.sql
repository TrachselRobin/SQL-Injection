-- Erstellen der Prozedur
DELIMITER //
CREATE PROCEDURE GetUserByName(IN userName VARCHAR(50))
BEGIN
    SELECT * FROM users WHERE name = userName;
END //
DELIMITER ;
