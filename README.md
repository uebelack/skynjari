# Skynjari

## Development

### InfluxDB
You need a InfluxDB instance running. You can use the docker-compose file in the root of the project to start one.

```bash
docker-compose up
```


## Configuration

### InfluxDB
InfluxDB connection can be configured via environment variables:

| Variable | Default | Description   |
|---|---|---|
| INFLUX_DB_URL | http://localhost:8086 | URL to the InfluxDB instance |
| INFLUX_DB_TOKEN | skynjari | Token to use for authentication |
| INFLUX_DB_ORG | skynjari | Organization to use |
| INFLUX_DB_BUCKET | skynjari | Bucket to use |
