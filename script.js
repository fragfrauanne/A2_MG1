const tasks = [
    { question: "alle Äpfel allein essen", answer: "Warum hast du alle Äpfel allein gegessen?" },
    { question: "mich gestern nicht anrufen", answer: "Warum hast du mich gestern nicht angerufen?" },
    { question: "mich am Sonntag nicht besuchen", answer: "Warum hast du mich am Sonntag nicht besucht?" },
    { question: "im Kino einschlafen", answer: "Warum bist du im Kino eingeschlafen?" },
    { question: "nichts einkaufen", answer: "Warum hast du nichts eingekauft?" },
    { question: "von dem Kuchen so wenig essen", answer: "Warum hast du von dem Kuchen so wenig gegessen?" },
    { question: "mir keine E-Mail schreiben", answer: "Warum hast du mir keine E-Mail geschrieben?" },
    { question: "so viel trinken", answer: "Warum hast du so viel getrunken?" },
    { question: "so schnell fahren", answer: "Warum bist du so schnell gefahren?" },
    { question: "nicht an der Haltestelle aussteigen", answer: "Warum bist du nicht an der Haltestelle ausgestiegen?" },
    { question: "mit meinem Mann / meiner Frau tanzen", answer: "Warum hast du mit meinem Mann / meiner Frau getanzt?" },
    { question: "nicht auf mich warten", answer: "Warum hast du nicht auf mich gewartet?" },
    { question: "schon wieder neue Schuhe kaufen", answer: "Warum hast du schon wieder neue Schuhe gekauft?" },
    { question: "den ganzen Abend telefonieren", answer: "Warum hast du den ganzen Abend telefoniert?" },
    { question: "mich nicht abholen", answer: "Warum hast du mich nicht abgeholt?" },
    { question: "nicht zur Party kommen", answer: "Warum bist du nicht zur Party gekommen?" },
    { question: "so laut Musik hören", answer: "Warum hast du so laut Musik gehört?" },
    { question: "schon wieder die Hausaufgabe vergessen", answer: "Warum hast du schon wieder die Hausaufgabe vergessen?" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);