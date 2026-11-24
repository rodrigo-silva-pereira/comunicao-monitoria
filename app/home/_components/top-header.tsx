"use client"

import { useRouter } from "next/navigation"
import { Award, GraduationCap, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PerfilSimulado } from "../types"

interface TopHeaderProps {
  perfil: PerfilSimulado
  onChangePerfil: (novoPerfil: PerfilSimulado) => void
  nomeDocenteAtual: string
}

export function TopHeader({
  perfil,
  onChangePerfil,
  nomeDocenteAtual,
}: TopHeaderProps) {
  const router = useRouter()

  return (
    <header className="bg-white border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-y-2.5 gap-x-3 sticky top-0 z-10">
      <div className="flex items-center gap-2.5 order-1">
        <div className="w-8 h-8 rounded-lg bg-red-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
          UFJF
        </div>
        <div>
          <span className="font-bold text-slate-900 text-sm block leading-none">
            Monitorias UFJF
          </span>
          <span className="text-[11px] text-slate-500">
            Semestre 2026/3 • Matrícula 202565607C
          </span>
        </div>
      </div>

      <div className="order-3 lg:order-2 w-full lg:w-auto flex justify-center">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 max-w-full overflow-x-auto">
          <span className="text-[11px] font-medium text-slate-500 px-2 hidden sm:inline shrink-0">
            Simular visão:
          </span>
          <Button
            size="sm"
            variant={perfil === "DISCENTE" ? "default" : "ghost"}
            onClick={() => onChangePerfil("DISCENTE")}
            className={`h-7 text-xs gap-1.5 shrink-0 cursor-pointer ${
              perfil === "DISCENTE" ? "bg-slate-800 text-white" : ""
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Discente
          </Button>
          <Button
            size="sm"
            variant={perfil === "MONITOR" ? "default" : "ghost"}
            onClick={() => onChangePerfil("MONITOR")}
            className={`h-7 text-xs gap-1.5 shrink-0 cursor-pointer ${
              perfil === "MONITOR" ? "bg-amber-600 hover:bg-amber-700 text-white" : ""
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Monitor (DCC117)
          </Button>
          <Button
            size="sm"
            variant={perfil === "DOCENTE" ? "default" : "ghost"}
            onClick={() => onChangePerfil("DOCENTE")}
            className={`h-7 text-xs gap-1.5 shrink-0 cursor-pointer ${
              perfil === "DOCENTE" ? "bg-red-800 hover:bg-red-900 text-white" : ""
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Docente
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2.5 order-2 lg:order-3 ml-auto lg:ml-0">
        <div className="text-right">
          <p className="text-xs font-semibold text-slate-800 leading-none hidden sm:block">
            {perfil === "DOCENTE" ? nomeDocenteAtual : "Rodrigo da Silva"}
          </p>
          <p className="text-[11px] text-slate-500 hidden sm:block">
            {perfil === "DOCENTE"
              ? "docente@ufjf.br"
              : "rodrigo.silva@estudante.ufjf.br"}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/login")}
          title="Sair"
          className="h-8 w-8 text-slate-500 hover:text-red-700 shrink-0 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}