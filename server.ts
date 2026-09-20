import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not configured in process.env.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function isTransientError(err: any): boolean {
  const errStr = String(err?.message || err?.status || JSON.stringify(err || ""));
  return (
    errStr.includes("503") ||
    errStr.includes("429") ||
    errStr.includes("UNAVAILABLE") ||
    errStr.includes("RESOURCE_EXHAUSTED") ||
    errStr.includes("high demand") ||
    errStr.includes("try again later") ||
    errStr.includes("overloaded")
  );
}

// Curated vector SVG illustration generator for graceful fallback during 503 demand spikes
function generateThemedSvgFallback(chapterNum: number, title: string, topics: string): string {
  // Color themes per chapter category
  const themes: Record<number, { bgStart: string; bgEnd: string; accent: string; secondary: string; icon: string }> = {
    1: { bgStart: "#fef3c7", bgEnd: "#fde68a", accent: "#d97706", secondary: "#1e293b", icon: "👋 Guten Tag!" },
    2: { bgStart: "#e0f2fe", bgEnd: "#bae6fd", accent: "#0284c7", secondary: "#0f172a", icon: "🔤 A B C D" },
    3: { bgStart: "#ede9fe", bgEnd: "#ddd6fe", accent: "#7c3aed", secondary: "#1e1b4b", icon: "❓ Wer? Was? Wie?" },
    4: { bgStart: "#fce7f3", bgEnd: "#fbcfe8", accent: "#db2777", secondary: "#831843", icon: "👨‍👩‍👧‍👦 Familie" },
    5: { bgStart: "#fef9c3", bgEnd: "#fef08a", accent: "#ca8a04", secondary: "#422006", icon: "⏰ 08:00 Alltag" },
    6: { bgStart: "#ccfbf1", bgEnd: "#99f6e4", accent: "#0d9488", secondary: "#134e4a", icon: "🛋️ Wohnen & Möbel" },
    7: { bgStart: "#ffedd5", bgEnd: "#fed7aa", accent: "#ea580c", secondary: "#7c2d12", icon: "☕ Café & Essen" },
    8: { bgStart: "#e2e8f0", bgEnd: "#cbd5e1", accent: "#475569", secondary: "#0f172a", icon: "🚋 Stadt & Weg" },
    9: { bgStart: "#dbeafe", bgEnd: "#bfdbfe", accent: "#2563eb", secondary: "#1e3a8a", icon: "🌦️ Wetter & Mode" },
    10: { bgStart: "#dcfce7", bgEnd: "#bbf7d0", accent: "#16a34a", secondary: "#14532d", icon: "🛒 Markt & Einkauf" },
    11: { bgStart: "#f1f5f9", bgEnd: "#e2e8f0", accent: "#334155", secondary: "#020617", icon: "💼 Beruf & Büro" },
    12: { bgStart: "#fee2e2", bgEnd: "#fecaca", accent: "#dc2626", secondary: "#7f1d1d", icon: "🩺 Praxis & Arzt" },
    13: { bgStart: "#fae8ff", bgEnd: "#f5d0fe", accent: "#c026d3", secondary: "#701a75", icon: "📅 Termine & Kalender" },
    14: { bgStart: "#fef3c7", bgEnd: "#fed7aa", accent: "#d97706", secondary: "#431407", icon: "✈️ Perfekt & Reisen" },
    15: { bgStart: "#fef08a", bgEnd: "#fde047", accent: "#eab308", secondary: "#422006", icon: "🏆 A1 Prüfung & Erfolg" },
  };

  const currentTheme = themes[chapterNum] || themes[1];

  return `<svg viewBox="0 0 800 450" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cardBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${currentTheme.bgStart}"/>
      <stop offset="100%" stop-color="${currentTheme.bgEnd}"/>
    </linearGradient>
    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${currentTheme.accent}"/>
      <stop offset="100%" stop-color="${currentTheme.secondary}"/>
    </linearGradient>
    <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.08"/>
    </filter>
  </defs>

  <!-- Background Base Canvas -->
  <rect width="800" height="450" fill="url(#cardBgGrad)"/>

  <!-- Geometric Abstract Shapes for Depth -->
  <circle cx="720" cy="80" r="140" fill="${currentTheme.accent}" fill-opacity="0.12"/>
  <circle cx="80" cy="380" r="120" fill="${currentTheme.secondary}" fill-opacity="0.08"/>
  <circle cx="400" cy="225" r="220" fill="#ffffff" fill-opacity="0.25"/>

  <!-- Center Decorative Vector Plate -->
  <g filter="url(#cardShadow)">
    <rect x="120" y="85" width="560" height="280" rx="24" fill="#ffffff" fill-opacity="0.94"/>
    <rect x="120" y="85" width="560" height="280" rx="24" stroke="${currentTheme.accent}" stroke-width="2" stroke-opacity="0.25" fill="none"/>
  </g>

  <!-- Chapter Indicator Badge -->
  <rect x="160" y="125" width="170" height="34" rx="17" fill="url(#badgeGrad)"/>
  <text x="245" y="147" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">MODUL ${chapterNum} • A1</text>

  <!-- Title & Subtitle -->
  <text x="160" y="205" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" fill="${currentTheme.secondary}">${title}</text>
  <text x="160" y="238" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500" fill="#64748b">${topics.slice(0, 50)}</text>

  <!-- Iconic Illustration Element -->
  <g transform="translate(520, 150)">
    <circle cx="60" cy="60" r="60" fill="${currentTheme.bgStart}" stroke="${currentTheme.accent}" stroke-width="3" stroke-opacity="0.4"/>
    <text x="60" y="72" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" text-anchor="middle">${currentTheme.icon.split(" ")[0]}</text>
  </g>

  <!-- Interactive German Learning Seal -->
  <g transform="translate(160, 280)">
    <rect x="0" y="0" width="130" height="30" rx="8" fill="#f1f5f9"/>
    <text x="65" y="19" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="${currentTheme.secondary}" text-anchor="middle">🇩🇪 Deutsch Lernen</text>
  </g>
  <g transform="translate(305, 280)">
    <rect x="0" y="0" width="110" height="30" rx="8" fill="${currentTheme.bgStart}"/>
    <text x="55" y="19" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="${currentTheme.accent}" text-anchor="middle">Niveau A1</text>
  </g>

  <!-- Bottom Visual Accent Bar -->
  <rect x="0" y="442" width="800" height="8" fill="url(#badgeGrad)"/>
</svg>`;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Check status endpoint
app.get("/api/gemini/status", (req, res) => {
  res.json({
    hasKey: !!process.env.GEMINI_API_KEY,
    status: "ready",
  });
});

// Utility: Convert 16-bit PCM buffer to standard WAV
function pcmToWav(
  pcmData: Buffer,
  sampleRate = 24000,
  numChannels = 1,
  bitsPerSample = 16
): Buffer {
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmData.length;
  const header = Buffer.alloc(44);

  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmData]);
}

