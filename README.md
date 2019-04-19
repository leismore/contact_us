# Leismore Contact-us System

A RESTFul API written by Node.js, providing Contact-us service for a company.

## Deployment

There are two configuration files, which may need to be modified:

* `./config.json`            - The app-level configuration options
* `./credentials/email.json` - The sensitive data for your email host

In most cases, these fields should be changed accordingly:

* In `./config.json`
  - `app.port`
  - `emailSender`
  - `emailReceiver`

* In `./credentials/email.json`
  - `host`
  - `auth.user`
  - `auth.pass`

## Author

Winfred K. Qin


---

- Winfred K. Qin
- The president of [Leismore Ltd.](https://www.leismore.co)
- April 19, 2019
