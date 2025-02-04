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
