"use client"

import { useState } from "react"
import {
  Calendar,
  MapPin,
  Plus,
  Settings,
  Trash2,
  UserMinus,
  UserPlus,
} from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Disciplina, PerfilSimulado } from "../types"

interface ModalConfigSalaProps {
  disciplina: Disciplina
  perfil: PerfilSimulado
  onAtualizarSessoes: (
    codigoDisciplina: string,
    novasSessoes: { dia: string; horario: string; local: string }[]
  ) => void
  onAtualizarMonitor: (codigoDisciplina: string, novoMonitor: string | null) => void
}

const DIAS_SEMANA = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
]

export function ModalConfigSala({
  disciplina,
  perfil,
  onAtualizarSessoes,
  onAtualizarMonitor,
}: ModalConfigSalaProps) {
  const [open, setOpen] = useState(false)
  const [dia, setDia] = useState("Segunda-feira")
  const [horaInicio, setHoraInicio] = useState("14:00")
  const [horaFim, setHoraFim] = useState("16:00")
  const [local, setLocal] = useState("")
  const [erroHorario, setErroHorario] = useState("")

  const [nomeNovoMonitor, setNomeNovoMonitor] = useState("")

  const handleAdicionarSessao = (e: React.FormEvent) => {
    e.preventDefault()
    if (!dia || !horaInicio || !horaFim || !local.trim()) return

    if (horaFim <= horaInicio) {
      setErroHorario("O horário de término deve ser maior que o de início.")
      return
    }

    setErroHorario("")
    const atualizadas = [
      ...disciplina.sessoes,
      {
        dia,
        horario: `${horaInicio} - ${horaFim}`,
        local: local.trim(),
      },
    ]
    onAtualizarSessoes(disciplina.codigo, atualizadas)
    setLocal("")
  }

  const handleRemoverSessao = (indexRemover: number) => {
    const atualizadas = disciplina.sessoes.filter((_, idx) => idx !== indexRemover)
    onAtualizarSessoes(disciplina.codigo, atualizadas)
  }

  const handleSalvarMonitor = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nomeNovoMonitor.trim()) return
    onAtualizarMonitor(disciplina.codigo, nomeNovoMonitor.trim())
    setNomeNovoMonitor("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={buttonVariants({
          variant: "outline",
          size: "sm",
          className:
            "h-8 gap-1.5 text-xs border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer",
        })}
      >
        <Settings className="w-3.5 h-3.5 text-slate-600" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-base">
            Configurações — {disciplina.codigo} {disciplina.turma}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Gerencie os horários de atendimento da monitoria
            {perfil === "DOCENTE" ? " e o vínculo do monitor responsável." : "."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-red-800" />
                Horários das Sessões
              </h3>
              <Badge variant="secondary" className="text-[10px]">
                {disciplina.sessoes.length} cadastrada(s)
              </Badge>
            </div>

            {/* Lista de sessões existentes */}
            <div className="space-y-2 max-h-44 overflow-y-auto">
              {disciplina.sessoes.length === 0 ? (
                <p className="text-xs text-slate-400 italic bg-slate-50 border border-slate-200 p-3 text-center">
                  Nenhuma sessão cadastrada para esta disciplina.
                </p>
              ) : (
                disciplina.sessoes.map((sessao, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-slate-50 border border-slate-200 px-3 py-2 text-xs"
                  >
                    <div>
                      <span className="font-semibold text-slate-800">
                        {sessao.dia}
                      </span>{" "}
                      <span className="text-slate-600">({sessao.horario})</span>
                      <span className="text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {sessao.local}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoverSessao(idx)}
                      className="h-7 w-7 text-slate-400 hover:text-red-700 cursor-pointer"
                      title="Remover horário"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleAdicionarSessao} className="space-y-2 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-600">
                    Dia da semana
                  </label>
                  <select
                    value={dia}
                    onChange={(e) => setDia(e.target.value)}
                    className="h-8 w-full rounded-md border border-input bg-white px-2.5 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    {DIAS_SEMANA.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-slate-600">
                      Início
                    </label>
                    <Input
                      type="time"
                      value={horaInicio}
                      onChange={(e) => {
                        setHoraInicio(e.target.value)
                        setErroHorario("")
                      }}
                      className="h-8 text-xs px-2"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-slate-600">
                      Término
                    </label>
                    <Input
                      type="time"
                      value={horaFim}
                      onChange={(e) => {
                        setHoraFim(e.target.value)
                        setErroHorario("")
                      }}
                      className="h-8 text-xs px-2"
                      required
                    />
                  </div>
                </div>
              </div>

              {erroHorario && (
                <p className="text-[11px] text-red-700 font-medium">
                  {erroHorario}
                </p>
              )}

              <div className="flex gap-1.5">
                <Input
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  placeholder="Local ou link (ex: Lab 3 - DCC ou Google Meet)"
                  className="h-8 text-xs"
                  required
                />
                <Button
                  type="submit"
                  size="sm"
                  className="h-8 px-3 bg-red-800 hover:bg-red-900 text-white text-xs gap-1 shrink-0 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Adicionar
                </Button>
              </div>
            </form>
          </div>

          {perfil === "DOCENTE" && (
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Monitor Responsável (Exclusivo Docente)
              </h3>

              {disciplina.monitor ? (
                <div className="flex items-center justify-between bg-amber-50/70 border border-amber-200 rounded-md px-3 py-2.5">
                  <div>
                    <p className="text-xs font-semibold text-amber-950">
                      {disciplina.monitor}
                    </p>
                    <p className="text-[11px] text-amber-800">
                      Monitor ativo na disciplina (limite de 1 monitoria por discente)
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onAtualizarMonitor(disciplina.codigo, null)}
                    className="h-7 text-xs border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 gap-1.5 cursor-pointer"
                  >
                    <UserMinus className="w-3.5 h-3.5" />
                    Retirar Monitor
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSalvarMonitor} className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={nomeNovoMonitor}
                      onChange={(e) => setNomeNovoMonitor(e.target.value)}
                      placeholder="Nome ou matrícula do discente (ex: Rodrigo da Silva)"
                      className="h-8 text-xs"
                      required
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="h-8 text-xs bg-red-800 hover:bg-red-900 text-white gap-1.5 shrink-0 cursor-pointer"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      Vincular
                    </Button>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <span>Sugestão rápida:</span>
                    <button
                      type="button"
                      onClick={() => setNomeNovoMonitor("Rodrigo da Silva")}
                      className="underline hover:text-red-800 cursor-pointer"
                    >
                      Rodrigo da Silva
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => setNomeNovoMonitor("Camila Ferreira")}
                      className="underline hover:text-red-800 cursor-pointer"
                    >
                      Camila Ferreira
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}