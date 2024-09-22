document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el usuario ya está autenticado
    if (localStorage.getItem('usuario')) {
      window.location.href = "notas.html"; // Redirigir a la interfaz de notas si ya está autenticado
    }
  
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
      event.preventDefault();
  
      const codigo = document.getElementById('codigo').value;
      const clave = document.getElementById('clave').value;
  
      // Realizar la petición POST al servicio de login
      try {
        const response = await fetch('https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ codigo, clave })
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Guardar el objeto de usuario en el localStorage
          const usuario = {
            codigo: data.codigo,
            nombre: data.nombre,
            email: data.email
          };
  
          localStorage.setItem('usuario', JSON.stringify(usuario));
  
          // Redirigir a la página de notas
          window.location.href = "notas.html";
        } else {
          // Si las credenciales no son válidas, mostrar el mensaje de error
          const errorMessage = document.getElementById('error-message');
          errorMessage.textContent = "Credenciales no válidas. Intenta de nuevo.";
          errorMessage.style.display = "block";
          // Borrar los campos del formulario
          document.getElementById('codigo').value = '';
          document.getElementById('clave').value = '';
        }
      } catch (error) {
        console.error('Error al intentar iniciar sesión:', error);
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = "Error en la conexión. Intenta de nuevo.";
        errorMessage.style.display = "block";
      }
    });
  });
  