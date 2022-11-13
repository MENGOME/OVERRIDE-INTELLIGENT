import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {interpret} from "xstate";
import {RobotMachine, RobotModel} from "./machine/robotMachine";
import {Roles} from "./types";


/*
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)*/
