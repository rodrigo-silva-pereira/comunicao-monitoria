"use client"

import { useRouter } from "next/navigation"
import { Check, RefreshCw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Disciplina, PerfilSimulado } from "../types"

interface SidebarDisciplinasProps {
  disciplinas: Disciplina[]
  codigoAtivo: string
  perfil: PerfilSimulado
  abertaMobile: boolean
  onCloseMobile: () => void
  onSelectDisciplina: (codigo: string) => void
}

export function SidebarDisciplinas({
  disciplinas,
  codigoAtivo,
  perfil,
  abertaMobile,
  onCloseMobile,
  onSelectDisciplina,
}: SidebarDisciplinasProps) {
  const router = useRouter()

  const handleSelecionar = (codigo: string) => {
    onSelectDisciplina(codigo)
    onCloseMobile()
  }

  const renderListaDisciplinas = () => (
    <nav>
      {disciplinas.map((disc) => {
        const selecionada = disc.codigo === codigoAtivo
        const ehMonitorDesta = disc.codigo === "DCC117"

        return (
          <button
            key={disc.codigo}
            onClick={() => handleSelecionar(disc.codigo)}
            className={`w-full text-left px-8 py-2.5 flex items-center justify-between cursor-pointer ${
              selecionada
                ? "bg-red-800 text-white"
                : "hover:bg-slate-100 text-slate-700"
            }`}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs">
                  {disc.codigo} {disc.turma}
                </span>
                {ehMonitorDesta && perfil === "MONITOR" && (
                  <span className="text-[10px] px-1.5 py-0">
                    Monitor
                  </span>
                )}
              </div>
              <p className="text-xs truncatemt-0.5">
                {disc.nome}
              </p>
            </div>

            {selecionada && (
              <Check className="w-4 h-4 text-red-800 shrink-0 md:hidden" />
            )}
          </button>
        )
      })}
    </nav>
  )

  return (
    <>
      {/* DESKTOP: Sidebar fixa na esquerda */}
      <aside className="hidden md:flex w-72 bg-white border-r border-slate-200 py-3 flex-col justify-between shrink-0 overflow-y-auto">
        <div className="space-y-1.5">
          <div className="px-8 py-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Minhas Disciplinas ({disciplinas.length})
            </span>
          </div>
          {renderListaDisciplinas()}
        </div>

        <div className="pt-4 mt-4 border-t border-slate-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/primeiro-acesso")}
            className="w-full text-xs gap-2 text-slate-600 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Atualizar Comprovante SIGA
          </Button>
        </div>
      </aside>

      {/* MOBILE: Bottom Sheet (sobe de baixo para cima ao tocar no título da matéria) */}
      {abertaMobile && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-900/50 transition-opacity"
          />

          <div className="relative bg-white rounded-t-2xl p-4 pb-6 max-h-[80vh] flex flex-col shadow-2xl z-10 animate-in slide-in-from-bottom duration-200">
            <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-3" />

            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Trocar de Disciplina
                </h2>
                <p className="text-[11px] text-slate-500">
                  Selecione uma matéria matriculada em 2026/3
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onCloseMobile}
                className="h-8 w-8 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="overflow-y-auto flex-1 py-1">
              {renderListaDisciplinas()}
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onCloseMobile()
                  router.push("/primeiro-acesso")
                }}
                className="w-full h-9 text-xs gap-2 text-slate-600 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Atualizar Comprovante SIGA
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}