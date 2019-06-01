const MAX = 60;

let canvas_data = [];
let canvas_count = -1;
let canvas_x;
let canvas_y;

function doodle_box_set() {
  const doodle_box = document.getElementById("doodle_box");
  const doodle_box_ratio = doodle_box.width / doodle_box.clientWidth;

  let x;
  let y;
  let rect = event.target.getBoundingClientRect();

  switch (event.type) {
    case "touchstart":
    case "touchmove":
      event.offsetX = event.targetTouches[0].pageX - rect.left;
      event.offsetY = event.targetTouches[0].pageY - rect.top;
      break;
  }

  x = event.offsetX * doodle_box_ratio;
  y = event.offsetY * doodle_box_ratio;

  return {
    x: x,
    y: y
  };
}

function set_canvas_data() {
  //const canvas = document.getElementById("canvas");
  const canvas_getcontext_getimagedata = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);

  if (canvas_count == MAX) {
    for (let i = 0; i < MAX; i++) {
      canvas_canvas_data[i] = canvas_data[i + 1];
    }
    canvas_data[MAX] = canvas_getcontext_getimagedata;
  } else {
    canvas_count++;
    canvas_data[canvas_count] = canvas_getcontext_getimagedata;
  }
}

function draw_image(canvas_x, canvas_y) {
  switch (tool_action) {
    case "pencil":
    case "eraser":
      draw_path();
      break;

    case "hollow_circle":
      draw_hollow_circle();
      break;

    case "hollow_triangle":
      draw_hollow_triangle();
      break;

    case "hollow_rectangle":
      draw_hollow_rectangle();
      break;

    case "solid_circle":
      draw_solid_circle();
      break;

    case "solid_triangle":
      draw_solid_triangle();
      break;

    case "solid_rectangle":
      draw_solid_rectangle();
      break;
  }
}

function draw_path() {
  canvas_context.clearRect(0, 0, canvas.width, canvas.height);
  canvas_context.putImageData(canvas_data[canvas_count], 0, 0);
  canvas_context.lineTo(set_canvas().x, set_canvas().y);
  canvas_context.stroke();
}

function draw_hollow_circle() {
  let radius = ((set_canvas().x - canvas_x) ** 2 + (set_canvas().y - canvas_y) ** 2) ** (1 / 2);

  canvas_context.clearRect(0, 0, canvas.width, canvas.height);
  canvas_context.putImageData(canvas_data[canvas_count], 0, 0);

  canvas_context.beginPath();

  canvas_context.arc(canvas_x, canvas_y, radius, (Math.PI * 0) / 180, (Math.PI * 360) / 180);

  canvas_context.stroke();
}

function draw_hollow_triangle() {
  let diff = canvas_y - set_canvas().y;

  canvas_context.clearRect(0, 0, canvas.width, canvas.height);
  canvas_context.putImageData(canvas_data[canvas_count], 0, 0);

  canvas_context.beginPath();

  canvas_context.moveTo(canvas_x, canvas_y);

  canvas_context.lineTo(set_canvas().x, canvas_y + diff);
  canvas_context.lineTo(set_canvas().x, set_canvas().y);

  canvas_context.closePath();

  canvas_context.stroke();
}

function draw_hollow_rectangle() {
  canvas_context.clearRect(0, 0, canvas.width, canvas.height);
  canvas_context.putImageData(canvas_data[canvas_count], 0, 0);

  canvas_context.beginPath();

  canvas_context.moveTo(canvas_x, canvas_y);

  canvas_context.strokeRect(canvas_x, canvas_y, set_canvas().x - canvas_x, set_canvas().y - canvas_y);
}

function draw_solid_circle() {
  let radius = ((set_canvas().x - canvas_x) ** 2 + (set_canvas().y - canvas_y) ** 2) ** (1 / 2);

  canvas_context.clearRect(0, 0, canvas.width, canvas.height);
  canvas_context.putImageData(canvas_data[canvas_count], 0, 0);

  canvas_context.beginPath();

  canvas_context.arc(canvas_x, canvas_y, radius, (Math.PI * 0) / 180, (Math.PI * 360) / 180);

  canvas_context.fill();
}

function draw_solid_triangle() {
  let diff = canvas_y - set_canvas().y;

  canvas_context.clearRect(0, 0, canvas.width, canvas.height);
  canvas_context.putImageData(canvas_data[canvas_count], 0, 0);

  canvas_context.beginPath();

  canvas_context.moveTo(canvas_x, canvas_y);
  canvas_context.lineTo(set_canvas().x, canvas_y + diff);
  canvas_context.lineTo(set_canvas().x, set_canvas().y);

  canvas_context.fill();
}

function draw_solid_rectangle() {
  canvas_context.clearRect(0, 0, canvas.width, canvas.height);
  canvas_context.putImageData(canvas_data[canvas_count], 0, 0);

  canvas_context.beginPath();

  canvas_context.moveTo(canvas_x, canvas_y);

  canvas_context.fillRect(canvas_x, canvas_y, set_canvas().x - canvas_x, set_canvas().y - canvas_y);
}
