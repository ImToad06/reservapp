// HandleSignUp.jsx
export default async function handleRegister(e, formData) {
    e.preventDefault();

    try {
        // Mapeo de datos a lo que el backend espera
        const payload = {
            name: formData.ownerName,
            lastName: formData.lastName, // puedes poner otro input si es necesario
            birthdate: formData.birthdate,
            email: formData.email,
            password: formData.password,
            role: 3 // Asignación por defecto
        };

        const response = await fetch("http://localhost:3000/api/auth/register/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Antes de parsear como JSON, comprobamos que sea realmente JSON
        const text = await response.text();
        try {
            const data = JSON.parse(text);
            console.log("Registro exitoso:", data);
            alert("Usuario registrado con éxito ✅");
        } catch (err) {
            console.error("La respuesta no es JSON:", text);
            alert("Error inesperado en el servidor");
        }
    } catch (error) {
        console.error("Error al registrar:", error);
        alert("Error en el registro, revisa la consola");
    }
}
