\echo 'Delete and recreate vaccine_hub database?'
\prompt 'Press ENTER for YES or CTRL-C to CANCEL > ' answer


DROP DATABASE vaccine_hub;
CREATE DATABASE vaccine_hub;
\connect vaccine_hub

\i vaccine_hub_schema.sql