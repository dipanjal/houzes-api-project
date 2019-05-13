-- Adminer 4.7.1 PostgreSQL dump

DROP TABLE IF EXISTS "oauth_access_tokens";
DROP SEQUENCE IF EXISTS oauth_access_tokens_id_seq;
CREATE SEQUENCE oauth_access_tokens_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."oauth_access_tokens" (
    "id" integer DEFAULT nextval('oauth_access_tokens_id_seq') NOT NULL,
    "access_token" text,
    "expires" timestamp,
    "scope" text,
    "client_id" integer,
    "user_id" integer,
    "createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
    CONSTRAINT "oauth_access_tokens_pk" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "oauth_authorization_codes";
DROP SEQUENCE IF EXISTS oauth_authorization_codes_id_seq;
CREATE SEQUENCE oauth_authorization_codes_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."oauth_authorization_codes" (
    "id" integer DEFAULT nextval('oauth_authorization_codes_id_seq') NOT NULL,
    "authorization_code" text,
    "expires" timestamp,
    "redirect_uri" text,
    "scope" text,
    "client_id" integer,
    "user_id" integer,
    "createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
    CONSTRAINT "oauth_authorization_codes_pk" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "oauth_clients";
DROP SEQUENCE IF EXISTS oauth_clients_id_seq;
CREATE SEQUENCE oauth_clients_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."oauth_clients" (
    "id" integer DEFAULT nextval('oauth_clients_id_seq') NOT NULL,
    "name" text,
    "client_id" text,
    "client_secret" text,
    "redirect_uri" text,
    "grant_types" text,
    "scope" text,
    "user_id" integer,
    "createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
    CONSTRAINT "oauth_clients_client_id_uindex" UNIQUE ("client_id"),
    CONSTRAINT "oauth_clients_pk" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "oauth_refresh_tokens";
DROP SEQUENCE IF EXISTS oauth_refresh_tokens_id_seq;
CREATE SEQUENCE oauth_refresh_tokens_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."oauth_refresh_tokens" (
    "id" integer DEFAULT nextval('oauth_refresh_tokens_id_seq') NOT NULL,
    "refresh_token" text,
    "expires" timestamp,
    "scope" text,
    "client_id" integer,
    "user_id" integer,
    "createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
    CONSTRAINT "oauth_refresh_tokens_pk" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "oauth_scopes";
DROP SEQUENCE IF EXISTS oauth_scopes_id_seq;
CREATE SEQUENCE oauth_scopes_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."oauth_scopes" (
    "id" integer DEFAULT nextval('oauth_scopes_id_seq') NOT NULL,
    "scope" text,
    "is_default" boolean,
    "createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
    CONSTRAINT "oauth_scopes_pk" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "oauth_users";
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."oauth_users" (
    "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
    "username" text,
    "password" text,
    "scope" text,
    "createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
    CONSTRAINT "oauth_users_username_uindex" UNIQUE ("username"),
    CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (oids = false);


-- 2019-05-13 11:20:40.440049+06