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

INSERT INTO "oauth_access_tokens" ("id", "access_token", "expires", "scope", "client_id", "user_id", "createdAt", "updatedAt") VALUES
(35,	'efbb240727615751698b353510f7b4fb5c186d7e',	'2019-05-12 07:50:55.02',	'true',	1,	1,	'2019-05-12 06:50:55.025',	'2019-05-12 06:50:55.025'),
(36,	'fd97e21f8e1f0635311ced30711da2df059db31f',	'2019-05-12 12:43:45.627',	'true',	1,	1,	'2019-05-12 11:43:45.635',	'2019-05-12 11:43:45.635'),
(37,	'5809d887ac730a1a4e69562487a035d56ffc8b3b',	'2019-05-12 14:48:28.763',	'true',	1,	1,	'2019-05-12 13:48:28.767',	'2019-05-12 13:48:28.767'),
(38,	'850b96ea84e7313a73c685c3cd9b9137db0dc13a',	'2019-05-13 00:35:18.142',	'true',	4,	2,	'2019-05-12 23:35:18.146',	'2019-05-12 23:35:18.146');

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

INSERT INTO "oauth_clients" ("id", "name", "client_id", "client_secret", "redirect_uri", "grant_types", "scope", "user_id", "createdAt", "updatedAt") VALUES
(100,	NULL,	'democlient',	'democlientsecret',	'http://localhost:3000/secret',	NULL,	NULL,	1,	'2019-05-10 16:15:08.90744',	NULL),
(2,	'Houzes_Android',	'houzes_android_client',	'houzes_android_secret',	NULL,	NULL,	'default',	2,	'2019-05-12 23:29:29.407',	'2019-05-12 23:29:29.407'),
(4,	'Houzes_iOS',	'houzes_ios_client',	'houzes_ios_secret',	NULL,	NULL,	'default',	2,	'2019-05-12 23:34:09.745',	'2019-05-12 23:34:09.745'),
(5,	'Houzes_web',	'houzes_web_client',	'houzes_web_secret',	NULL,	NULL,	'default',	2,	'2019-05-12 23:39:28.138',	'2019-05-12 23:39:28.138');

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

INSERT INTO "oauth_refresh_tokens" ("id", "refresh_token", "expires", "scope", "client_id", "user_id", "createdAt", "updatedAt") VALUES
(2,	'114c7714f43f427f9e6691cc66e41a8a2bec1574',	'2019-05-26 06:24:09.975',	'true',	1,	1,	'2019-05-12 06:24:09.983',	'2019-05-12 06:24:09.983'),
(35,	'e0f7097768b2ada85c5504dff7014927b0df4ed3',	'2019-05-26 06:50:55.02',	'true',	1,	1,	'2019-05-12 06:50:55.026',	'2019-05-12 06:50:55.026'),
(36,	'75efbe7d64942e717d9a78acdaa9ef7f6b79f6fe',	'2019-05-26 11:43:45.627',	'true',	1,	1,	'2019-05-12 11:43:45.638',	'2019-05-12 11:43:45.638'),
(37,	'29901c4ced09110f2f5abacb8cf409e543ecf21b',	'2019-05-26 13:48:28.763',	'true',	1,	1,	'2019-05-12 13:48:28.769',	'2019-05-12 13:48:28.769'),
(38,	'a69312d0f0b7b3260831bc1e0af268e3b12e6d1b',	'2019-05-26 23:35:18.142',	'true',	4,	2,	'2019-05-12 23:35:18.147',	'2019-05-12 23:35:18.147');

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

INSERT INTO "oauth_users" ("id", "username", "password", "scope", "createdAt", "updatedAt") VALUES
(1,	'admin',	'admin',	'profile',	'2019-05-10 16:17:15.145463',	NULL),
(2,	'dipanjal',	'abc123',	'default',	'2019-05-12 17:16:10.887',	'2019-05-12 17:16:10.887');

-- 2019-05-13 11:03:14.044642+06
