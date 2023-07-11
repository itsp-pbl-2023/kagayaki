//https://zenn.dev/hathle/books/next-supabase-voice-book/viewer/03_whisper
//https://javascript.plainenglish.io/transcribe-audio-files-using-whisper-open-ai-api-using-next-js-and-typescript-ad851016c889

export async function POST(req: Request) {
  const formData: any = await req.formData();
  formData.append("model", "whisper-1");
  formData.append("language", "ja");
  const audioFile: any = formData.get("file");

  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY ?? ""}`,
    },
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  const transcript = data.text;

  const responseData = JSON.stringify({
    transcript: `${transcript}`,
  });

  return new Response(responseData);
}
