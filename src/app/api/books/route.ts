import { NextResponse } from "next/server";
import { books, Book } from "../../../../data";

export async function GET() {
  return NextResponse.json(books);
}

export async function POST(req: Request) {
  const newBook: Book = await req.json();
  newBook.id = books.length + 1;
  books.push(newBook);
  console.log(newBook);
  
  return NextResponse.json(newBook, { status: 201 });
}