// Available neat German voices
const GERMAN_VOICES = [
  { id: "de-DE-KatjaNeural", name: "Katja", gender: "Weiblich", style: "Klar & Natürlich (Standard)" },
  { id: "de-DE-KillianNeural", name: "Killian", gender: "Männlich", style: "Klar & Natürlich" },
  { id: "de-DE-ConradNeural", name: "Conrad", gender: "Männlich", style: "Ruhig & Seriös" },
  { id: "de-DE-AmalaNeural", name: "Amala", gender: "Weiblich", style: "Sanft & Freundlich" },
];

app.get("/api/tts/voices", (_req, res) => {
  res.json({ voices: GERMAN_VOICES });
});

// High-fidelity German TTS Audio endpoint with in-memory caching
const ttsAudioCache = new Map<string, { buffer: Buffer; contentType: string }>();

app.get("/api/tts", async (req, res) => {
  try {
    const rawText = String(req.query.text || "").trim();
    const requestedVoice = String(req.query.voice || "de-DE-KatjaNeural").trim();
    const voiceToUse = GERMAN_VOICES.some((v) => v.id === requestedVoice)
      ? requestedVoice
      : "de-DE-KatjaNeural";

    if (!rawText) {
      return res.status(400).send("Text parameter is required");
    }

    // Clean text: strip brackets, grammar annotations, special symbols
    const cleanText = rawText
      .replace(/\(.*?\)/g, "")
      .replace(/\[.*?\]/g, "")
      .replace(/[→·|/]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!cleanText) {
      return res.status(400).send("Cleaned text is empty");
    }

    // Keep length safe for speech utterance (supports full story paragraphs)
    const textToSpeak = cleanText.slice(0, 1200);
    const cacheKey = `${voiceToUse}_${textToSpeak.toLowerCase()}`;

    if (ttsAudioCache.has(cacheKey)) {
      const cached = ttsAudioCache.get(cacheKey)!;
      res.setHeader("Content-Type", cached.contentType);
      res.setHeader("Cache-Control", "public, max-age=604800");
      res.setHeader("X-TTS-Source", "CACHE");
      return res.send(cached.buffer);
    }

    // 1. Primary Engine: Neural German TTS (MsEdgeTTS: broadcast clarity, natural prosody)
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata(voiceToUse, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioStream } = tts.toStream(textToSpeak);

      const audioBuffer: Buffer = await new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        const timer = setTimeout(() => {
          try { tts.close(); } catch (_) {}
          reject(new Error("TTS stream timed out"));
        }, 6000);

        audioStream.on("data", (chunk: Buffer) => chunks.push(chunk));
        audioStream.on("end", () => {
          clearTimeout(timer);
          try { tts.close(); } catch (_) {}
          resolve(Buffer.concat(chunks));
        });
        audioStream.on("error", (err: any) => {
          clearTimeout(timer);
          try { tts.close(); } catch (_) {}
          reject(err);
        });
      });

      if (audioBuffer && audioBuffer.length > 0) {
        // Cache in LRU map
        if (ttsAudioCache.size > 1200) {
          const oldestKey = ttsAudioCache.keys().next().value;
          if (oldestKey) ttsAudioCache.delete(oldestKey);
        }
        ttsAudioCache.set(cacheKey, { buffer: audioBuffer, contentType: "audio/mpeg" });

        res.setHeader("Content-Type", "audio/mpeg");
        res.setHeader("Cache-Control", "public, max-age=604800");
        res.setHeader("X-TTS-Source", "NEURAL_EDGE");
        return res.send(audioBuffer);
      }
    } catch (edgeErr) {
      console.warn("Neural German TTS error, trying Gemini TTS fallback:", edgeErr);
    }

    // 2. Fallback Engine: Gemini 3.1 Flash TTS
    const ai = getGeminiClient();
    if (ai) {
      try {
        const geminiRes = await ai.models.generateContent({
          model: "gemini-3.1-flash-tts-preview",
          contents: [{ parts: [{ text: textToSpeak }] }],
          config: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: "Kore" },
              },
            },
          },
        });
        const b64 = geminiRes.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (b64) {
          const pcm = Buffer.from(b64, "base64");
          const wav = pcmToWav(pcm, 24000);
          ttsAudioCache.set(cacheKey, { buffer: wav, contentType: "audio/wav" });
          res.setHeader("Content-Type", "audio/wav");
          res.setHeader("Cache-Control", "public, max-age=604800");
          res.setHeader("X-TTS-Source", "GEMINI_TTS");
          return res.send(wav);
        }
      } catch (geminiErr) {
        console.warn("Gemini TTS fallback error:", geminiErr);
      }
    }

    return res.status(502).send("German TTS generation temporarily unavailable");
  } catch (err: any) {
    console.error("TTS endpoint fatal error:", err?.message || err);
    return res.status(500).send("Failed to retrieve German TTS audio");
  }
});

