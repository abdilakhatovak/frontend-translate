let favorites = [];

// Функция для перевода слова с использованием fakeTranslate
async function translateWord() {
    const word = document.getElementById("wordInput").value.trim();
    if (!word) {
        alert("Введите слово для перевода.");
        return;
    }
    try {
        const translation = await fakeTranslate(word);
        document.getElementById("translationResult").innerText = translation;
        
        // Разблокировать кнопку сохранения после успешного перевода
        document.getElementById("saveButton").disabled = false;
    } catch (error) {
        // Покажите сообщение об ошибке
        document.getElementById("translationResult").innerText = error;
    }
}

// Сохранение перевода в избранное
function saveTranslation() {
    const word = document.getElementById("wordInput").value.trim();
    const translation = document.getElementById("translationResult").innerText;

    favorites.push({ word, translation });
    updateFavorites();
    document.getElementById("saveButton").disabled = true;
    
    alert(`Сохранено: ${word} - ${translation}`);
}

// Обновление списка избранного
function updateFavorites() {
    const favoritesList = document.getElementById("favoritesList");
    favoritesList.innerHTML = ""; // Очистить список

    if (favorites.length === 0) {
        const message = document.createElement("li");
        message.innerText = "Нет избранных переводов.";
        favoritesList.appendChild(message);
    } else {
        favorites.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.innerText = `${item.word} - ${item.translation}`;
            
            const removeButton = document.createElement("button");
            removeButton.innerText = "Удалить";
            removeButton.addEventListener("click", () => removeFavorite(index));
            
            listItem.appendChild(removeButton);
            favoritesList.appendChild(listItem);
        });
    }
}

// Удаление перевода из избранного
function removeFavorite(index) {
    favorites.splice(index, 1); // Удалите элемент из favorites
    updateFavorites();
    alert("Перевод удален из избранного.");
}

document.getElementById("translateButton").addEventListener("click", translateWord);
document.getElementById("saveButton").addEventListener("click", saveTranslation);


document.getElementById("saveButton").disabled = true;






