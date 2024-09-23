const select_tipo_usuario = document.getElementById("select_tipo_usuario");
const select_tipo_usuario_guardar = document.getElementById(
  "select_tipo_usuario_guardar"
);
const btn_modificar = document.getElementById("btn_modificar");
const btn_eliminar = document.getElementById("btn_eliminar");
const btn_guardar = document.getElementById("btn_guardar");
const tbody = document.getElementById("tbody");

async function deletUserID(userID) {
  const confirmacion = confirm(
    "¿Estás seguro de que deseas eliminar este usuario?"
  );

  if (confirmacion) {
    let url = `http://localhost:8080/api/users/${userID}`;
    try {
      const respuesta = await fetch(url, {
        method: "DELETE", // Usar el método DELETE
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (respuesta.ok) {
        window.location.reload(); // Recarga la página si la eliminación es exitosa
      } else {
        console.error("Error al eliminar el usuario:", respuesta.statusText);
      }
    } catch (error) {
      alert("Error al eliminar el usuario");
    }
  }
}

async function guardarUser(button, userId) {
  const row = button.closest("tr");

  const selectTipoUsuarioGuardar = row.querySelector("select:last-of-type");

  let tipoUser = selectTipoUsuarioGuardar.value; // Obtener el tipo de usuario
  let url = `http://localhost:8080/api/users/premium/${userId}`;


  let data = {
    role: tipoUser,
  };


  try {
    const respuesta = await fetch(url, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(data), 
    });

    if (respuesta.ok) {
      window.location.reload(); 
    } else {
      console.error("Error al modificar el usuario:", respuesta.statusText);
    }
  } catch (error) {
    console.error("Error al modificar el usuario:", error);
    alert("Error al modificar el usuario");
  }
}

function botonModificar(button) {
  const row = button.closest("tr");

  const btnGuardar = row.querySelector(".btn_guardar");
  const selectTipoUsuario = row.querySelector("select:first-of-type");
  const selectTipoUsuarioGuardar = row.querySelector("select:last-of-type");

  button.style.display = "none"; 
  btnGuardar.style.display = "block"; 

  selectTipoUsuario.style.display = "none"; 
  selectTipoUsuarioGuardar.style.display = "block"; 
}
