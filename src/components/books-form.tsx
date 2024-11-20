"use client";

import { useState, useEffect } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  imgUrl: string;
}

export default function Form() {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    // Fetch books from API
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();

    const newBook = { title, author, imgUrl };
    const res = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });

    if (res.ok) {
      const addedBook = await res.json();
      setBooks((prevBooks) => [...prevBooks, addedBook]);
      setTitle("");
      setAuthor("");
      setImgUrl("");
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>

      {/* Add Book Form */}
      <form onSubmit={handleAddBook} className="mb-4 flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Book
        </button>
      </form>

      {/* Book Grid */}
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
