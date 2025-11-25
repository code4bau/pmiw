class Gestor {
  constructor() {
    this.estado = "menu"; // estados posibles: menu, jugando, gano, perdio
    this.juego = null;    
    
    this.boton = new Boton(width/2 - 60, height - 60, 120, 40, "JUGAR");
  }

  dibujar() {
    if (this.estado !== "menu") {
      if (this.juego) this.juego.dibujar();
    }

    // INTERFAZ DEL USUARIO
    if (this.estado === "menu") {
      fill(0, 0, 0, 220); 
      rect(0, 0, width, height); 

      fill(255);
      textAlign(CENTER, TOP);
      textSize(28);
      text("LA TRAVESÍA DE SIMBAD", width/2, 40);

      textSize(18);
      textAlign(LEFT, TOP);
      let txt = 
        "Instrucciones:\n\n" +
        " - Clic Izquierdo: Explorar.\n" +
        " - Clic Derecho: Marcar peligro.\n" +
        " - Números: Avisos de cercanía.\n" +
        " - ¡Encuentra todas las monedas!\n\n" +
        "Créditos:\n" +
        " - Programado por Bautista Merlo & Victoria Arce\n\n\n" +
        "¡HAZ CLIC PARA ZARPAR!";
      
      text(txt, width * 0.1, 100);

      this.boton.texto = "ZARPAR";
      this.boton.dibujar();

    } else if (this.estado === "gano") {
      this.dibujarOverlay(50, 200, 50, "¡TESORO ENCONTRADO!", "OTRA VEZ");

    } else if (this.estado === "perdio") {
      this.dibujarOverlay(200, 50, 50, "¡HAS NAUFRAGADO!", "REINTENTAR");
    }
  }

  dibujarOverlay(r, g, b, titulo, btnTexto) {
    fill(r, g, b, 200);
    rect(0, 0, width, height);
    
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text(titulo, width/2, height/3);
    
    this.boton.texto = btnTexto;
    this.boton.dibujar();
  }

  manejarClick() {
    // si estamos en el menú, el click va al botón
    if (this.estado === "menu" || this.estado === "gano" || this.estado === "perdio") {
      if (this.boton.clickeado()) {
        this.juego = new Cuadricula(); 
        this.estado = "jugando";
      }
    } 
    // si estamos jugando, el click va al tablero
    else if (this.estado === "jugando") {
      let resultado = this.juego.recibirClick(mouseX, mouseY, mouseButton);
      
      if (resultado === "perdio") {
        this.estado = "perdio";
        sonidoPierde.play();
      } else if (resultado === "gano") {
        this.estado = "gano";
        sonidoGana.play();
      } else if (resultado === "ok") {
        sonidoClick.play();
      }
    }
  }
}
