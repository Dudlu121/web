import React, { useState } from "react";
import { motion } from "motion/react";
import { Lock, Unlock, ArrowRight, Mail, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

// 🚩 FLAG FOR CTF ENTHUSIASTS:
// The resume payload is AES-256 encrypted.
// Can you crack the password? 
// SHA-256 Hash of password: 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
// HINT: It's a 5-letter lowercase word. Check your standard wordlists!
const ENCRYPTED_PAYLOAD = "U2FsdGVkX19H+06d5aiGwn+ZmdUAkAHj5JbpyORhtNuvsM4aStm5fa5DPFuD4N9Xrztd2yFYpCZKAwBP7LwMVaVpQzrCeQUpWUWmBgSM6wRUvEbPtz7x1fXbnY7Mcbnrx7NBSl0TPlex+EijIkM0HZC0k+AVrkkkAmHjTmyFYSshAtOMEpHa5E7jwT/I7XW13X/BPMRbMWSMkQPx2rLABab0LpUCguBYFI4wrN1AzNmWrEDdnnllZU/8gFCOTQMaUd93t6uEdcV2Cl2jHX3hG1Zva1EA37JHcwPRo7tdf8G10Y+m4kXd4v9inY4XCu/4gJ7Ggi92nOYIEIhkMs7v+J6/IBzYT80BvWDTsULk+BDPLQXY1JK4rhGuyNHPhObK6N36PSSoBuZfpiufqoeRhYXuSg393RfLO/3Bdqbp77R+xxfor3KKRnpLsPQVloowNVo4Bqftsv3t9v7TDpmFy0kWbh2txofbsUkes4kxoD5Pq5tkhnyfp/v5JRRBgxLZPHO8bwIs0qxBojt4dOmc6L9gDEktiPnjS6wqBZWh9qNhfJ5oJ4Q2lK0m9cP3y2PKQoi3r20n7uBB0NG/gopvEkdctqfnrz1/NHLwR+1YcuPP/wfzDQpBQj+8Pz8IQ4hn9H1QgYglJzm0MYMSHefvqQ==";

export function ResumeUnlock() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [decryptedHtml, setDecryptedHtml] = useState<string>("");
  const navigate = useNavigate();

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "") return;
    
    try {
      const bytes = CryptoJS.AES.decrypt(ENCRYPTED_PAYLOAD, password.toLowerCase());
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      
      if (!decryptedText) throw new Error("Invalid password");
      
      const data = JSON.parse(decryptedText);
      if (data.signature === "VALID_PAYLOAD") {
        setDecryptedHtml(data.html);
        setStatus("success");
        return;
      }
      throw new Error("Invalid signature");
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center px-6 min-h-[80vh] py-12">
      
      {/* PUBLIC CONTACT SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mb-8 p-6 glass-panel rounded-2xl flex flex-col items-center text-center border border-accent/20 bg-accent/5"
      >
        <h3 className="font-display font-bold text-xl text-white mb-2">Recruitment Contact</h3>
        <p className="font-mono text-xs text-white/60 mb-6">For business inquiries and unredacted resume requests, please reach out directly.</p>
        
        <div className="flex flex-col w-full gap-3 font-mono text-sm">
          <a href="mailto:me@ayushmohapatra.com" className="flex items-center justify-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5 hover:border-accent/50 text-white group">
            <Mail size={16} className="text-accent group-hover:scale-110 transition-transform" />
            me@ayushmohapatra.com
          </a>
          <a href="https://linkedin.com/in/ayush-mohapatra-b90514324" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5 hover:border-accent/50 text-white group">
            <Linkedin size={16} className="text-accent group-hover:scale-110 transition-transform" />
            LinkedIn Profile
          </a>
        </div>
      </motion.div>

      {/* ENCRYPTED TERMINAL SECTION */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="w-full max-w-md resume-card p-8 md:p-12 relative"
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-2 h-2 rounded-full ${status === 'error' ? 'bg-red-500' : 'bg-accent'} animate-pulse`} />
            <span className={`font-mono text-[10px] tracking-widest uppercase ${status === 'error' ? 'text-red-500' : 'text-accent'}`}>
              CTF Challenge Area
            </span>
          </div>

          <h2 className="font-display font-black text-3xl text-white mb-2 letter-spacing-tighter tracking-tight">
            SECURE PAYLOAD
          </h2>
          <p className="font-mono text-[10px] opacity-40 mb-8 max-w-xs leading-relaxed uppercase tracking-wider">
            {status === "success" 
              ? "Access granted. Payload decrypted."
              : "Resume payload is AES-256 encrypted. Enter access token or brute-force the hash in the source code."}
          </p>

          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <div className="w-full p-5 border border-accent/20 bg-accent/5 font-mono text-xs sm:text-sm text-accent mb-6 leading-relaxed relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <Unlock size={80} strokeWidth={1} />
                </div>
                <div className="relative z-10">
                  <span className="font-bold tracking-widest opacity-80 uppercase">[ PAYLOAD DECRYPTED ]</span><br/><br/>
                  <div dangerouslySetInnerHTML={{ __html: decryptedHtml }} />
                </div>
              </div>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-4 border border-white/20 text-[10px] font-mono text-white/60 hover:text-white hover:border-white transition-colors uppercase tracking-widest"
              >
                Return to Index
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleUnlock} className="w-full flex flex-col gap-4">
              <div className="relative">
                <motion.div
                  animate={status === 'error' ? { x: [-4, 4, -4, 4, 0] } : {}}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full h-12 bg-white/5 border ${status === 'error' ? 'border-red-500/50 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/10 text-white focus:border-accent focus:scale-[1.01] focus:shadow-[0_0_20px_rgba(223,255,0,0.15)]'} px-4 font-mono text-xs outline-none transition-all placeholder:opacity-60 tracking-[0.3em]`}
                  />
                </motion.div>
                {status === "error" ? (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] tracking-widest font-mono text-red-500">
                    DENIED
                  </span>
                ) : (
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-accent hover:text-black transition-colors rounded"
                  >
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>

            </form>
          )}

        </div>
      </motion.div>
    </div>
  );
}
