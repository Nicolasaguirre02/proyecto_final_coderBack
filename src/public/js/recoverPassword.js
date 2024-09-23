const form_recover_password = document.getElementById("form_recover_password");

const mail = document.getElementById("mail");
const password = document.getElementById("password");

form_recover_password.addEventListener("submit", async (even) => {
  even.preventDefault();

  let recuperar = {
    email: mail.value,
    password: password.value,
  };

  const data =  await recuperarPassword(recuperar);
  console.log(data);
  const dataRespuesta = data.respuesta;
  alert(dataRespuesta)

});

async function recuperarPassword(data) {
    try {
      console.log("sisisis", JSON.stringify(data));
  
      const respuesta = await fetch("http://localhost:8080/api/recoverPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const resultado = await respuesta.json();
      return resultado
    } catch (error) {
      console.log("error", error);
    }
  }
  