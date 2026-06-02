import { createClient } from '@supabase/supabase-js';

// Setup your Supabase database client
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function downloadAndSaveBookByISBN(isbn: string) {
  try {
    // 1. Ask Google Books for the data using standard 'fetch'
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    const data = await response.json();

    // Check if Google actually found the book
    if (!data.items || data.items.length === 0) {
      console.log(` No book found on Google for ISBN: ${isbn}`);
      return;
    }

    // 2. Extract the clean information from Google's complex JSON payload
    const volumeInfo = data.items[0].volumeInfo;
    
    const bookData = {
      title: volumeInfo.title,
      author: volumeInfo.authors ? volumeInfo.authors[0] : 'Unknown Author',
      description: volumeInfo.description || 'No description available.',
      cover_image: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : null,
      purchase_link: `https://www.amazon.com/s?k=${encodeURIComponent(volumeInfo.title + ' ' + volumeInfo.authors?.[0])}`
    };

    console.log(` Downloaded data for: "${bookData.title}"`);

    // 3. Save it directly into your Postgres database table
    const { error } = await supabase
      .from('books')
      .insert(bookData);

    if (error) throw error;
    console.log(` Saved "${bookData.title}" to database!`);

  } catch (error) {
    console.error(`Error processing ISBN ${isbn}:`, error);
  }
}

// === Example: Run this for an array of ISBN numbers ===
const myIsbnList = ['9780143105428', '9780345806789', '9780062390851'];

async function seedDatabase() {
  for (const isbn of myIsbnList) {
    await downloadAndSaveBookByISBN(isbn);
  }
  console.log("🏁 Finished downloading your book collection!");
}

seedDatabase();
