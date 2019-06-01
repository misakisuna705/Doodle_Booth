let tool_action;
let toolspace;

function select_tool(event) {
  switch (event.target.id) {
    case "cursor":
      canvas.style.cursor = "default";
      tool_action = event.target.id;
      break;

    case "pencil":
      canvas.style.cursor = "url('res/image/pencil.png'), auto";
      tool_action = event.target.id;
      break;

    case "eraser":
      canvas.style.cursor = "url('res/image/eraser.png'), auto";
      tool_action = event.target.id;
      break;

    case "hollow_circle":
      canvas.style.cursor = "url('res/image/hollow_circle.png'), auto";
      tool_action = event.target.id;
      break;

    case "hollow_triangle":
      canvas.style.cursor = "url('res/image/hollow_triangle.png'), auto";
      tool_action = event.target.id;
      break;

    case "hollow_rectangle":
      canvas.style.cursor = "url('res/image/hollow_rectangle.png'), auto";
      tool_action = event.target.id;
      break;

    case "solid_circle":
      canvas.style.cursor = "url('res/image/solid_circle.png'), auto";
      tool_action = event.target.id;
      break;

    case "solid_triangle":
      canvas.style.cursor = "url('res/image/solid_triangle.png'), auto";
      tool_action = event.target.id;
      break;

    case "solid_rectangle":
      canvas.style.cursor = "url('res/image/solid_rectangle.png'), auto";
      tool_action = event.target.id;
      break;

    case "undo":
      if (canvas_count >= 0) {
        canvas_context.clearRect(0, 0, canvas.width, canvas.height);
        canvas_context.putImageData(canvas_data[canvas_count], 0, 0);
        canvas_count--;
      }
      break;

    case "redo":
      if (canvas_count < canvas_data.length - 1) {
        canvas_count++;
        canvas_context.clearRect(0, 0, canvas.width, canvas.height);
        canvas_context.putImageData(canvas_data[canvas_count], 0, 0);
      }
      break;

    case "reset":
      canvas_context.clearRect(0, 0, canvas.width, canvas.height);
      break;

    case "download":
      document.getElementById("link").setAttribute("href", canvas.toDataURL("image/png"));
      break;

    case "upload":
      if (canvas_count == MAX) {
        for (let i = 0; i < MAX; i++) {
          canvas_data[i] = canvas_data[i + 1];
        }
        canvas_data[MAX] = canvas_context.getImageData(0, 0, canvas.width, canvas.height);
      } else {
        canvas_count++;
        canvas_data[canvas_count] = canvas_context.getImageData(0, 0, canvas.width, canvas.height);
      }
      let image = document.getElementById("image");
      canvas_context.drawImage(image, doodle_box_set().x, doodle_box_set().y);
      break;
  }
}

function set_tool(event) {
  switch (tool_action) {
    case "pencil":
      canvas_context.strokeStyle = color_data;
      canvas_context.lineWidth = document.getElementById("brush").value;
      canvas_context.globalAlpha = 1 - document.getElementById("alpha").value;
      canvas_context.beginPath();
      break;

    case "eraser":
      canvas_context.strokeStyle = "white";
      canvas_context.lineWidth = document.getElementById("clear").value;
      canvas_context.beginPath();
      break;

    case "hollow_circle":
    case "hollow_triangle":
    case "hollow_rectangle":
      canvas_context.strokeStyle = color_data;
      canvas_context.lineWidth = document.getElementById("hollow").value;
      canvas_context.globalAlpha = 1 - document.getElementById("alpha").value;

      canvas_x = doodle_box_set().x;
      canvas_y = doodle_box_set().y;
      break;

    case "solid_circle":
    case "solid_triangle":
    case "solid_rectangle":
      canvas_context.fillStyle = color_data;
      canvas_context.globalAlpha = 1 - document.getElementById("alpha").value;

      canvas_x = doodle_box_set().x;
      canvas_y = doodle_box_set().y;
      break;
  }
}
