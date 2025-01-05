import { createDatabase } from "./createDatabaseAndTable";

async function main() {
  try {
    // Создаем базу данных и таблицу
    await createDatabase();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Вызываем функцию main
main().catch((error) => {
  console.error("An error occurred:", error);
});
