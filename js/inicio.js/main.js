// js/script.js

// --- fallback visual si alguna imagen no carga ---
function handleBrokenImg(img){
  // placeholder SVG (simple). Reemplaza por 'assets/img/placeholder.png' si prefieres
  const svg = "data:image/svg+xml;utf8," +
    "<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'>" +
    "<rect width='100%' height='100%' fill='%23f2f4f7'/>" +
    "<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23888' font-size='20'>Imagen no disponible</text>" +
    "</svg>";
  img.onerror = null;
  img.src = svg;
  img.style.objectFit = 'contain';
  console.warn("Imagen no encontrada. Sustituida por placeholder (comprueba ruta y nombre):", img.dataset && img.dataset.src ? img.dataset.src : img.src);
}

// ---- Cotizador ----
document.addEventListener('DOMContentLoaded', () => {
  const cotForm = document.getElementById('cotizadorForm');
  if(cotForm){
    cotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const precio = parseFloat(document.getElementById('servicio').value) || 0;
      const cantidad = parseInt(document.getElementById('cantidad').value) || 0;
      if (cantidad < 1 || precio <= 0) {
        document.getElementById('resultado').textContent = "Selecciona un servicio válido y cantidad >= 1.";
        return;
      }
      const total = precio * cantidad;
      document.getElementById('resultado').textContent = `Total estimado: S/ ${total.toFixed(2)}`;
    });
  }

  // ---- Formulario de contacto ----
  const contactForm = document.getElementById('contactoForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      const email = document.getElementById('email').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();

      if(nombre.length < 2){
        showMessage("Por favor ingresa tu nombre válido.");
        return;
      }
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        showMessage("Ingresa un correo válido.");
        return;
      }
      if(mensaje.length < 5){
        showMessage("Escribe un mensaje más detallado (min 5 caracteres).");
        return;
      }

      // Simulación de envío (puedes implementar fetch a tu backend)
      document.getElementById('mensajeExito').textContent = `¡Gracias ${nombre}! Recibimos tu mensaje.`;
      contactForm.reset();
      setTimeout(()=>{ document.getElementById('mensajeExito').textContent = ""; }, 6000);
    });
  }

  function showMessage(text){
    const el = document.getElementById('mensajeExito');
    if(el){ el.textContent = text; el.classList.remove('text-success'); el.classList.add('text-danger'); setTimeout(()=> el.textContent='',4000); }
    else alert(text);
  }

  // -- opcional: chequear imágenes rotas en consola (helpful)
  document.querySelectorAll('img').forEach(img=>{
    img.addEventListener('error', ()=> console.warn('Imagen rota detectada:', img.src));
  });
});
