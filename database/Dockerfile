FROM mysql:8.0

# Set default MySQL environment variables
ENV MYSQL_DATABASE=cbad_db
ENV MYSQL_USER=cbad_user
ENV MYSQL_PASSWORD=cbad_password_2026
ENV MYSQL_ROOT_PASSWORD=cbad_root_secret

# Copy DDL schema and seed DML into docker entrypoint dir for auto-initialization
COPY schema.sql /docker-entrypoint-initdb.d/01_schema.sql
COPY seed.sql /docker-entrypoint-initdb.d/02_seed.sql

EXPOSE 3306
