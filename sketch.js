let fr = 0;

let code_strings = [
  "var web_elems = doc.xpath('..*')",
  "input_capture = Hash.new",
  "HashMap<String, List<String>> doc;",
  "for Dir.glob('./**/*.rb') do |file|",
  ".type main, %function",
  "mul r3, r2, r1, lsl #2",
  "from pwn import *",
  "System.out.println(\"Hello, World!\");"
] // TODO: Replace this with external file to load from :D
let current_line = "";
let current_char = 0;
let line_hybrid = "";
let line_done = 1;
let line_done_wait_time = 30;
let line_done_wait_time_range = [22, 48]

let new_line_waited = 0;
let new_line_wait_time = 30;
let new_line_wait_time_range = [22, 48]
let inter_char_wait = 6;
let inter_char_wait_range = [4,12]

let cursor_char = "|"
const cursor_flash_time = 8
let flash_mode = 0;

let font_size = 64;

function setup() {
  createCanvas(2560, 720);
  fr = 30;
  frameRate(fr);
 
  fill(70,255,50,255);
  textSize(font_size);
}

function draw() {
  background(20);
  cursor_handle();
  refresh_current_line();
}

function cursor_handle() {
  if (frameCount % cursor_flash_time === 0) flash_mode = (flash_mode == 1 ? 0 : 1);
  if (flash_mode) {
    text(line_hybrid + cursor_char, width*0.1, (height/2) + (font_size/2));
  } else {
    text(line_hybrid, width*0.1, (height/2) + (font_size/2));
  }
}

function refresh_current_line() {
  if (line_done == 1) {
    if (frameCount % line_done_wait_time == 0) {
      line_done = 0;
      current_char = 0;
      new_line_waited = 0;
      line_hybrid = "";
      current_line = random(code_strings)
    }
  } else {
    if (new_line_waited) {
      if (current_char == current_line.length && frameCount % inter_char_wait == 0) {
        line_done = 1;
        line_done_wait_time = int(random(line_done_wait_time_range[0],line_done_wait_time_range[1]));
      }
      else if (frameCount % inter_char_wait == 0) {
        inter_char_wait = int(random(inter_char_wait_range[0], inter_char_wait_range[1]))
        line_hybrid = line_hybrid + current_line.charAt(current_char);
        current_char++;
      }
      else {
        return
      }
    } else {
      if (frameCount != 0 && frameCount % new_line_wait_time == 0) {
        new_line_waited = 1;
        new_line_wait_time = int(random(new_line_wait_time_range[0], new_line_wait_time_range[1]))
        inter_char_wait = int(random(inter_char_wait_range[0], inter_char_wait_range[1]))
      }
    }
  }
}

