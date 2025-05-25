import fetch from 'node-fetch';

export async function translateText(text, targetLang) {
  const res = await fetch('https://translate.googleapis.com/translate_a/single?...', {
    method: 'POST',
    body: JSON.stringify({ q: text, target: targetLang }),
    headers: { 'Content-Type': 'application/json' }
  });
  const json = await res.json();
  return json[0]?.[0]?.[0]; // Parsed translation
}
