---
title: "Seeking insights from a recording using Google Cloud Speech-to-Text, Google Colab, and ChatGPT"
description: Transcribe a mentorship recording with Google Cloud Speech-to-Text and extract insights with ChatGPT
date: 2024-03-03
slug: seeking-insights-speech-to-text
tags: [google cloud platform, google colab, chatgpt, mentorship]
mermaid: true
---

## Why record mentorship calls?

I recently joined an online mentorship on [Topmate](https://topmate.io/). After the call, Topmate emailed me a link to the MP4 recording. Having the full session lets me revisit the advice, catch the bits I missed live, and turn a dense hour into working notes.

<div class="figure-block">

![Mentorship recording workflow diagram](https://i.imgur.com/askRX9s.png)
<div class="figure-caption"><strong>Fig 1.</strong> Mentorship recording workflow diagram from call to insights.</div>
</div>

> Quick note on etiquette: make sure everyone on the call knows it's being recorded.

## From MP4 to MP3

To simplify transcription, I pull down the video and extract the audio. This version streams the download (safer for large files) and uses MoviePy to write an MP3.

```python
import requests
from moviepy.editor import VideoFileClip

def download_video(url: str, output_path: str) -> None:
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(output_path, "wb") as f:
            for chunk in r.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)

def convert_mp4_to_mp3(mp4_file: str, mp3_file: str) -> None:
    with VideoFileClip(mp4_file) as clip:
        clip.audio.write_audiofile(mp3_file)

# usage
video_url = "https://topmate-call-recordings.s3.ap-south-1.amazonaws.com/recording_recording_123456-imagine-like-a-guid.mp4"
mp4_file = "mentorship.mp4"
mp3_file = "mentorship.mp3"

download_video(video_url, mp4_file)
convert_mp4_to_mp3(mp4_file, mp3_file)
```

> For best accuracy with Speech-to-Text, FLAC or LINEAR16 usually beats MP3. I kept MP3 here to match the original workflow.

## Transcribing with Google Cloud Speech-to-Text

Setup (once):

- Create a GCP project and enable the **Speech-to-Text API**
- Upload `mentorship.mp3` to **Google Cloud Storage**
- Set `GOOGLE_APPLICATION_CREDENTIALS` to your service account JSON

Here's a minimal long-audio transcription (31-minute files need the long-running API). I also enabled punctuation and confidence scores.

```python
from google.cloud import speech_v1p1beta1 as speech

def transcribe_gcs(gcs_uri: str, output_path: str) -> None:
    client = speech.SpeechClient()

    audio = speech.RecognitionAudio(uri=gcs_uri)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.MP3,
        sample_rate_hertz=44100,         # match your file
        language_code="en-US",
        model="long",
        audio_channel_count=2,
        enable_automatic_punctuation=True,
        enable_word_confidence=True,
        # optional diarization (speakers):
        # enable_speaker_diarization=True,
        # diarization_speaker_count=2,
    )

    operation = client.long_running_recognize(config=config, audio=audio)
    response = operation.result(timeout=3600)

    with open(output_path, "w", encoding="utf-8") as f:
        for result in response.results:
            f.write(result.alternatives[0].transcript + "\n")

# run
gcs_uri = "gs://bucket-name/mentorship.mp3"
transcribe_gcs(gcs_uri, "audio.txt")
```

My run (for context):

- Audio: MP3, 44,100 Hz, 2 channels
- Billed audio time: 31:57
- Transcription time: ~11:43
- Automatic punctuation + word confidence on
- Model: `long` (API `v1p1beta1`)

<div class="figure-block">

![GCP transcription result](https://i.imgur.com/CJ6vSpV.png)
<div class="figure-caption"><strong>Fig 2.</strong> Google Cloud Speech-to-Text transcription result output.</div>
</div>

Example raw line:

```
if you... good afternoon, I don't know where exactly you are based on but ...
```

## Asking ChatGPT for the good stuff

Once I have `audio.txt`, I pass the transcript to a prompt that asks for a short summary, key decisions, and action items. For long transcripts, chunk first (tokens are a thing), then merge the summaries.

```python
def get_chatgpt_insights(prompt: str) -> str:
    """
    placeholder for your chatgpt call.
    recommend: split transcript into ~2–3k word chunks,
    ask for structured bullets (summary / decisions / actions),
    then ask for a final synthesis across chunks.
    """
    ...

with open("audio.txt", "r", encoding="utf-8") as f:
    transcript = f.read()

prompt = (
    "you are extracting practical insights from a mentorship transcript.\n\n"
    "return three sections:\n"
    "1) summary (5 bullets max)\n"
    "2) decisions agreed (bulleted)\n"
    "3) next actions (who/what/when)\n\n"
    f"transcript:\n{transcript}\n"
)

insights = get_chatgpt_insights(prompt)
print(insights)
```

## A tiny diagram with Mermaid

Visuals make sprawling conversations easier to digest. Here's a compact Mermaid map you can tweak to your session:

```mermaid
graph TD
    A[session start] --> B[topic 1]
    B --> C[key insight 1]
    B --> D[key insight 2]
    A --> E[topic 2]
    E --> F[key insight 3]
    E --> G[key insight 4]
    A --> H[wrap-up]
```

---

This workflow turned a one-off call into reusable notes and clear next steps. If you're experimenting, the two dials that matter most are **audio encoding** (FLAC/LINEAR16 if you can) and **diarization** (when multiple voices overlap), tuning those pays off quickly.

## Links

- [Topmate](https://topmate.io/)