// Curated verified A1 & A2 videos from @Daily_Deutsch for instant resilience
const CURATED_DAILY_DEUTSCH_VIDEOS = [
  {
    id: "iXNI5CGD2e0",
    title: "Easy A1 German Story | A1 Deutsch lernen mit dieser Morgen-Routine",
    level: "A1" as const,
    isA1: true,
    isA2: false,
    published: "2024-05-10T14:00:00Z",
    publishedFormatted: "A1 Story",
    views: 21579,
    viewsFormatted: "21.5k Aufrufe",
    thumbnail: "https://i.ytimg.com/vi/iXNI5CGD2e0/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=iXNI5CGD2e0",
  },
  {
    id: "9nm9X0eZx8M",
    title: "Learn German A1 | MY PHONE | A1 German Story | Easy German Listening Practice",
    level: "A1" as const,
    isA1: true,
    isA2: false,
    published: "2024-04-20T14:00:00Z",
    publishedFormatted: "A1 Story",
    views: 9984,
    viewsFormatted: "10.0k Aufrufe",
    thumbnail: "https://i.ytimg.com/vi/9nm9X0eZx8M/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=9nm9X0eZx8M",
  },
  {
    id: "GEXxWvOU2W0",
    title: "German for Beginners A1 | My favourite Restaurant | Easy German Story",
    level: "A1" as const,
    isA1: true,
    isA2: false,
    published: "2024-04-05T14:00:00Z",
    publishedFormatted: "A1 Story",
    views: 14076,
    viewsFormatted: "14.1k Aufrufe",
    thumbnail: "https://i.ytimg.com/vi/GEXxWvOU2W0/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=GEXxWvOU2W0",
  },
  {
    id: "Nw-lpj_t6YA",
    title: "A1–A2 Deutsch lernen | Meine Morgenroutine als Studentin (+ quiz)",
    level: "A1-A2" as const,
    isA1: true,
    isA2: true,
    published: "2024-06-15T14:00:00Z",
    publishedFormatted: "A1–A2 Story",
    views: 9462,
    viewsFormatted: "9.5k Aufrufe",
    thumbnail: "https://i.ytimg.com/vi/Nw-lpj_t6YA/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=Nw-lpj_t6YA",
  },
  {
    id: "iJpEcmXA_Mw",
    title: "German Story for Beginners | Lea's Daily Life (A1-A2 German Listening Practice)",
    level: "A1-A2" as const,
    isA1: true,
    isA2: true,
    published: "2024-06-25T14:00:00Z",
    publishedFormatted: "A1–A2 Story",
    views: 6492,
    viewsFormatted: "6.5k Aufrufe",
    thumbnail: "https://i.ytimg.com/vi/iJpEcmXA_Mw/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=iJpEcmXA_Mw",
  },
  {
    id: "a527M-ZK6L8",
    title: "A1–A2 German Story: Kochen mit Mama 🍝 Easy German Listening Practice",
    level: "A1-A2" as const,
    isA1: true,
    isA2: true,
    published: "2024-05-28T14:00:00Z",
    publishedFormatted: "A1–A2 Story",
    views: 9963,
    viewsFormatted: "10.0k Aufrufe",
    thumbnail: "https://i.ytimg.com/vi/a527M-ZK6L8/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=a527M-ZK6L8",
  },
  {
    id: "eGKB-3WbLB4",
    title: "Deutsch lernen mit Geschichten: Mein Fahrrad (A1-A2) | German Listening Practice",
    level: "A1-A2" as const,
    isA1: true,
    isA2: true,
    published: "2024-05-18T14:00:00Z",
    publishedFormatted: "A1–A2 Story",
    views: 6423,
    viewsFormatted: "6.4k Aufrufe",
    thumbnail: "https://i.ytimg.com/vi/eGKB-3WbLB4/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=eGKB-3WbLB4",
  },
  {
    id: "KBaBDZCOnMw",
    title: "Learn German with a Simple Story (A1–A2) | Deutsch lernen | Mein Handy",
    level: "A1-A2" as const,
    isA1: true,
    isA2: true,
    published: "2024-05-02T14:00:00Z",
    publishedFormatted: "A1–A2 Story",
    views: 3963,
    viewsFormatted: "4.0k Aufrufe",
    thumbnail: "https://i.ytimg.com/vi/KBaBDZCOnMw/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=KBaBDZCOnMw",
  },
  {
    id: "MveQKM5tdAM",
    title: "A2 Deutsch Story: Mein Bruder & Grammatik-Check | German Listening Practice",
    level: "A2" as const,
    isA1: false,
    isA2: true,
    published: "2024-06-20T14:00:00Z",
    publishedFormatted: "A2 Story",
    views: 7776,
    viewsFormatted: "7.8k Aufrufe",
    thumbnail: "https://i.ytimg.com/vi/MveQKM5tdAM/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=MveQKM5tdAM",
  },
  {
    id: "0nBEFKqe-x0",
    title: "Learn German A2 | Mein altes Tagebuch | A2 German Story with English Subtitles",
    level: "A2" as const,
    isA1: false,
    isA2: true,
    published: "2024-06-08T14:00:00Z",
    publishedFormatted: "A2 Story",
    views: 4842,
    viewsFormatted: "4.8k Aufrufe",
    thumbnail: "https://i.ytimg.com/vi/0nBEFKqe-x0/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=0nBEFKqe-x0",
  },
  {
    id: "EPungXwq75E",
    title: "Learn German A2 | Mein Lieblingsrestaurant | A2 Deutsch Geschichte mit Untertiteln",
    level: "A2" as const,
    isA1: false,
    isA2: true,
    published: "2024-04-28T14:00:00Z",
    publishedFormatted: "A2 Story",
    views: 4615,
    viewsFormatted: "4.6k Aufrufe",
    thumbnail: "https://i.ytimg.com/vi/EPungXwq75E/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=EPungXwq75E",
  },
  {
    id: "ESV8JoBci3o",
    title: "LEARN GERMAN A2 | Meine erste Wohnung: Deutsch lernen für A2 (mit Quiz!)",
    level: "A2" as const,
    isA1: false,
    isA2: true,
    published: "2024-04-12T14:00:00Z",
    publishedFormatted: "A2 Story",
    views: 3312,
    viewsFormatted: "3.3k Aufrufe",
    thumbnail: "https://i.ytimg.com/vi/ESV8JoBci3o/hqdefault.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=ESV8JoBci3o",
  },
];

