const COLUMNAS = 6;
const FILAS = 6;
const TAMANO = 80;
const BOMBAS = 5; 

let gestor; 
let imgPeligro, imgMarcador, imgMoneda; 
let sonidoClick, sonidoPierde, sonidoGana;

function preload() {
  imgPeligro = loadImage('data/craneo.png'); 
  imgMarcador = loadImage('data/cruz.png'); 
  imgMoneda = loadImage('data/monedaoro.png');
  
  soundFormats('mp3', 'wav');
  sonidoClick = loadSound('data/click.mp3');
  sonidoPierde = loadSound('data/hundido.mp3');
  sonidoGana = loadSound('data/win31.mp3');
}

function setup() {
  createCanvas(COLUMNAS * TAMANO, FILAS * TAMANO + 80);
  textAlign(CENTER, CENTER);
  textSize(16);
  
  gestor = new Gestor();
}

function draw() {
  background(20, 40, 80); 
  gestor.dibujar();
}

function mousePressed() {
  gestor.manejarClick();
}
