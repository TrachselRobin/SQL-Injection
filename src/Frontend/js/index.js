const url = "10.62.146.176"; // change only this to the "IPv4-Adresse" of "Drahtlos-LAN-Adapter WLAN" with ipconfig
const port = "3000";
let gamename = "";

document.addEventListener("DOMContentLoaded", () => {
    const nameForm = document.getElementById("nameForm");
    const injectionForm = document.getElementById("injectionForm");
    const header = document.getElementsByTagName("header")[0];

    nameForm.addEventListener("submit", (event) => {
        event.preventDefault();  // Prevent form submission to allow JavaScript handling

        // Get the input value from the #name field
        const nameInput = document.getElementById("name");
        const username = nameInput.value;

        // Set or update the cookie with the username value
        document.cookie = `username=${username}; path=/;`;
        gamename = username

        // Set the style of the top element to 100vh
        header.style.top = "-100vh";
    });

    injectionForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("login").value;

        const response = await submitUsername(gamename, username);

        if (response.valid) {
            report("Wir Gratulieren Ihnen! Sie haben einen erfolgreichen SQL-Injection-Angriff ausgeführt. So sieht das endgültige SQL aus: \n" + response.sql)
        } else {
            report("Nicht ganz! Versuche mithilfe des Benutzernamens einen SQL-Injection-Angriff auszuüben. Ihr SQL ist entweder ungültig oder keine Injection: \n" + response.sql)
        }
    });
});

function submitUsername(gamename, username) {
    return fetch(`http://${url}:${port}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ gamename, username })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("Server response:", data);
            // Handle the server response (e.g., display success message, redirect, etc.)
            return data;
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
            // Handle error (e.g., display an error message)
        });
}

function report(text) {
    const p = document.getElementById("info")

    p.innerText = text;
}
