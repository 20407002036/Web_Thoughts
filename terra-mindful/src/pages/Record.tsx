import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ingestJournal } from '../services/api';
import { useAuth } from '../context/AuthContext';

const waveformBars = Array.from({ length: 17 }, (_, i) => i);

const Record: React.FC = () => {
  const { user } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    let interval: number | undefined;
    if (isRecording) {
      interval = window.setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        await handleUpload(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setTimer(0);
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleUpload = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      const result = await ingestJournal(audioBlob, user?.access_token);
      navigate('/review', { state: { entry: result } });
    } catch (err) {
      console.error('Error uploading journal:', err);
      setError(err instanceof Error ? err.message : 'Failed to process your journal. Please try again.');
      setIsProcessing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="rounded-3xl border border-border/60 bg-card p-6 text-center writing-shadow sm:p-10">
        <p className="label-eyebrow mb-3">Voice Journal</p>
        <h2 className="font-h1 text-h2 text-on-surface">
          {isProcessing ? 'Processing your reflection' : 'Pause, breathe, and speak freely'}
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-on-surface-variant sm:text-base">
          {isProcessing
            ? 'We are transcribing and extracting patterns from your words.'
            : 'Capture this moment as it is. You can review and refine after recording.'}
        </p>

        <div className="mt-8 flex flex-col items-center">
          <div className="relative mb-6 flex h-40 w-40 items-center justify-center sm:h-44 sm:w-44">
            {isRecording && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-primary/40 animate-ring" />
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ring [animation-delay:0.8s]" />
              </>
            )}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessing}
              className={`relative z-10 flex h-28 w-28 items-center justify-center rounded-full text-primary-foreground shadow-soft transition-all active:scale-95 disabled:opacity-60 ${
                isRecording ? 'bg-primary' : 'bg-on-surface'
              }`}
              aria-label={isRecording ? 'Stop recording' : 'Start recording'}
            >
              <span className="material-symbols-outlined text-4xl">{isRecording ? 'stop' : 'mic'}</span>
            </button>
          </div>

          <div className="mb-2 font-h1 text-4xl tabular-nums text-on-surface">{formatTime(timer)}</div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary">
            <span className={`h-2 w-2 rounded-full bg-primary ${isRecording ? 'animate-pulse-soft' : ''}`} />
            <span className="text-[11px] font-semibold uppercase tracking-widest">
              {isProcessing ? 'Processing' : isRecording ? 'Recording' : 'Ready'}
            </span>
          </div>

          {!isProcessing && (
            <div className="mb-8 flex w-full max-w-lg items-end justify-center gap-[3px] px-2">
              {waveformBars.map((bar) => (
                <div
                  key={bar}
                  className={`h-5 w-2 rounded-full ${isRecording ? 'animate-wave' : ''}`}
                  style={{
                    height: `${18 + ((bar % 7) + 1) * 5}px`,
                    animationDelay: `${bar * 0.08}s`,
                    backgroundColor:
                      bar % 4 === 0
                        ? 'oklch(0.395 0.045 40)'
                        : bar % 4 === 1
                          ? 'oklch(0.85 0.05 30)'
                          : bar % 4 === 2
                            ? 'oklch(0.82 0.06 140)'
                            : 'oklch(0.62 0.06 45)',
                    opacity: isRecording ? 1 : 0.35,
                  }}
                />
              ))}
            </div>
          )}

          {error && <div className="mb-6 rounded-2xl bg-error-container px-4 py-3 text-sm text-on-error-container">{error}</div>}

          {!isProcessing && (
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-on-surface transition-colors hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground shadow-soft transition-transform hover:scale-[1.01] active:scale-95"
              >
                {isRecording ? 'Finish Reflection' : 'Start Recording'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Record;
