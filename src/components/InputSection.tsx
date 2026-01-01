import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2, Send, Keyboard } from 'lucide-react';
import clsx from 'clsx';
import { parseFoodInfo, classifyFood } from '../utils/common';
import { useFoodItems } from '../hooks/useFoodItems';

export const InputSection: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [inputText, setInputText] = useState('');
  const [processing, setProcessing] = useState(false);
  const [mode, setMode] = useState<'voice' | 'text'>('voice');
  const recognitionRef = useRef<any>(null);
  const { addItem } = useFoodItems();

  const transcriptRef = useRef('');
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const SILENCE_TIMEOUT = 2500; // 2.5 seconds of silence to auto-stop

  const isManualStopRef = useRef(false);

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      // Set continuous to true to prevent auto-stop after short pauses
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'zh-CN';

      recognitionRef.current.onresult = (event: any) => {
        // Clear existing silence timer on new input
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
        }

        // Get the latest transcript
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        
        // Update state and ref
        // Let's take the latest result to avoid duplication issues in simple mode
        const latestResult = event.results[event.results.length - 1][0].transcript;
        setTranscript(latestResult);
        transcriptRef.current = latestResult;

        // Set new silence timer
        silenceTimerRef.current = setTimeout(() => {
          if (recognitionRef.current) {
            isManualStopRef.current = true; // Treat silence timeout as manual stop to trigger processing
            recognitionRef.current.stop();
          }
        }, SILENCE_TIMEOUT);
      };

      recognitionRef.current.onend = () => {
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
        }

        // Only stop listening if it was a manual stop (user clicked or silence timeout)
        if (isManualStopRef.current) {
          setIsListening(false);
          isManualStopRef.current = false;
          
          // Process the final transcript captured in ref
          if (transcriptRef.current) {
             handleProcessing(transcriptRef.current);
          }
        } else {
          // If stopped unexpectedly (browser behavior), restart immediately if we are supposed to be listening
          // Note: We check a ref or state here. Since we are in a closure, we need to be careful.
          // However, checking the external 'isListening' state directly in onend might be stale.
          // But since we control the 'stop' via 'isManualStopRef', we can just restart.
          // To be safe, we verify if we really want to restart.
          // Let's add a small delay to prevent infinite fast loops
          setTimeout(() => {
            try {
              recognitionRef.current?.start();
            } catch (e) {
              // Ignore errors if already started
              console.log('Restart error:', e);
            }
          }, 100);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        // Ignore 'no-speech' error which happens frequently
        if (event.error !== 'no-speech') {
          setIsListening(false);
          isManualStopRef.current = false;
        }
      };
    }
  }, []);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleProcessing = async (text: string) => {
    if (!text.trim()) return;
    
    setProcessing(true);
    setErrorMsg(null);
    
    // Simulate processing delay for better UX
    setTimeout(() => {
      const result = parseFoodInfo(text);
      
      if (result && result.name) {
        const category = classifyFood(result.name);
        addItem({
          name: result.name,
          quantity: result.quantity,
          category,
          entryTime: new Date().toISOString(),
        });
        setTranscript(''); 
        transcriptRef.current = ''; // Reset ref
        setInputText('');
      } else {
        // Handle invalid input
        setErrorMsg('无法识别食物名称，请重试');
        // Clear error after 3 seconds
        setTimeout(() => setErrorMsg(null), 3000);
      }
      setProcessing(false);
    }, 500);
  };

  const startListening = () => {
    setTranscript('');
    transcriptRef.current = '';
    isManualStopRef.current = false;
    try {
      recognitionRef.current?.start();
      setIsListening(true);
    } catch (e) {
      console.error('Start error:', e);
    }
  };

  const stopListening = () => {
    isManualStopRef.current = true; // Mark as manual stop
    recognitionRef.current?.stop();
    // setIsListening(false) will be handled in onend
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      handleProcessing(inputText);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-6 space-y-4">
      
      {/* Mode Switcher */}
      <div className="flex bg-gray-100 p-1 rounded-full">
        <button
          onClick={() => setMode('voice')}
          className={clsx(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
            mode === 'voice' ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"
          )}
        >
          <div className="flex items-center space-x-1">
            <Mic size={14} />
            <span>语音</span>
          </div>
        </button>
        <button
          onClick={() => setMode('text')}
          className={clsx(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
            mode === 'text' ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"
          )}
        >
          <div className="flex items-center space-x-1">
            <Keyboard size={14} />
            <span>文字</span>
          </div>
        </button>
      </div>

      {mode === 'voice' ? (
        <div className="flex flex-col items-center">
          <button
            onMouseDown={startListening}
            onTouchStart={startListening}
            onMouseUp={stopListening}
            onTouchEnd={stopListening}
            onMouseLeave={stopListening} // Handle dragging out
            disabled={processing || !recognitionRef.current}
            className={clsx(
              "w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 select-none",
              isListening 
                ? "bg-red-500 text-white animate-pulse scale-110 shadow-red-200" 
                : "bg-primary text-white hover:bg-primary-dark hover:scale-105 shadow-primary/30",
              (processing || !recognitionRef.current) && "opacity-70 cursor-not-allowed"
            )}
            style={{ touchAction: 'none' }} // Prevent scrolling on mobile while pressing
          >
            {processing ? (
              <Loader2 className="animate-spin" size={40} />
            ) : isListening ? (
              <Mic size={40} />
            ) : (
              <Mic size={40} />
            )}
          </button>
          
          <p className="mt-4 text-gray-500 text-sm h-6 transition-all duration-300">
            {errorMsg ? (
              <span className="text-red-500 font-medium flex items-center justify-center animate-bounce">
                ❌ {errorMsg}
              </span>
            ) : !recognitionRef.current ? (
              '您的浏览器不支持语音识别' 
            ) : processing ? (
              '正在处理...' 
            ) : isListening ? (
              '松开结束录音...' 
            ) : (
              '长按说话，说出"3个苹果"'
            )}
          </p>

          {transcript && (
            <div className="mt-2 px-4 py-2 bg-white rounded-lg border border-gray-100 shadow-sm text-gray-800 animate-fade-in">
              "{transcript}"
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleTextSubmit} className="w-full max-w-sm flex flex-col items-center space-y-3">
          <div className="relative w-full">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="输入食物名称和数量，如：3个苹果"
              className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
              disabled={processing}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || processing}
              className={clsx(
                "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors",
                inputText.trim() && !processing
                  ? "text-primary hover:bg-primary/10"
                  : "text-gray-300 cursor-not-allowed"
              )}
            >
              {processing ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </div>
          <p className="text-gray-400 text-xs">
            按回车键或点击发送按钮添加
          </p>
        </form>
      )}
    </div>
  );
};
