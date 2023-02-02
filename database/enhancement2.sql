INSERT INTO client(client_firstname, client_lastname, client_email, client_password)
VALUES('Tony', 'Stark', 'TonyStark@stark.com', 'Iam1ronM@n');

UPDATE client
SET client_type = 'Admin'
WHERE client_id = 1;

DELETE FROM client WHERE client_id = 1

