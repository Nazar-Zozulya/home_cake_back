-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "composition" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "kilocalories" INTEGER NOT NULL
);
