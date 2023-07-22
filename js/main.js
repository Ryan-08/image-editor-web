const imageInput = document.getElementById("imageInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const brightness = document.getElementById("brightness");
const saturation = document.getElementById("saturation");
const grayscale = document.getElementById("grayscale");
const sepia = document.getElementById("sepia");
const blurr = document.getElementById("blur");
const inversion = document.getElementById("inversion");
const opacity = document.getElementById("opacity");
const hue = document.getElementById("hue");
const xpos = document.getElementById("x-position");
const ypos = document.getElementById("y-position");
const teks = document.getElementById("teks");
const color = document.getElementById("color");
const textSize = document.getElementById("textSize");
const font = document.getElementById("font");
const btnAdd = document.getElementById("addBtn");
const btnDownload = document.getElementById("btnDownload");

var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var canvasWidth = 0;
var canvasHeight = 0;
var isDragging = false;

const settings = {};
let image = null;
const fonts = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Courier New",
  "serif",
  "sans-serif",
];

function generateFilter() {
  const {
    brightness,
    saturation,
    blur,
    inversion,
    grayscale,
    sepia,
    opacity,
    hue,
  } = settings;

  return `brightness(${brightness}%) saturate(${saturation}%) hue-rotate(${hue}deg) grayscale(${grayscale}%) opacity(${opacity}%) sepia(${sepia}%) blur(${blur}px) invert(${inversion})`;
}

function resetSettings() {
  brightness.value = settings.brightness = "100";
  saturation.value = settings.saturation = "100";
  grayscale.value = settings.grayscale = "0";
  hue.value = settings.hue = "0";
  opacity.value = settings.opacity = "100";
  sepia.value = settings.sepia = "0";
  blurr.value = settings.blur = "0";
  inversion.value = settings.inversion = "0";
  xpos.value = settings.x = "50";
  ypos.value = settings.y = "50";
  color.value = settings.color = "#000000";
  textSize.value = settings.textSize = 30;
  font.value = settings.font = "0";
  teks.value = settings.teks = "";

  renderImage();
}
function updateSetting(key, value) {
  // alert("update")
  settings[key] = value;
  if (!image) return;
  // console.log(image)
  renderImage();
}
function renderImage() {
  if (!image) return;
  canvasWidth = canvas.width = image.width;
  canvasHeight = canvas.height = image.height;

  ctx.filter = generateFilter();
  ctx.drawImage(image, 0, 0);
  if (settings.teks) {
    // console.log(settings);
    ctx.font = `${settings.textSize}px ${fonts[settings.font]}`;

    ctx.fillStyle = settings.color;
    ctx.fillText(settings.teks, settings.x, settings.y);
  }
}

brightness.addEventListener("change", () =>
  updateSetting("brightness", brightness.value)
);
saturation.addEventListener("change", () =>
  updateSetting("saturation", saturation.value)
);
hue.addEventListener("change", () => updateSetting("hue", hue.value));
blurr.addEventListener("change", () => updateSetting("blur", blurr.value));
opacity.addEventListener("change", () =>
  updateSetting("opacity", opacity.value)
);
grayscale.addEventListener("change", () =>
  updateSetting("grayscale", grayscale.value)
);
sepia.addEventListener("change", () => updateSetting("sepia", sepia.value));
inversion.addEventListener("change", () =>
  updateSetting("inversion", inversion.value)
);

xpos.addEventListener("change", () => updateSetting("x", xpos.value));
ypos.addEventListener("change", () => updateSetting("y", ypos.value));
color.addEventListener("change", () => updateSetting("color", color.value));
font.addEventListener("change", () => updateSetting("font", font.value));
textSize.addEventListener("change", () =>
  updateSetting("textSize", textSize.value)
);

btnAdd.addEventListener("click", () => updateSetting("teks", teks.value));

imageInput.addEventListener("change", () => {
  image = new Image();
  btnDownload.removeAttribute("disabled");
  image.addEventListener("load", () => {
    resetSettings();
    renderImage();
  });
  // console.log(URL.createObjectURL(imageInput.files[0]))
  image.src = URL.createObjectURL(imageInput.files[0]);
});

function downloadImage() {
  if (!image) return;
  let dataURL = canvas.toDataURL("image/png");
  let a = document.createElement("a");
  a.href = dataURL;
  a.download = "download";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

const buttonAction = (value, operation, key) => {
  // console.log((value = Number(value) + 1));
  if (operation.toLowerCase() === "plus") {
    value = Number(value) + 1;
  } else if (operation.toLowerCase() === "minus") {
    value = Number(value) - 1;
  } else {
    return;
  }
  updateSetting(key, value);
  return value;
};

$(document).ready(function () {
  $("#reset").on("click", () => {
    resetSettings();
  });
  $("#btnAdd").on(
    "click",
    () => (textSize.value = buttonAction(textSize.value, "plus", "textSize"))
  );
  $("#btnMin").on(
    "click",
    () => (textSize.value = buttonAction(textSize.value, "minus", "textSize"))
  );
  $("#btnAddX").on(
    "click",
    () => (xpos.value = buttonAction(xpos.value, "plus", "x"))
  );
  $("#btnMinX").on(
    "click",
    () => (xpos.value = buttonAction(xpos.value, "minus", "x"))
  );
  $("#btnAddY").on(
    "click",
    () => (ypos.value = buttonAction(ypos.value, "plus", "y"))
  );
  $("#btnMinY").on(
    "click",
    () => (ypos.value = buttonAction(ypos.value, "minus", "y"))
  );
});

resetSettings();

// function handleMouseDown(e) {
//   canMouseX = parseInt(e.clientX - offsetX);
//   canMouseY = parseInt(e.clientY - offsetY);
//   // set the drag flag
//   isDragging = true;
// }

// function handleMouseUp(e) {
//   canMouseX = parseInt(e.clientX - offsetX);
//   canMouseY = parseInt(e.clientY - offsetY);
//   // clear the drag flag
//   isDragging = false;
// }

// function handleMouseOut(e) {
//   canMouseX = parseInt(e.clientX - offsetX);
//   canMouseY = parseInt(e.clientY - offsetY);
//   // user has left the canvas, so clear the drag flag
//   //isDragging=false;
// }

// function handleMouseMove(e) {
//   canMouseX = parseInt(e.clientX - offsetX);
//   canMouseY = parseInt(e.clientY - offsetY);
//   // if the drag flag is set, clear the canvas and draw the image
//   if (isDragging) {
//     ctx.clearRect(0, 0, canvasWidth, canvasHeight);
//     ctx.drawImage(image, canMouseX - 128 / 2, canMouseY - 120 / 2, 128, 120);
//   }
// }

// $("#canvas").mousedown(function (e) {
//   handleMouseDown(e);
// });
// $("#canvas").mousemove(function (e) {
//   handleMouseMove(e);
// });
// $("#canvas").mouseup(function (e) {
//   handleMouseUp(e);
// });
// $("#canvas").mouseout(function (e) {
//   handleMouseOut(e);
// });
