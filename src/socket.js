import { io } from "socket.io-client";
const API_BASE = "http://localhost:5001";

export const socket = io(API_BASE, {});

socket.connect();
socket.emit("register_user", { idUser: 1 });