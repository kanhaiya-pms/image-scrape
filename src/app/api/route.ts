"use server";
import axios from 'axios';
import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Extract the URL parameter from the request, decode it, and add "https://" if missing
  const rawUrl = request.url.split("url=")[1];
  if (!rawUrl) {
    return NextResponse.json({ message: 'No URL provided' });
  }

  const decodedUrl = decodeURIComponent(rawUrl);
  const cleanedUrl = decodedUrl.startsWith("http") ? decodedUrl : `https://${decodedUrl}`;

  try {
    const { data } = await axios.get(cleanedUrl);
    const $ = cheerio.load(data);

    // Extract all image URLs
    const images: string[] = [];
    $('img').each((index, img) => {
      const src = $(img).attr('src');
      if (src) {
        const fullSrc = new URL(src, cleanedUrl).href;
        images.push(fullSrc);
      }
    });

    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.error()
  }
}