// Helper to format date
function formatDateGerman(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "Aktuell";
    return d.toLocaleDateString("de-DE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch (_) {
    return "Aktuell";
  }
}

// Helper to format views
function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M Aufrufe`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}k Aufrufe`;
  }
  return `${views} Aufrufe`;
}

// Endpoint: Fetch and filter A1/A2 videos from @Daily_Deutsch YouTube channel
app.get("/api/daily-deutsch-videos", async (req, res) => {
  const channelHandle = "@Daily_Deutsch";
  const channelUrl = "https://www.youtube.com/@Daily_Deutsch";
  const channelId = "UCWF_7a-r8JUUEFR5MzAFTvg";
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

  try {
    const upstream = await fetch(feedUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      },
    });

    if (!upstream.ok) {
      console.warn("YouTube RSS feed returned status:", upstream.status);
      return res.json({
        channel: {
          handle: channelHandle,
          url: channelUrl,
          title: "Daily Deutsch",
        },
        source: "curated_fallback",
        total: CURATED_DAILY_DEUTSCH_VIDEOS.length,
        videos: CURATED_DAILY_DEUTSCH_VIDEOS,
      });
    }

    const xml = await upstream.text();
    const entries = xml.split("<entry>").slice(1);
    const parsedVideos: typeof CURATED_DAILY_DEUTSCH_VIDEOS = [];

    for (const entry of entries) {
      const idMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
      const titleMatch = entry.match(/<title>(.*?)<\/title>/);
      const pubMatch = entry.match(/<published>(.*?)<\/published>/);
      const viewsMatch = entry.match(/<media:statistics views="(\d+)"/);

      if (!idMatch || !titleMatch) continue;

      const id = idMatch[1];
      const rawTitle = titleMatch[1]
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");

      const hasA1 = /\bA1\b/i.test(rawTitle);
      const hasA2 = /\bA2\b/i.test(rawTitle);
      const hasHigherLevel = /\b(B1|B2|C1|C2)\b/i.test(rawTitle);

      // STRICT FILTER: Only videos with A1 or A2 in the title, excluding higher levels (B1/B2/C1)
      if ((hasA1 || hasA2) && !hasHigherLevel) {
        const rawViews = viewsMatch ? parseInt(viewsMatch[1], 10) : 0;
        const pubDate = pubMatch ? pubMatch[1] : "";

        const level: "A1" | "A2" | "A1-A2" =
          hasA1 && hasA2 ? "A1-A2" : hasA1 ? "A1" : "A2";

        parsedVideos.push({
          id,
          title: rawTitle,
          level,
          isA1: hasA1,
          isA2: hasA2,
          published: pubDate,
          publishedFormatted: formatDateGerman(pubDate),
          views: rawViews,
          viewsFormatted: formatViews(rawViews),
          thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          youtubeUrl: `https://www.youtube.com/watch?v=${id}`,
        });
      }
    }

    // Merge with curated list so all known A1 stories are preserved
    const videoMap = new Map<string, (typeof CURATED_DAILY_DEUTSCH_VIDEOS)[0]>();
    for (const v of parsedVideos) {
      videoMap.set(v.id, v);
    }
    for (const v of CURATED_DAILY_DEUTSCH_VIDEOS) {
      if (!videoMap.has(v.id)) {
        videoMap.set(v.id, v);
      }
    }

    const allFilteredVideos = Array.from(videoMap.values());

    return res.json({
      channel: {
        handle: channelHandle,
        url: channelUrl,
        title: "Daily Deutsch",
      },
      source: "live_youtube_rss",
      total: allFilteredVideos.length,
      videos: allFilteredVideos,
    });
  } catch (err: any) {
    console.error("Error fetching Daily Deutsch videos:", err?.message || err);
    return res.json({
      channel: {
        handle: channelHandle,
        url: channelUrl,
        title: "Daily Deutsch",
      },
      source: "curated_fallback",
      total: CURATED_DAILY_DEUTSCH_VIDEOS.length,
      videos: CURATED_DAILY_DEUTSCH_VIDEOS,
    });
  }
});

