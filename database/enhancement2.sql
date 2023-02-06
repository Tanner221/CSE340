INSERT INTO client(client_firstname, client_lastname, client_email, client_password)
VALUES('Tony', 'Stark', 'TonyStark@stark.com', 'Iam1ronM@n');

UPDATE client
SET client_type = 'Admin'
WHERE client_id = 1;

DELETE FROM client WHERE client_id = 1

SELECT inv_make, inv_model FROM inventory i
JOIN classification c ON i.classification_id = c.classification_id
WHERE i.classification_id = 2