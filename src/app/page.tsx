"use client";

import Form from "@/components/books-form";
import { useState, useEffect } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  imgUrl: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Fetch books from API
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <main className="p-4">

<Form/>

      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="p-4 border rounded shadow-md flex flex-col items-center"
          >
            <img
              src={book.imgUrl}
              alt={book.title}
              className="w-40 h-60 object-cover mb-2"
            />
            <h2 className="font-bold text-center">{book.title}</h2>
            <p className="text-sm text-gray-600 text-center">{book.author}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
