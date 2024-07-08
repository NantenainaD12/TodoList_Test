create database todolist_test;
\c todolist_test

CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    email VARCHAR(255)
);

INSERT INTO utilisateurs (nom, email) VALUES ('Alice', 'alice@example.com');
INSERT INTO utilisateurs (nom, email) VALUES ('Bob', 'bob@example.com');

SELECT * FROM utilisateurs;



CREATE TABLE Task (
    idTask SERIAL PRIMARY KEY,
    title VARCHAR(120),
    descriptionTask VARCHAR(255),
    dateCreation TIMESTAMP, -- Use TIMESTAMP for date and time
    dateFinish TIMESTAMP
);
CREATE TABLE TaskDeleted (
    idTask integer REFERENCES Task(idTask),
    dateDelete date
);

CREATE  or replace VIEW v_taskDone_or_not AS
SELECT *,
       CASE WHEN dateFinish IS NOT NULL THEN true ELSE false END AS isFinish
FROM Task
WHERE Task.idTask NOT IN (SELECT idTask FROM TaskDeleted);



INSERT INTO Task (title, descriptionTask, dateCreation, dateFinish)
VALUES
    ('Task 1', 'Description for Task 1', '2024-07-08 10:00:00', '2024-07-10 15:30:00'),
    ('Task 2', 'Description for Task 2', '2024-07-08 14:00:00', '2024-07-10 15:30:00'),
    ('Task 3', 'Description for Task 3', '2024-07-09 17:00:00',null);


INSERT into TaskDeleted values(2,'2024-07-08 14:00:00');




