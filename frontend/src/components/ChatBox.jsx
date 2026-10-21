import React, { useEffect, useRef, useState } from 'react';

const ChatBox = ({ messages, statusText, onClose, onSendMessage }) => {
    const scrollContainerRef = useRef(null);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, statusText]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() && onSendMessage) {
            onSendMessage(inputValue.trim());
            setInputValue('');
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto h-[60vh] flex flex-col p-6 overflow-hidden relative rounded-3xl bg-white/[0.02] backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-20">
            {/* Ambient inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-indigo-500/10 blur-[80px] pointer-events-none"></div>
            
            {/* Close Button */}
            <button 
                onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white transition-all z-50 cursor-pointer backdrop-blur-md"
                title="Close chat and clear history"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar relative z-10" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
                {messages.length === 0 && !statusText && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400/60 font-medium tracking-wide">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3 opacity-50">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        Start a conversation...
                    </div>
                )}
                
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out`}>
                        <div 
                            className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed font-medium tracking-wide ${
                                msg.role === 'user' 
                                ? 'bg-indigo-600/20 text-indigo-50 border border-indigo-500/30 rounded-tr-md shadow-[0_0_20px_rgba(99,102,241,0.15)]' 
                                : 'bg-[#18181c]/80 text-gray-200 border border-white/5 rounded-tl-md shadow-lg backdrop-blur-md'
                            }`}
                        >
                            {msg.content}
                            {msg.url && (
                                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center">
                                    <a
                                        href={msg.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 hover:text-white text-xs font-semibold tracking-wide transition-all duration-300 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                                    >
                                        <span>Open Link</span>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            <polyline points="15 3 21 3 21 9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {statusText && (
                    <div className="flex justify-start animate-in fade-in duration-300">
                        <div className="max-w-[80%] px-5 py-3.5 rounded-2xl bg-[#18181c]/40 text-gray-400 text-[14px] font-medium border border-white/5 italic rounded-tl-md flex items-center gap-3 backdrop-blur-md">
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 bg-indigo-400/80 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-1.5 h-1.5 bg-indigo-400/80 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-1.5 h-1.5 bg-indigo-400/80 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                            {statusText}
                        </div>
                    </div>
                )}
                <div className="h-4" />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2 relative z-20">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-[15px] text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-all font-medium backdrop-blur-md"
                />
                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl px-6 py-3.5 flex items-center justify-center font-semibold transition-all border border-indigo-500/30 cursor-pointer shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </form>
            
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default ChatBox;