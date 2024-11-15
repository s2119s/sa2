-- init.sql
--CREATE TABLE users (
--  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--  name VARCHAR(50) NOT NULL,
--  password VARCHAR(50) NOT NULL
--);

CREATE TABLE PCs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  owned_by UUID
);

CREATE TABLE reservations(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reserved_by UUID NOT NULL,
  start_timestamp TIMESTAMP NOT NULL,
  end_timestamp TIMESTAMP NOT NULL
);
