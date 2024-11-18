-- init.sql
--CREATE TABLE users (
--  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--  name VARCHAR(50) NOT NULL,
--  password VARCHAR(50) NOT NULL
--);

-- table creation
CREATE TABLE PCs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  owned_by UUID
);

CREATE TABLE feature (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(25) NOT NULL
);

CREATE TABLE PCfeature (
  pc_id UUID NOT NULL,
  feature_id UUID NOT NULL
);

CREATE TABLE reservations(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pc_id UUID NOT NULL,
  reserved_by UUID NOT NULL,
  start_timestamp TIMESTAMP NOT NULL,
  end_timestamp TIMESTAMP NOT NULL
);

-- insert initial elements
INSERT INTO PCs (name, owned_by) VALUES ('Microsoft Surface Laptop Go 2', NULL );
INSERT INTO PCs (name, owned_by) VALUES ('Microsoft Surface Laptop Go 2', NULL );
INSERT INTO PCs (name, owned_by) VALUES ('Microsoft Surface Laptop Go 2', NULL );

INSERT INTO PCs (name, owned_by) VALUES ('Lenovo IdeaPad Slim 370i 82RK00BCJP', NULL );
INSERT INTO PCs (name, owned_by) VALUES ('Lenovo IdeaPad Slim 370i 82RK00BCJP', NULL );

INSERT INTO PCs (name, owned_by) VALUES ('HP Spectre x360 6F8L0PA-AAAB', NULL );

INSERT INTO PCs (name, owned_by) VALUES ('dynabook C7 P2C7VBEL', NULL );

INSERT INTO PCs (name, owned_by) VALUES ('ASUS TUF Dash F15 FX517ZC', NULL );

--INSERT INTO reservations (reserved_by, start_timestamp, end_timestamp) VALUES (
--  (SELECT id FROM PCs ORDER BY id ASC LIMIT 1),
--  NOW(),
--  NOW() + interval '60 minutes'
--);
