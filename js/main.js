// Функция для создания звезд
function createStar() {
  const space = document.getElementById("space");
  const star = document.createElement("div");
  star.classList.add("star");

  // Рандомные позиции для звезд
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;

  star.style.left = `${x}px`;
  star.style.top = `${y}px`;

  // Рандомное время мерцания
  star.style.animationDuration = `${Math.random() * 2 + 1}s`;

  space.appendChild(star);
}

// Функция для создания метеоритов
function createMeteor() {
  const space = document.getElementById("space");
  const meteor = document.createElement("div");
  meteor.classList.add("meteor");

  // Рандомные позиции для метеоритов
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;

  meteor.style.left = `${x}px`;
  meteor.style.top = `${y}px`;

  // Рандомное время полета
  meteor.style.animationDuration = `${Math.random() * 3 + 2}s`;

  space.appendChild(meteor);

  // Удаляем метеор после завершения анимации
  setTimeout(() => {
    meteor.remove();
  }, 5000);
}

// Создаем звезды
for (let i = 0; i < 100; i++) {
  createStar();
}

// Создаем метеориты каждые 3 секунды
setInterval(createMeteor, 3000);

//-----
// Функция для добавления изображений
function addImagesToElements() {
  // Находим все элементы <b> с атрибутом data-myinfo="streamname"
  const elements = document.querySelectorAll('b[data-myinfo="streamname"]');

  elements.forEach((element) => {
    // Проверяем текст внутри элемента
    if (element.textContent === "Auto-DJ") {
      // Создаем изображение для Auto-Dj
      const img = document.createElement("img");
      img.src = "../img/dj.png"; // URL изображения
      img.alt = "Auto-DJ Image";
      img.classList.add("auto-dj-image"); // Добавляем класс

      // Вставляем изображение после элемента <b>
      element.insertAdjacentElement("afterend", img);
    } else if (element.textContent === "Dj") {
      // Создаем изображение для Dj
      const img = document.createElement("img");
      img.src = "https://via.placeholder.com/40"; // URL изображения
      img.alt = "Dj Image";
      img.classList.add("dj-image"); // Добавляем класс

      // Вставляем изображение после элемента <b>
      element.insertAdjacentElement("afterend", img);
    }
  });
}

// Вызываем функцию после загрузки DOM
document.addEventListener("DOMContentLoaded", addImagesToElements);
