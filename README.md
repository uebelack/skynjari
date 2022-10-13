<div id="top"></div>

[![Build][build-shield]][build-url]
[![Coverage][coverage-shield]][coverage-url]
[![Language][language-shield]][build-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<br />
<div align="center">
  <a href="https://github.com/uebelack/skynjari">
    <img src="apps/frontend/src/assets/logo-512.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Skynjari</h3>
  <p align="center">
    Skynjari, Icelandic for sensors. Small app to easily visualize the data from all your sensors.
  </p>
</div>

## About


### Built With

* [Nx](https://nx.dev/)
* [Angular](https://angular.io/)
* [NestJS](https://nestjs.com/)


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

## License

MIT License. See `LICENSE.txt` for more information.


[build-shield]: https://img.shields.io/github/workflow/status/uebelacker/skynjari/Build.svg?style=for-the-badge
[build-url]: https://github.com/uebelacker/skynjari/actions/workflows/main.yml
[language-shield]: https://img.shields.io/github/languages/top/uebelacker/skynjari.svg?style=for-the-badge
[language-url]: https://github.com/uebelacker/skynjari
[coverage-shield]: https://img.shields.io/coveralls/github/uebelacker/skynjari.svg?style=for-the-badge
[coverage-url]: https://coveralls.io/github/uebelacker/skynjari
[license-shield]: https://img.shields.io/github/license/uebelacker/skynjari.svg?style=for-the-badge
[license-url]: https://github.com/uebelacker/skynjari/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/david-übelacker-600262222