# React Admin Starter

## Introduction

This is a starter project for admin side with advanced React + Redux + Functional Programming architecture.
Not only frontend architecture, but also deployment with Docker and Ansible.

### libraries

* React
* Redux
* React Router
* Lodash/fp
* Recompose
* Redux Form
* Ant Design
* Recharts
* Webpack
* React Hot Loader
* Faker

## Installation

```bash
npm install
```

## Development

Start mock server

```bash
npm run mocker
```

Start dev server

```bash
npm start
```

## Production

Build static files

```bash
npm run build
```

Build docker image

```bash
Docker build -t react-admin-starter:latest ./
```

Deploy

```bash
ansible-playbook -i ./ansible/hosts/production.yml --extra-vars "version=latest" ./ansible/deploy.yml
```
