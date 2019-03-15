```sh
42sh$ docker pull postgres
42sh$ docker run --name postgres -e POSTGRES_PASSWORD=postgres -d postgres
```

```sql
CREATE ROLE user_dev login password 'passwd_dev';
CREATE DATABASE db_dev;
GRANT ALL ON DATABASE db_dev TO user_dev;
```

```sh
42sh$ cp ./config/nginx.dev.conf /etc/nginx/cdv.conf
```
