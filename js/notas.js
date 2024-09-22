document.addEventListener('DOMContentLoaded', async () => {
    // Verificar si el usuario está autenticado
    const usuario = JSON.parse(localStorage.getItem('usuario'));
  
    if (!usuario) {
      window.location.href = "login.html"; // Redirigir al login si no está autenticado
    }
  
    const { codigo, nombre } = usuario;
  
    // Mostrar el código y nombre del estudiante
    document.getElementById('codigo-nombre').innerHTML = `<p><strong>Código:</strong> ${codigo} | <strong>Nombre:</strong> ${nombre}</p>`;
  
    try {
      // Hacer la petición GET al endpoint para obtener las notas del estudiante
      const response = await fetch(`https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/students/${codigo}/notas`);
      const data = await response.json();
  
      if (response.ok) {
        const notas = data.notas; // Array de objetos con asignaturas y notas
        let totalCreditos = 0;
        let sumaPonderada = 0;
  
        // Insertar las notas en la tabla
        const tableBody = document.getElementById('notas-table-body');
        tableBody.innerHTML = '';
  
        notas.forEach(nota => {
          const { asignatura, creditos, P1, P2, P3, EF } = nota;
          
          // Calcular la definitiva
          const definitiva = ((P1 + P2 + P3) / 3) * 0.7 + EF * 0.3;
          
          // Calcular el promedio ponderado
          sumaPonderada += definitiva * creditos;
          totalCreditos += creditos;
  
          // Crear fila con los datos de la asignatura
          const row = `
            <tr>
              <td>${asignatura}</td>
              <td>${creditos}</td>
              <td>${P1}</td>
              <td>${P2}</td>
              <td>${P3}</td>
              <td>${EF}</td>
              <td>${definitiva.toFixed(2)}</td>
            </tr>
          `;
  
          tableBody.innerHTML += row;
        });
  
        // Calcular el promedio ponderado total
        const promedioPonderado = sumaPonderada / totalCreditos;
        document.getElementById('promedio-ponderado').innerHTML = `<p><strong>Promedio Ponderado:</strong> ${promedioPonderado.toFixed(2)}</p>`;
  
      } else {
        console.error('Error al obtener las notas:', data);
        alert('No se pudieron obtener las notas del estudiante.');
      }
  
    } catch (error) {
      console.error('Error en la conexión:', error);
      alert('Error en la conexión. Intenta de nuevo.');
    }
  
    // Funcionalidad del botón de cerrar sesión
    document.getElementById('logout').addEventListener('click', () => {
      localStorage.removeItem('usuario'); // Eliminar el usuario del localStorage
      window.location.href = "login.html"; // Redirigir al login
    });
  });
  