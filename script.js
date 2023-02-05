const socket = new WebSocket("ws://your-websocket-server.com");
const canvas = document.getElementById("drawing-board");
const ctx = canvas.getContext("2d");

socket.onopen = function (event) {
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mousemove", draw);
};

let isDrawing = false;
let x = 0;
let y = 0;

function startDrawing(event) {
  isDrawing = true;
  x = event.clientX;
  y = event.clientY;
}

function stopDrawing(event) {
  isDrawing = false;
}

function draw(event) {
  if (!isDrawing) return;

  const newX = event.clientX;
  const newY = event.clientY;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(newX, newY);
  ctx.stroke();

  socket.send(JSON.stringify({
    type: "draw",
    x,
    y,
    newX,
    newY,
  }));

  x = newX;
  y = newY;
}
