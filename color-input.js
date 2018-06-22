var picker;
var colorPickerOptions = {colors: ["#ff2200","#ff5500","#ee8800","#ffbb22","#ffdd55","#88ff00","#339922","#00bb99","#22ccff","#0055bb","#2222bb","#5500bb","#ff88ff","#000000","#bbbbbb","#775544","#ffffff"],theme: {bg: "#ffffff",shade: "#dedede",accent:"#0088ff",text: "#000000"}, autoclose: true};
var colorPickerRecent = ["#ff0000","#ffffff","#000000"];
function pick(e){
e.preventDefault();
if(colorPickerRecent.length > 7){colorPickerRecent.pop()};
if(colorPickerRecent.length > 6){colorPickerRecent.pop()};
if(colorPickerRecent.indexOf(e.target.value) < 0){colorPickerRecent.unshift(e.target.value)};
document.getElementById("color-picker-colors").innerHTML = "";
document.getElementById("color-picker-recent").innerHTML = "";
document.getElementById("color-picker-selected").style.backgroundColor = e.target.value;
document.getElementById("color").value = e.target.value;
if(colorPickerOptions.autoclose){document.getElementById("color-picker-buttons").setAttribute("hidden","hidden")}else{document.getElementById("color-picker-buttons").removeAttribute("hidden")};
for(var i = 0;i < colorPickerOptions.colors.length;i++){
var colorButton = document.createElement("BUTTON");
colorButton.style.backgroundColor = colorPickerOptions.colors[i];
colorButton.addEventListener("click",function (e){
document.getElementById("color-picker-selected").style.backgroundColor = rgb2hex(e.target.style.backgroundColor);
document.getElementById("color").value = rgb2hex(e.target.style.backgroundColor);
colorPickerState.value = e.target.style.backgroundColor;
if(colorPickerOptions.autoclose){
hideColorPicker(true);
};
});
document.getElementById("color-picker-colors").append(colorButton);
};
for(var i = 0;i < colorPickerRecent.length;i++){
var colorButton = document.createElement("BUTTON");
colorButton.style.backgroundColor = colorPickerRecent[i];
colorButton.addEventListener("click",function (e){
document.getElementById("color-picker-selected").style.backgroundColor = rgb2hex(e.target.style.backgroundColor);
document.getElementById("color").value = rgb2hex(e.target.style.backgroundColor);
colorPickerState.value = e.target.style.backgroundColor;
if(colorPickerOptions.autoclose){
hideColorPicker(true);
};
});
document.getElementById("color-picker-recent").append(colorButton);
};

var pos = e.target.getBoundingClientRect();
picker.style.top = pos.top + "px";
if(pos.height){picker.style.top = (pos.top + pos.height + 5) + "px";};
picker.style.left = pos.left + "px";
}
function isInColorPicker(e){
if(e.parentElement){
if(e.parentElement.parentElement){
if(e.parentElement.parentElement.parentElement){
return e.id === "color-picker" || e.parentElement.id === "color-picker" || e.parentElement.parentElement.id === "color-picker" || e.parentElement.parentElement.parentElement.id === "color-picker";
}else{
return e.id === "color-picker" || e.parentElement.id === "color-picker" || e.parentElement.parentElement.id === "color-picker";
};
}else{
return e.id === "color-picker" || e.parentElement.id === "color-picker";
};
}else{return false;};
}
function hideColorPicker(save){
picker.style.top = "-1000px";
if(save){if(rgb2hex(colorPickerState.value).length === 0){colorPickerState.target.value = colorPickerState.value}else{colorPickerState.target.value = rgb2hex(colorPickerState.value)}};
colorPickerState = {open: false, target: null, value: null};
}
// This function is by Mottie on JSFiddle
function rgb2hex(rgb){
 rgb = rgb.match(/^rgb?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}
function createCss(){
return `#color-picker {
position: fixed;
top: -1000px;
left: 0px;
background: ${ colorPickerOptions.theme.bg };
max-width: 210px;
border: solid 1px ${ colorPickerOptions.theme.shade };
}
#color-picker button, #color-picker span {
width: 20px;
height: 20px;
cursor: pointer;
margin: 5px;
background-color: ${ colorPickerOptions.theme.bg };
border: solid 1px ${ colorPickerOptions.theme.shade };
display: inline-block;
outline: none;
}
#color-picker :focus {
border-color: ${ colorPickerOptions.theme.accent };
}
#color-picker hr {
border-top: solid 1px ${ colorPickerOptions.theme.shade };
margin: 0px
}
#color {
border: solid 1px ${ colorPickerOptions.theme.shade };
margin: 5px;
width: 162px;
height: 18px;
letter-spacing: 2px;
}
#color-picker p {
margin: 0px;
}
#color-picker p * {
vertical-align: top;
}
.color-picker-button {
width: 93px!important;
color: ${ colorPickerOptions.theme.text }
}
`;
}
var colorPickerState = {open: false,target: null,value: null};
var colorPickerCode = `
<p id="color-picker-colors"></p>
<hr><p id="color-picker-recent"></p><hr>
<p><span style="background-color: #ffffff" id="color-picker-selected"></span>
<input type="text" id="color" value="#ffffff"></p><hr>
<p id="color-picker-buttons" hidden><button id="color-picker-ok" class="color-picker-button">Ok</button><button id="color-picker-close" class="color-picker-button">Cancel</button></p>
`;
window.addEventListener("load",function (){
// Add css
var colorCssElement = document.createElement("STYLE");
colorCssElement.innerHTML = createCss();
document.head.append(colorCssElement);
// Define event listener
document.addEventListener("click",function (e){
if((e.target.tagName === "INPUT" && e.target.getAttribute("type") === "color") || e.target.classList.contains("colorButton")){
pick(e);
colorPickerState = {open: true, target: e.target, value: e.target.value};
}else{
if(!isInColorPicker(e.target)){hideColorPicker()};
}
});
// Create color picker
picker = document.createElement("DIV");
picker.id = "color-picker";
picker.innerHTML = colorPickerCode;
document.body.append(picker);
// Add color picker event listeners
document.getElementById("color-picker-ok").addEventListener("click",function (){if(colorPickerRecent.indexOf(colorPickerState.value) < 0){colorPickerRecent.unshift(e.target.value)};hideColorPicker(true)});
document.getElementById("color-picker-close").addEventListener("click",function (){hideColorPicker(false)});
document.getElementById("color-picker-selected").addEventListener("click",function (){if(colorPickerOptions.autoclose){hideColorPicker(true)}});
document.getElementById("color").addEventListener("keyup",function (e){
colorPickerState.value = e.target.value;
document.getElementById("color-picker-selected").style.backgroundColor = e.target.value;
if(e.key === "Enter"){colorPickerRecent.unshift(e.target.value);if(colorPickerOptions.autoclose){hideColorPicker(true)}};
});
// Add close event listeners
document.body.addEventListener("contextmenu",function (){hideColorPicker()});
window.addEventListener("resize",function (){hideColorPicker()});
})