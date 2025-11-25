class Celda {
  constructor(columna, fila, ancho) {
    this.columna = columna;
    this.fila = fila;
    this.ancho = ancho;
    
    this.x = columna * ancho;
    this.y = fila * ancho;
    
    this.esMina = false;
    this.vecinos = 0;      // Cantidad de minas alrededor
    this.revelada = false; // si esta revelada
    this.marcada = false;  // si tiene cruz
  }

  dibujar() {
    stroke(0);
    
    if (this.revelada) {
      if (this.esMina) {
        // CASO ES MINA
        fill(200, 0, 0);
        rect(this.x, this.y, this.ancho, this.ancho);
        image(imgPeligro, this.x + 10, this.y + 10, this.ancho - 20, this.ancho - 20);
      } else {
        // CASO AGUA
        fill(200, 230, 255);
        rect(this.x, this.y, this.ancho, this.ancho);
        
        if (this.vecinos > 0) {
          // muestra numero de vecinos
          fill(0);
          textSize(20);
          text(this.vecinos, this.x + this.ancho/2, this.y + this.ancho/2);
        } else {
           // si esta vacio se pone una moneda
           image(imgMoneda, this.x + 10, this.y + 10, this.ancho - 20, this.ancho - 20);
        }
      }
    } else {
      // CASO OCULTO
      fill(50, 100, 200);
      rect(this.x, this.y, this.ancho, this.ancho);
      if (this.marcada) {
        image(imgMarcador, this.x + 10, this.y + 10, this.ancho - 20, this.ancho - 20);
      }
    }
  }
}