// Image / Vector Illustration Generation Endpoint
app.post("/api/generate-illustration", async (req, res) => {
  try {
    const {
      chapterNumber,
      chapterTitle,
      topics = "",
      format = "svg", // 'svg' or 'raster'
      customPrompt = "",
    } = req.body;

    if (!chapterTitle) {
      res.status(400).json({ error: "chapterTitle is required." });
      return;
    }

    const ai = getGeminiClient();

    // 1. If raster image requested, attempt image generation with gemini-3.1-flash-lite-image
    if (format === "raster" && ai) {
      const promptText = `A minimalist, clean, modern vector flat art illustration representing German language learning scenario: "${chapterTitle}". Related concepts: ${topics}. ${
        customPrompt ? `Note: ${customPrompt}.` : ""
      } Aesthetic: warm amber, slate blue, soft cream background, modern editorial vector art, 16:9 banner, no text.`;

      try {
        const imageResponse = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite-image",
          contents: {
            parts: [{ text: promptText }],
          },
          config: {
            imageConfig: {
              aspectRatio: "16:9",
            },
          },
        });

        let foundImage: string | null = null;
        if (imageResponse.candidates?.[0]?.content?.parts) {
          for (const part of imageResponse.candidates[0].content.parts) {
            if (part.inlineData?.data) {
              const mime = part.inlineData.mimeType || "image/png";
              foundImage = `data:${mime};base64,${part.inlineData.data}`;
              break;
            }
          }
        }

        if (foundImage) {
          res.json({
            type: "raster",
            content: foundImage,
            promptUsed: promptText,
            chapterNumber,
          });
          return;
        }
      } catch (imgErr) {
        console.warn("Raster image generation unavailable or 503 high demand, switching to SVG vector:", imgErr);
        // Fall through to SVG vector generation
      }
    }

    // 2. High-precision clean SVG Vector Generation with model fallback & retry
    const svgPrompt = `You are an expert SVG graphic designer. Create a clean, elegant, minimalist vector illustration for a German language educational app hero card.

Module Details:
- Chapter Number: ${chapterNumber || 1}
- Chapter Title: "${chapterTitle}"
- Module Topics: "${topics}"
${customPrompt ? `- Custom Direction: "${customPrompt}"` : ""}

Design Constraints:
1. Output format: Return strictly the complete raw <svg ...> ... </svg> markup. DO NOT include markdown code blocks, backticks (\`\`\`xml or \`\`\`svg), DO NOT include conversational text or html wrappers.
2. SVG Attributes: viewBox="0 0 800 450" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
3. Palette & Atmosphere:
   - Clean, modern, sophisticated color palette.
   - Warm background gradient or soft tint (e.g., #f8fafc to #f1f5f9 or soft amber tints #fef3c7).
   - Accents in warm amber (#f59e0b, #d97706), deep slate navy (#0f172a, #1e293b, #334155), sage teal (#0d9488), soft coral (#f43f5e).
4. Content & Composition:
   - Illustrate a clear, recognizable scene matching the topic (e.g. coffee cup & pastry for café; house & furniture for living; streetcar & transit map for city navigation; clock & coffee for daily routine; market stalls & fruits for shopping; doctor with stethoscope for health; people greeting at a table for introductions).
   - Minimalist vector art style: flat shapes, gentle rounded corners, layered depth, subtle drop-shadow filters or simple opacity overlays.
   - Clean geometric elements, neat lines, and balanced negative space.
   - Do NOT include long illegible text inside the SVG.`;

    // Multi-tier model fallback sequence for high availability
    const candidateModels = ["gemini-3.8-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
    let rawSvg: string | null = null;
    let modelUsed = "";

    if (ai) {
      for (const modelName of candidateModels) {
        // Try up to 2 attempts per model with backoff
        for (let attempt = 1; attempt <= 2; attempt++) {
          try {
            const response = await ai.models.generateContent({
              model: modelName,
              contents: svgPrompt,
            });

            const text = response.text || "";
            let cleaned = text.trim();
            if (cleaned.startsWith("```xml")) {
              cleaned = cleaned.replace(/^```xml\s*/i, "").replace(/```$/i, "").trim();
            } else if (cleaned.startsWith("```svg")) {
              cleaned = cleaned.replace(/^```svg\s*/i, "").replace(/```$/i, "").trim();
            } else if (cleaned.startsWith("```")) {
              cleaned = cleaned.replace(/^```\s*/, "").replace(/```$/, "").trim();
            }

            const svgStart = cleaned.indexOf("<svg");
            const svgEnd = cleaned.lastIndexOf("</svg>");
            if (svgStart !== -1 && svgEnd !== -1) {
              rawSvg = cleaned.substring(svgStart, svgEnd + 6);
              modelUsed = modelName;
              break;
            }
          } catch (modelErr: any) {
            if (isTransientError(modelErr)) {
              console.warn(
                `Model ${modelName} attempt ${attempt} temporary high demand (503/429): ${modelErr?.message || modelErr}`
              );
              if (attempt < 2) {
                await sleep(650);
                continue;
              }
            } else {
              console.warn(`Model ${modelName} encountered error:`, modelErr?.message || modelErr);
              break;
            }
          }
        }

        if (rawSvg) {
          break;
        }
      }
    }

    // 3. If all AI models are undergoing temporary 503 high demand or API unavailable,
    // seamlessly provide the elegant themed procedural SVG vector so the app NEVER breaks!
    if (!rawSvg) {
      console.warn(`All Gemini models temporarily high demand. Serving curated themed vector illustration.`);
      rawSvg = generateThemedSvgFallback(chapterNumber || 1, chapterTitle, topics);
      modelUsed = "procedural-vector-fallback";
    }

    res.json({
      type: "svg",
      content: rawSvg,
      promptUsed: `Vector illustration for: ${chapterTitle} (${modelUsed})`,
      chapterNumber,
      fallback: modelUsed === "procedural-vector-fallback",
    });
  } catch (error: any) {
    console.warn("Recovering from illustration generation error with themed vector:", error?.message || error);
    const fallbackSvg = generateThemedSvgFallback(
      req.body?.chapterNumber || 1,
      req.body?.chapterTitle || "Deutsch Lernen",
      req.body?.topics || ""
    );
    res.json({
      type: "svg",
      content: fallbackSvg,
      promptUsed: "Themed fallback vector illustration",
      chapterNumber: req.body?.chapterNumber || 1,
      fallback: true,
    });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
