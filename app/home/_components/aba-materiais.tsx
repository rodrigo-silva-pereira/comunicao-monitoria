"use client"

import { useState } from "react"
import { Download, FileText, ShieldAlert, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Material, PerfilSimulado } from "../types"

interface AbaMateriaisProps {
  materiais: Material[]
  podeGerenciarSala: boolean
  perfil: PerfilSimulado
  onPublicarMaterial: (dados: {
    arquivo: File
    titulo: string
    descricao?: string
  }) => void
}

export function AbaMateriais({
  materiais,
  podeGerenciarSala,
  perfil,
  onPublicarMaterial,
}: AbaMateriaisProps) {
  const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null)
  const [tituloMaterial, setTituloMaterial] = useState("")
  const [descricaoMaterial, setDescricaoMaterial] = useState("")

  const handleSelecionarArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setArquivoSelecionado(file)
    setTituloMaterial(file.name.replace(/\.[^/.]+$/, ""))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!arquivoSelecionado || !tituloMaterial.trim()) return

    onPublicarMaterial({
      arquivo: arquivoSelecionado,
      titulo: tituloMaterial.trim(),
      descricao: descricaoMaterial.trim() || undefined,
    })

    setArquivoSelecionado(null)
    setTituloMaterial("")
    setDescricaoMaterial("")
  }

  return (
    <div className="flex-1 min-h-0 bg-white p-5 space-y-5 overflow-y-auto">
      {podeGerenciarSala ? (
        <form
          onSubmit={handleSubmit}
          className="border border-slate-200 bg-slate-50/80 p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">
              Nova Publicação de Material
            </span>
          </div>

          {!arquivoSelecionado ? (
            <label className="flex items-center justify-center gap-2.5 border-2 border-dashed border-slate-300 bg-white rounded-lg py-4 px-4 cursor-pointer hover:border-red-800/50 hover:bg-red-50/20 transition">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.png,.jpg"
                className="hidden"
                onChange={handleSelecionarArquivo}
              />
              <Upload className="w-4 h-4 text-red-800" />
              <span className="text-xs font-medium text-slate-700">
                Selecionar arquivo do computador (PDF, Slides, Listas, ZIP...)
              </span>
            </label>
          ) : (
            <div className="space-y-3 bg-white border border-slate-200 rounded-lg p-3.5">
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200/80 rounded-md px-3 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-4 h-4 text-red-800 shrink-0" />
                  <span className="text-xs font-medium text-slate-700 truncate">
                    {arquivoSelecionado.name}
                  </span>
                  <span className="text-[11px] text-slate-400 shrink-0">
                    ({Math.max(1, Math.round(arquivoSelecionado.size / 1024))} KB)
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setArquivoSelecionado(null)
                    setTituloMaterial("")
                  }}
                  className="h-6 w-6 text-slate-400 hover:text-red-700 cursor-pointer"
                  title="Remover anexo"
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-600">
                  Título do material (editável)
                </label>
                <Input
                  value={tituloMaterial}
                  onChange={(e) => setTituloMaterial(e.target.value)}
                  placeholder="Ex: Lista 04 - Diagrama de Sequência"
                  className="h-8 text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-600">
                  Descrição ou orientações para a turma (opcional)
                </label>
                <textarea
                  value={descricaoMaterial}
                  onChange={(e) => setDescricaoMaterial(e.target.value)}
                  placeholder="Escreva uma breve explicação sobre o conteúdo deste material..."
                  rows={2}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="sm"
                  disabled={!tituloMaterial.trim()}
                  className="bg-red-800 hover:bg-red-900 text-white text-xs gap-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Publicar na Disciplina
                </Button>
              </div>
            </div>
          )}
        </form>
      ) : (
        <div className="text-[9px] text-slate-500 flex items-center gap-2">
          Apenas o monitor vinculado ou o docente orientador podem publicar novos materiais nesta disciplina.
        </div>
      )}

      <div className="space-y-3">
        {materiais.length === 0 ? (
          <p className="text-center text-sm text-slate-400 py-10">
            Nenhum material publicado nesta disciplina ainda.
          </p>
        ) : (
          materiais.map((mat) => (
            <article
              key={mat.id}
              className="border border-slate-200 rounded-none p-4 bg-white hover:border-slate-300 transition space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {mat.titulo}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Publicado por{" "}
                    <strong className="font-medium text-slate-700">
                      {mat.autor}
                    </strong>{" "}
                    • {mat.data}
                  </p>
                </div>
                <Badge variant="secondary" className="rounded-md text-[10px] shrink-0">
                  .{mat.tipo}
                </Badge>
              </div>

              {mat.descricao && (
                <p className="text-xs text-slate-600 leading-relaxed">
                  {mat.descricao}
                </p>
              )}

              <div className="flex items-center justify-between bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-md bg-red-50 text-red-800 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-medium text-slate-800 truncate">
                      {mat.nomeArquivo}
                    </p>
                    <p className="text-[11px] text-slate-500">{mat.tamanho}</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 text-xs shrink-0 bg-white cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Baixar
                </Button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
}