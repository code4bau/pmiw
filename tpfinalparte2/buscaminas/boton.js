class Boton {
  constructor(x, y, ancho, alto, texto) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.texto = texto;
  }

  dibujar() {
    // Cambio de color si paso el mouse
    if (this.clickeado()) {
      fill(200);
    } else {
      fill(255);
    }
    
    rect(this.x, this.y, this.ancho, this.alto, 10);
    
    fill(0);
    textAlign(CENTER, CENTER); 
    textSize(16);
    text(this.texto, this.x + this.ancho/2, this.y + this.alto/2);
  }

  clickeado() {
    // Detectar colisión Mouse-Rectángulo
    return (mouseX > this.x && 
            mouseX < this.x + this.ancho && 
            mouseY > this.y && 
            mouseY < this.y + this.alto);
  }
}
