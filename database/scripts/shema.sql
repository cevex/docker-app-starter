DROP TABLE IF EXISTS t_user cascade;

CREATE TABLE t_user (
    user_id bigserial CONSTRAINT t_user_pk PRIMARY KEY,
    user_email varchar(260),
    user_password varchar(60),
    user_name varchar(50),
    user_phone varchar(20),
    user_image bytea
);

INSERT INTO t_user (user_name, user_password, user_phone, user_email)
    VALUES  ('Boby', '123', '0645896285', 'boby@test.com'),
            ('Joe', 'MonMotDePasse','0646846298', 'joe.blo@test.com'),
            ('Mel', '123','0645896269', 'boby@test.com'),
            ('Will', '123','0645896269', 'boby@test.com');