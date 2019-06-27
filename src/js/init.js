window.addEventListener("DOMContentLoaded", init, false);

function init() {
  tool_init();
  color_init();
  const doodle_box = document.getElementById("doodle_box");

  toolspace.addEventListener("click", select_tool, false);

  doodle_box.addEventListener(
    "touchstart",
    event => {
      set_canvas_data();
      set_tool(event);
      event.preventDefault();

      doodle_box.addEventListener(
        "touchmove",
        () => {
          draw_image(event);
          event.preventDefault();
        },
        false
      );
    },
    false
  );

  doodle_box.addEventListener(
    "touchend",
    event => {
      event.preventDefault();

      doodle_box.removeEventListener(
        "touchmove",
        () => {
          draw_image(event);
          event.preventDefault();
        },
        false
      );
    },
    false
  );

  doodle_box.addEventListener(
    "mousedown",
    () => {
      set_canvas_data();
      set_tool(event);
      doodle_box.addEventListener("mousemove", draw_image, false);
    },
    false
  );

  doodle_box.addEventListener(
    "mouseup",
    () => {
      doodle_box.removeEventListener("mousemove", draw_image, false);
    },
    false
  );

  color_picker.addEventListener(
    "click",
    () => {
      changeColor(event);

      if (event.target.id == "color_strip") {
        fillGradient();
      }
    },
    false
  );

  color_block.addEventListener(
    "mousedown",
    () => {
      color_block.addEventListener("mousemove", changeColor, false);
    },
    false
  );

  color_block.addEventListener(
    "mouseup",
    () => {
      color_block.removeEventListener("mousemove", changeColor, false);
    },
    false
  );
}

function tool_init() {
  toolspace = document.getElementById("toolspace");
}

function color_init() {
  color_picker = document.getElementById("color_picker");
  color_block = document.getElementById("color_block");
  color_strip = document.getElementById("color_strip");
  color_label = document.getElementById("color_label");

  color_block_context = color_block.getContext("2d");
  color_strip_context = color_strip.getContext("2d");

  color_x = 0;
  color_y = 0;
  color_data = "rgba(255,0,0,1)";
  color_label.style.backgroundColor = color_data;

  color_block_context.rect(0, 0, color_block.width, color_block.height);

  fillGradient();

  color_strip_context.rect(0, 0, color_strip.width, color_strip.height);

  grd1 = color_strip_context.createLinearGradient(0, 0, 0, color_block.height);

  grd1.addColorStop(0, "rgba(255, 0, 0, 1)");
  grd1.addColorStop(0.17, "rgba(255, 255, 0, 1)");
  grd1.addColorStop(0.34, "rgba(0, 255, 0, 1)");
  grd1.addColorStop(0.51, "rgba(0, 255, 255, 1)");
  grd1.addColorStop(0.68, "rgba(0, 0, 255, 1)");
  grd1.addColorStop(0.85, "rgba(255, 0, 255, 1)");
  grd1.addColorStop(1, "rgba(255, 0, 0, 1)");
  color_strip_context.fillStyle = grd1;
  color_strip_context.fill();
}
