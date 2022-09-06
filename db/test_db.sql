BEGIN TRANSACTION;
INSERT INTO "user" (id, name, pass, "isAdmin") VALUES (1, 'admin', 1234, true),(2,'user1',1234,false),(3,'user2',1234,false);
INSERT INTO task (title, description,status, "userId")
    VALUES ('Do one thing', 'Do one thing description', 'ToDo', 2),
        ('Did one thing','Did one thing description','Done',2),
        ('Did one thing a long time ago','Did one thing a long time ago description','Archived',2),
        ('User2 todo', 'User2 todo description', 'ToDo',3),
        ('User2 done','User2 done description','Done',3),
        ('User2 done','User2 archived description','Archived',3);
COMMIT;