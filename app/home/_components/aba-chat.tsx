"use client"

import { useState } from "react"
import { Lock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Mensagem } from "../types"

interface AbaChatProps {
  mensagens: Mensagem[]
  placeholder: string
  emptyMessage: string
  isPrivado?: boolean
  onEnviarMensagem: (texto: string) => void
}

export function AbaChat({
  mensagens,
  placeholder,
  emptyMessage,
  isPrivado = false,
  onEnviarMensagem,
}: AbaChatProps) {
  const [texto, setTexto] = useState("")

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!texto.trim()) return
    onEnviarMensagem(texto.trim())
    setTexto("")
  }

  const renderBadgePapel = (papel: Mensagem["papel"]) => {
    if (papel === "Docente") {
      return (
        <Badge className="bg-red-800 text-white text-[10px] px-1.5 py-0">
          Docente
        </Badge>
      )
    }
    if (papel === "Monitor") {
      return (
        <Badge className="bg-amber-600 text-white text-[10px] px-1.5 py-0">
          Monitor
        </Badge>
      )
    }
    return (
      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
        Discente
      </Badge>
    )
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      {isPrivado && (
        <div className="bg-red-50/80 border-b border-red-200 px-4 py-2 text-[9px] sm:text-xs text-red-900 flex items-center gap-1.5 shrink-0">
          Canal restrito de alinhamento pedagógico entre o Docente Orientador e o Monitor.
        </div>
      )}

      <div className="flex-1 min-h-0 p-4 space-y-4 overflow-y-auto">
        {mensagens.length === 0 ? (
          <p className="text-center text-sm text-slate-400 py-12">
            {emptyMessage}
          </p>
        ) : (
          mensagens.map((msg) => (
            <div key={msg.id} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs text-slate-900">
                  {msg.autor}
                </span>
                {renderBadgePapel(msg.papel)}
                <span className="text-[11px] text-slate-400">
                  {msg.horario}
                </span>
              </div>
              <p
                className={`text-sm text-slate-700 rounded-lg px-3.5 py-2 inline-block max-w-2xl border bg-slate-50 border-slate-100`}
              >
                {msg.texto}
              </p>
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-slate-200 bg-slate-50 p-3 flex items-center gap-3 shrink-0"
      >
        <Input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder={placeholder}
          className="h-11 px-4 rounded-none bg-white border-slate-200 shadow-none focus-visible:ring-1"
        />
        <Button
          type="submit"
          className="h-11 sm:px-5 rounded-none bg-transparent sm:bg-red-800 sm:hover:bg-red-900 sm:text-white text-red-800 gap-2 shrink-0 cursor-pointer"
        >
          <Send className="w-5! h-5! sm:h-4! sm:h-4!" />
          <span className="hidden sm:inline">Enviar</span>
        </Button>
      </form>
    </div>
  )
}