"use client";

import { useState, useRef, useEffect } from "react";
import { Send, CheckCircle2, ChevronDown } from "lucide-react";

const subjectOptions = [
  { value: "sugerencia", label: "💡 Sugerencia de Nuevo Juego" },
  { value: "bug", label: "🐛 Reportar un Error (Bug)" },
  { value: "negocio", label: "💼 Publicidad / Negocios" },
  { value: "otro", label: "💬 Otro motivo" },
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [subject, setSubject] = useState(subjectOptions[0].value);
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSubjectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "cc6f50ab-35a1-4c71-8d9e-aebb757390ed");
    
    // Formatear el asunto para el email
    const subjectValue = formData.get("subject") as string;
    const subjectLabel = subjectOptions.find(o => o.value === subjectValue)?.label || "Nuevo Mensaje";
    formData.set("subject", `BeberGames App: ${subjectLabel}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("idle");
        alert("Vaya, parece que ha habido un problema contactando con el servidor. Por favor, inténtalo más tarde.");
      }
    } catch (error) {
      setStatus("idle");
      alert("Error de conexión. Por favor comprueba tu conexión a internet.");
    }
  };

  if (status === "success") {
    return (
      <div className="mt-8 rounded-2xl border border-green-500/30 bg-green-500/10 p-8 w-full flex flex-col items-center justify-center text-center gap-4 animate-in fade-in zoom-in duration-300">
        <CheckCircle2 className="h-12 w-12 text-green-400" />
        <h3 className="text-xl font-bold text-green-400">¡Mensaje Enviado!</h3>
        <p className="text-muted text-sm">
          Hemos recibido tu mensaje correctamente. Te responderemos lo antes posible (si no estamos jugando).
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-accent hover:text-accent-secondary transition-colors"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-2xl border border-border bg-surface/50 backdrop-blur-sm p-6 sm:p-8 w-full shadow-xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="name" className="text-sm font-medium text-foreground/80">Nombre</label>
            <input 
              id="name" 
              name="name"
              required
              placeholder="Tu nombre o apodo" 
              className="px-4 py-3 rounded-xl bg-background/80 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted/50 text-foreground"
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="email" className="text-sm font-medium text-foreground/80">Email</label>
            <input 
              id="email" 
              name="email"
              type="email"
              required
              placeholder="correo@ejemplo.com" 
              className="px-4 py-3 rounded-xl bg-background/80 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted/50 text-foreground"
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-2 relative" ref={dropdownRef}>
          <label htmlFor="subject-btn" className="text-sm font-medium text-foreground/80">Asunto</label>
          <div className="relative">
            <button
              id="subject-btn"
              type="button"
              onClick={() => setIsSubjectOpen(!isSubjectOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-background/80 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-foreground text-left"
            >
              <span>{subjectOptions.find(o => o.value === subject)?.label}</span>
              <ChevronDown className={`h-5 w-5 text-foreground/50 transition-transform duration-200 ${isSubjectOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isSubjectOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 p-2 z-50 bg-surface/95 backdrop-blur-md border border-border rounded-xl shadow-xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex flex-col gap-1">
                  {subjectOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSubject(option.value);
                        setIsSubjectOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors flex items-center ${
                        subject === option.value 
                          ? "bg-accent/15 text-accent font-medium" 
                          : "text-foreground/80 hover:bg-background/80 hover:text-foreground"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <input type="hidden" id="subject" name="subject" value={subject} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-medium text-foreground/80">Mensaje</label>
          <textarea 
            id="message" 
            name="message"
            required
            rows={4}
            placeholder="¡Hola equipo! Quería proponer un juego..." 
            className="px-4 py-3 rounded-xl bg-background/80 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none placeholder:text-muted/50 text-foreground"
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={status === "submitting"}
          className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-secondary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent-glow/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
        >
          {status === "submitting" ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Send className="h-5 w-5" />
              Enviar Mensaje
            </>
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center text-xs text-muted">
        O escríbenos directamente a <a href="mailto:info@bebergames.com" className="font-semibold text-accent hover:text-accent-secondary transition-colors transition-colors">info@bebergames.com</a>
      </div>
    </div>
  );
}
