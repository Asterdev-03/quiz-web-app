<h1 align="center">JUIZ: Quiz Web Application</h1>
<p>
    <a href="#" target="_blank">
        <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
    </a>
</p>

✨ Live demo : [https://quiz-web-app-cyan.vercel.app](https://quiz-web-app-cyan.vercel.app)

## Introduction

This is a web application built with React and Javascript primarily designed for teachers to create and administer quizzes to test their students’ knowledge on various subjects. The client is build using [TailwindCSS](https://tailwindcss.com/docs/installation) for the component library and styling. The server is built using [Nodejs](https://nodejs.org/en). This repository contains the source code for the app.

## Prerequisites

Before running this project, make sure you have the following software installed on your system:

- Node.js (v16.15.0 or higher)
- npm (v8.5.5 or higher)

## Installation

**NB**: All the mentioned steps must be done within the `main` branch only.
To get started with the app, you will need to clone this repository and install the dependencies. You can do this by running the following commands in your terminal:

```sh
git clone https://github.com/Asterdev-03/quiz-web-app.git
cd quiz-web-app
```

In the `client` directory, install client dependencies,

```sh
npm install
```

In the `server` directory, install server dependencies,

```sh
npm install
```

## Setting Environment Variables

In `client` directory, create a file `.env`

Add the following in the file.

```sh
REACT_APP_API_KEY=http://localhost:5000
```

In `server` directory, create a file `.env`

Make sure you signup for Mongodb Atlas. Collect the secret keys and urls, and add the following in the file.

```sh
MONGODB_URL=*******************
CLIENT_PORT=http://localhost:3000
SERVER_PORT=5000
```

## Usage

Once you have installed the dependencies and set the environment variables, you can run the server by running the following command from the `server` directory:

```sh
nodemon ./index.js
```

You can then run the client by running the following command from the `client` directory:

```sh
npm start
```

This will start the client and open the app in your default browser. This may take 2-3 minutes.

**NB**: **Make sure the server runs in PORT: `5000` and client runs in `http://localhost:3000` to avoid any CORS errors**

## Building

If you want to build the app for production, you can run the following command from the `client` directory:

```sh
npm run build
```

This will generate a production-ready build of the app in the `dist` directory.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
