CANVAS_SIZE = 505;

function drawClockBorder(ctx, canvas) {
  // middle canvas
  ctx.save();

  //   ctx.scale(0.4, 0.4);
  ctx.strokeStyle = "black";
  //   ctx.fillStyle = "white";
  //   ctx.lineCap = "round";

  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.arc(0, 0, 250, 0, Math.PI * 2, true);
  ctx.stroke();

  ctx.restore();
}

function drawHand(ctx, rad, text) {
  ctx.save();

  const distance = 29;
  
  let dy = distance * -Math.cos(rad);
  let dx = distance * Math.sin(rad);

  let x = dx;
  let y = dy;

  ctx.font = "18px calibri";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  while (Math.sqrt(x**2 + y**2) < CANVAS_SIZE / 2 ) {
    ctx.fillText(text, x, y);
    x += dx;
    y += dy;
  }

  ctx.restore();
}

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}


function clock() {
  const now = new Date();
  const canvas = document.getElementById("clock");
  canvas.width = canvas.height = CANVAS_SIZE;
  const ctx = canvas.getContext("2d");

  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw from middle
  ctx.translate(canvas.width / 2, canvas.height / 2);

  drawClockBorder(ctx, canvas);

  const sec = now.getSeconds();
  const secRad = (sec / 60) * (Math.PI * 2);
  drawHand(ctx, secRad, sec);
//   To display a clock with a sweeping second hand, use:
//   const sec = now.getSeconds() + now.getMilliseconds() / 1000;

  const min = now.getMinutes();
  const minRad = (min / 60) * (Math.PI * 2);
  drawHand(ctx, minRad, min);

  const hr = now.getHours() % 12;
  const hrRad = (hr / 12) * (Math.PI * 2);
  drawHand(ctx, hrRad, hr)


  ctx.restore();
    window.requestAnimationFrame(clock);
}

// clock();

window.requestAnimationFrame(clock);
