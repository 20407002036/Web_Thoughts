import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ingestJournal } from '../services/api';
import { useAuth } from '../context/AuthContext';

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
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        await handleUpload(audioBlob);
        
        // Stop all tracks in the stream
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setTimer(0);
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
    <div className="max-w-3xl mx-auto py-12 flex flex-col items-center">
      <div className="w-full bg-surface-container-lowest rounded-xl p-12 writing-shadow border border-outline-variant/5 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full mb-12">
          <span className={`w-2 h-2 bg-primary rounded-full ${isRecording ? 'animate-pulse' : ''}`}></span>
          <span className="font-label-caps tracking-widest text-xs">
            {isProcessing ? 'PROCESSING...' : isRecording ? 'RECORDING' : 'READY TO CAPTURE'}
          </span>
        </div>

        <h2 className="font-h1 text-h2 mb-4">
          {isProcessing ? 'Analyzing your thoughts...' : "What's on your mind?"}
        </h2>
        <p className="font-body-lg text-on-surface-variant mb-16">
          {isProcessing 
            ? 'Thoughts is transcribing and finding patterns in your reflection.' 
            : 'Speak freely. Thoughts will help you find the patterns later.'}
        </p>

        {isProcessing ? (
          <div className="mb-16 flex flex-col items-center">
            <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-8"></div>
            <p className="font-label-caps tracking-widest text-primary animate-pulse">Wait a moment...</p>
          </div>
        ) : (
          <>
            <div className="relative mb-16">
              <div className={`w-40 h-40 rounded-full flex items-center justify-center transition-all duration-500 ${isRecording ? 'bg-primary scale-110 shadow-2xl shadow-primary/30' : 'bg-surface-container'}`}>
                <button 
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isProcessing}
                  className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform disabled:opacity-50"
                >
                  <span className={`material-symbols-outlined text-5xl ${isRecording ? 'text-primary' : 'text-stone-400'}`}>
                    {isRecording ? 'stop' : 'mic'}
                  </span>
                </button>
              </div>
              {isRecording && (
                <>
                  <div className="absolute inset-0 w-40 h-40 border-4 border-primary/20 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 w-40 h-40 border-4 border-primary/10 rounded-full animate-[ping_3s_infinite]"></div>
                </>
              )}
            </div>

            <div className="font-h1 text-4xl mb-12 text-on-surface tabular-nums">
              {formatTime(timer)}
            </div>
          </>
        )}

        {error && (
          <div className="mb-8 p-4 bg-error-container text-on-error-container rounded-lg text-sm font-body-md">
            {error}
          </div>
        )}

        {!isProcessing && (
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/')}
              className="text-on-surface-variant font-h3 px-8 py-4 hover:bg-surface-container rounded-full transition-colors"
            >
              Cancel
            </button>
            {!isRecording && (
              <button 
                onClick={startRecording}
                className="bg-primary text-on-primary px-12 py-4 rounded-full font-h3 shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
              >
                Start Recording
              </button>
            )}
            {isRecording && (
              <button 
                onClick={stopRecording}
                className="bg-primary text-on-primary px-12 py-4 rounded-full font-h3 shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
              >
                Finish Reflection
              </button>
            )}
          </div>
        )}
      </div>

      <div className="mt-12 text-center text-on-surface-variant opacity-60 max-w-md">
        <p className="font-body-md italic">"True reflection is the act of looking into the mirror of the mind and deciding what to plant next."</p>
      </div>
    </div>
  );
};

export default Record;
