# Project Description

The objective of this project is to create a UI that communicates to a PLC with OPC UA using React, Electron and Flask-SocketIO.<br><br>
Directory of the folder: **https://drive.google.com/drive/folders/1omHSg6UQ9Gbw5PnuDG8i-ArTiOHqeVG6**<br>
Version **xxx** is currently installed on the client's computer.

## Architecture

1. The project uses React with Electron.
2.
3. <br>

## Requirements

1. Node version: 20.11.1
2. npm version: 10.5.0
3. Python version: 3.10.11
4. pip version: 23.0.1

# Commands

## To setup python venv

1. at root: _cd backend_
2. _python -m venv venv_
3. _pip install -r requirements.txt_

## To create an .exe of the backend

1. at root: _cd backend_
2. _pyinstaller main.spec_
3. This creates a main.exe in backend/dist/ directory
4. Copy this main.exe file and paste it in root/public/backend/dist/

## To launch in dev mode the application

1. at root: _npm run dev_

## To build the application

1. at root: _npm run build_
2. This creates a new build in /dist
