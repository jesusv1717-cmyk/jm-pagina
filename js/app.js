// =========================================
// Lógica de Interfaz JM Soluciones
// =========================================

// 1. Inyectar el botón de WhatsApp dinámicamente
document.addEventListener('DOMContentLoaded', function() {
    const waBtn = document.createElement('a');
    waBtn.href = "https://wa.me/56940963513"; 
    waBtn.className = "whatsapp-float";
    waBtn.target = "_blank";
    waBtn.innerHTML = '<i class="bi bi-whatsapp"></i>';
    document.body.appendChild(waBtn);
});

// 2. Manejo del Formulario de Contacto (Formspree + Redirección a WS)
document.getElementById('contactoForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var form = this;
    var data = new FormData(form);

    // Validación de teléfono
    var telefonoIngresado = data.get('telefono');
    var soloNumeros = telefonoIngresado.replace(/\D/g, ''); 

    if (soloNumeros.length < 8) {
        alert("El número de teléfono parece estar incompleto. Por favor verifica que tenga todos los dígitos para poder contactarte.");
        return; 
    }

    // Envío a Formspree silencioso
    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            var nombre = data.get('nombre');
            var maquinaria = data.get('maquinaria');
            var requerimiento = data.get('requerimiento');

            var mensaje = "¡Hola equipo de JM Soluciones! Acabo de enviar una solicitud por la web.%0A%0A" +
                          "Soy *" + nombre + "* y solicito asistencia para: *" + maquinaria + "*.%0A" +
                          "Detalle breve: " + requerimiento;

            var telefonoJM = "56940963513"; 

            window.location.href = "https://wa.me/" + telefonoJM + "?text=" + mensaje;
            form.reset();
        } else {
            alert("Hubo un pequeño problema al enviar el formulario. Por favor, intenta de nuevo.");
        }
    }).catch(error => {
        alert("Error de red. Por favor, revisa tu conexión a internet.");
    });
});