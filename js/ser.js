// Функция для замены текста на изображения
function replaceTextWithImages() {
  // Массив сопоставления текста и изображений
  const imageMap = {
    "Auto-DJ": "../img/dj.png", // URL вашей картинки для Auto-DJ
    // DJ: "https://example.com/dj.jpg", // URL вашей картинки для DJ
  };

  // Находим все элементы с атрибутом data-myinfo="streamname"
  const elements = document.querySelectorAll('b[data-myinfo="streamname"]');

  // Проходимся по каждому элементу
  elements.forEach((element) => {
    // Создаем MutationObserver для отслеживания изменений в тексте
    const observer = new MutationObserver(() => {
      const text = element.textContent.trim(); // Получаем текст внутри элемента

      // Проверяем, есть ли соответствующее изображение в мапе
      if (imageMap[text]) {
        // Создаем элемент img
        const img = document.createElement("img");
        img.src = imageMap[text]; // Устанавливаем источник изображения
        img.alt = text; // Добавляем альтернативный текст
        img.classList.add("custom-image"); // Добавляем класс для стилизации

        // Заменяем текст изображением
        element.textContent = ""; // Очищаем текст
        element.appendChild(img); // Добавляем изображение
      }
    });

    // Начинаем наблюдать за изменениями в элементе
    observer.observe(element, { childList: true });
  });
}

// Вызываем функцию после загрузки страницы
document.addEventListener("DOMContentLoaded", replaceTextWithImages);
