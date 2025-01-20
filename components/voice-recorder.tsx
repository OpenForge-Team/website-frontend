"use client";

import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/hooks/use-toast";
import { getTranscription } from "@/utils/ai/transcribe";

interface VoiceRecorderProps {
  onTranscriptionComplete: (text: string, audioBuffer?: Buffer) => void;
  allowRetry?: boolean;
}

export function VoiceRecorder({
  onTranscriptionComplete,
  allowRetry = false,
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const { toast } = useToast();
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const handleRecording = async () => {
    if (isRecording) {
      setIsRecording(false);
      mediaRecorder?.stop();
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);
        setAudioChunks([]);

        const chunks: Blob[] = [];

        recorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        recorder.onstop = async () => {
          const audioBlob = new Blob(chunks, { type: "audio/webm" });
          setIsTranscribing(true);
          try {
            const response = await getTranscription({ audio: audioBlob });
            if (response) {
              setHasRecorded(true);
              // Convert Blob to Buffer
              // Pass the Blob directly
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
      <Button
        type="button"
        variant={isRecording ? "destructive" : "default"}
        size="lg"
        onClick={handleRecording}
        className="w-24 h-24 rounded-full"
        disabled={isTranscribing || hasRecorded}
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
            : hasRecorded
              ? "Recording complete - Edit text below if needed"
              : null}
      </p>
    </div>
  );
}
