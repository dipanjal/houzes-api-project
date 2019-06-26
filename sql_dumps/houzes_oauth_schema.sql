-- Adminer 4.3.1 PostgreSQL dump

\connect "ra_houzes";

DROP TABLE IF EXISTS "oauth_access_tokens";
CREATE SEQUENCE oauth_access_tokens_id_seq INCREMENT  MINVALUE  MAXVALUE  START 1 CACHE ;

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
CREATE SEQUENCE oauth_authorization_codes_id_seq INCREMENT  MINVALUE  MAXVALUE  START 1 CACHE ;

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
CREATE SEQUENCE oauth_clients_id_seq INCREMENT  MINVALUE  MAXVALUE  START 1 CACHE ;

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
CREATE SEQUENCE oauth_refresh_tokens_id_seq INCREMENT  MINVALUE  MAXVALUE  START 1 CACHE ;

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
CREATE SEQUENCE oauth_scopes_id_seq INCREMENT  MINVALUE  MAXVALUE  START 1 CACHE ;

CREATE TABLE "public"."oauth_scopes" (
    "id" integer DEFAULT nextval('oauth_scopes_id_seq') NOT NULL,
    "scope" text,
    "is_default" boolean,
    "createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
    CONSTRAINT "oauth_scopes_pk" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "oauth_users";
CREATE SEQUENCE users_id_seq INCREMENT  MINVALUE  MAXVALUE  START 1 CACHE ;

CREATE TABLE "public"."oauth_users" (
    "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
    "email" text,
    "password" text,
    "scope" text,
    "createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp,
    "first_name" text,
    "last_name" text,
    CONSTRAINT "oauth_users_username_uindex" UNIQUE ("email"),
    CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (oids = false);


create table verification_codes
(
	id serial not null
		constraint verification_codes_pk
			primary key,
	code text,
	user_email text not null,
	expired_at timestamp,
	is_used boolean default false,
	verification_type text,
	"createdAt" timestamp,
	"updatedAt" timestamp
);



-- 2019-05-17 12:14:40.056065+06