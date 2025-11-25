class Cuadricula {
  constructor() {
    // CREAR MATRIZ VACÍA
    this.celdas = [];
    for (let columna = 0; columna < COLUMNAS; columna++) {
      this.celdas[columna] = []; 
      for (let fila = 0; fila < FILAS; fila++) {
        this.celdas[columna][fila] = new Celda(columna, fila, TAMANO);
      }
    }

    // PONE BOMBAS AL AZAR
    for (let minasColocadas = 0; minasColocadas < BOMBAS; minasColocadas++) {
      let columnaAzar = floor(random(COLUMNAS));
      let filaAzar = floor(random(FILAS));

      // si la celda elegida no es una mina, se convierte en mina
      if (this.celdas[columnaAzar][filaAzar].esMina == false) {
        this.celdas[columnaAzar][filaAzar].esMina = true;
      } else {
        // si ya era una mina, se resta 1 al contador para reintentar
        minasColocadas--; 
      }
    }

    // CONTAR VECINOS
    for (let columna = 0; columna < COLUMNAS; columna++) {
      for (let fila = 0; fila < FILAS; fila++) {
        
        if (!this.celdas[columna][fila].esMina) {
          let contadorMinas = 0;
          
          for (let desplazamientoX = -1; desplazamientoX <= 1; desplazamientoX++) {
            for (let desplazamientoY = -1; desplazamientoY <= 1; desplazamientoY++) {
              
              let vecinoCol = columna + desplazamientoX;
              let vecinoFila = fila + desplazamientoY;
              
              // Chequea que no nos salgamos de los bordes del tablero
              if (vecinoCol >= 0 && vecinoCol < COLUMNAS && vecinoFila >= 0 && vecinoFila < FILAS) {
                if (this.celdas[vecinoCol][vecinoFila].esMina) {
                  contadorMinas++;
                }
              }
            }
          }
          this.celdas[columna][fila].vecinos = contadorMinas;
        }
      }
    }
  }

  dibujar() {
    for (let columna = 0; columna < COLUMNAS; columna++) {
      for (let fila = 0; fila < FILAS; fila++) {
        this.celdas[columna][fila].dibujar();
      }
    }
  }

  recibirClick(mouseX_Usuario, mouseY_Usuario, botonMouse) {
    let columnaClickeada = floor(mouseX_Usuario / TAMANO);
    let filaClickeada = floor(mouseY_Usuario / TAMANO);

    // si se clickea fuera del tablero, se ignora
    if (columnaClickeada < 0 || columnaClickeada >= COLUMNAS || filaClickeada < 0 || filaClickeada >= FILAS) {
        return "nada";
    }

    let celda = this.celdas[columnaClickeada][filaClickeada];

    // Click Derecho (Cruz)
    if (botonMouse === RIGHT) {
      if (!celda.revelada) celda.marcada = !celda.marcada;
      return "nada"; 
    } else {
      // Click Izquierdo (Revelacion)
      if (celda.marcada || celda.revelada) return "nada";

      celda.revelada = true;

      if (celda.esMina) {
        this.revelarTodo();
        return "perdio";
      }

      // si es agua vacía, se expande de manera recursiva
      if (celda.vecinos === 0) {
        this.expandir(columnaClickeada, filaClickeada);
      }

      if (this.chequearVictoria()) return "gano";
      
      return "ok";
    }
  }

  expandir(columna, fila) {
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        let vecinoCol = columna + x;
        let vecinoFila = fila + y;

        if (vecinoCol >= 0 && vecinoCol < COLUMNAS && vecinoFila >= 0 && vecinoFila < FILAS) {
          let celdaVecina = this.celdas[vecinoCol][vecinoFila];
          
          if (!celdaVecina.revelada && !celdaVecina.esMina) {
            celdaVecina.revelada = true;
            if (celdaVecina.vecinos === 0) {
                this.expandir(vecinoCol, vecinoFila); // Recursividad
            }
          }
        }
      }
    }
  }

  revelarTodo() {
    for (let c = 0; c < COLUMNAS; c++) {
      for (let f = 0; f < FILAS; f++) {
        if (this.celdas[c][f].esMina) this.celdas[c][f].revelada = true;
      }
    }
  }

  chequearVictoria() {
    for (let c = 0; c < COLUMNAS; c++) {
      for (let f = 0; f < FILAS; f++) {
        let cActual = this.celdas[c][f];
        if (!cActual.esMina && !cActual.revelada) return false;
      }
    }
    return true;
  }
}
