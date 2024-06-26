---
title: Seeking insights from a recording using Google Cloud Speech-to-text, Google Colab and ChatGPT
description: tech
date: "2024-03-03"
categories:]
- "tech"
tags:]
- "tech"
- "google cloud plataform"
- "google colab"
- "chatgpt"
---


## Topmate and recording



Recently, I participated in an online mentorship and I want to share my experience with you. The mentor used a platform called [Topmate](https://topmate.io/), which offers the video call recording.

Topmate not only facilitates connecting with mentors but also allows you to record the entire mentorship session. After the video call, I received an email with a download link for the recording in MP4 format.  



![](https://i.imgur.com/askRX9s.png)



This is extremely useful as it allows you to review the session later and capture all the important details discussed.





py

```

import requests

from moviepy.editor import VideoFileClip



def download_video(url, output_path):

    response = requests.get(url)

    with open(output_path, 'wb') as file:

        file.write(response.content)



def convert_mp4_to_mp3(mp4_file, mp3_file):

    video_clip = VideoFileClip(mp4_file)

    audio_clip = video_clip.audio

    audio_clip.write_audiofile(mp3_file)

    audio_clip.close()

    video_clip.close()



# Usage of the script

video_url = 'https://topmate-call-recordings.s3.ap-south-1.amazonaws.com/recording_recording_123456-imagine-like-a-guid.mp4'

mp4_file_path = 'mentorship.mp4'

mp3_file_path = 'mentorship.mp3'



download_video(video_url, mp4_file_path)

convert_mp4_to_mp3(mp4_file_path, mp3_file_path)

```
