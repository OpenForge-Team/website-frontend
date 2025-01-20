"use client";

import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/components/hooks/use-toast";
import { getTranscription } from "@/utils/ai/transcribe";

interface VoiceRecorderProps {
  onTranscriptionComplete: (text: string, audioBlob?: Blob) => void;
  allowRetry?: boolean;
}

export function VoiceRecorder({
  onTranscriptionComplete,
  allowRetry = false,
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const handleRecording = async () => {
    if (isRecording) {
      setIsRecording(false);
      mediaRecorder?.stop();
    } else {
      setAudioPreview(null);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream, {
          mimeType: 'audio/mp3'
        });
        const chunks: BlobPart[] = [];

        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = async () => {
          const audioBlob = new Blob(chunks, { type: "audio/mp3" });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioPreview(audioUrl);
          stream.getTracks().forEach((track) => track.stop());

          setIsTranscribing(true);
          try {
            const response = await getTranscription({ audio: audioBlob });
            if (response) {
              onTranscriptionComplete(response, audioBlob);
            } else {
              throw new Error("Transcription failed");
            }
          } catch (error) {
            console.error("Transcription error:", error);
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to transcribe audio. Please try again.",
            });
          } finally {
            setIsTranscribing(false);
          }
        };

        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
      } catch (error) {
        console.error("Microphone access error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to access microphone. Please check permissions.",
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 min-h-[200px] border rounded-md p-6">
      {audioPreview && (
        <audio
          ref={audioRef}
          src={audioPreview}
          controls
          className="w-full mb-4"
        />
      )}
      <Button
        type="button"
        variant={isRecording ? "destructive" : "default"}
        size="lg"
        onClick={handleRecording}
        className="w-24 h-24 rounded-full"
        disabled={isTranscribing}
      >
        {isRecording ? (
          <MicOff className="h-16 w-16" />
        ) : (
          <Mic className="h-16 w-16" />
        )}
      </Button>
      <p className="text-sm text-muted-foreground">
        {isTranscribing
          ? "Transcribing..."
          : isRecording
          ? "Recording... Click to stop"
          : audioPreview
          ? "Recording complete - Listen to preview above"
          : "Click to start recording"}
      </p>
    </div>
  );
}
