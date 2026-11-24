"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  FileText,
  Upload,
  CheckCircle2,
  X,
  ArrowRight,
  Loader2,
  IdCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function PrimeiroAcessoPage() {
  const router = useRouter()
  const [arquivo, setArquivo] = useState<{ nome: string; tamanho: string } | null>(null)
  const [isProcessingPdf, setIsProcessingPdf] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsProcessingPdf(true)

    // Simula a leitura automática da matrícula e das disciplinas do PDF do SIGA
    setTimeout(() => {
      const tamanhoKb = Math.max(1, Math.round(file.size / 1024))
      setArquivo({
        nome: file.name,
        tamanho: `${tamanhoKb} KB`,
      })
      setIsProcessingPdf(false)
    }, 500)
  }

  const handleDeleteFile = () => {
    setArquivo(null)
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!arquivo) return
    router.push("/home")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8">
      <Card className="w-full max-w-lg shadow-sm">
        <CardHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-red-800 text-white flex items-center justify-center font-semibold text-sm">
                RS
              </div>
              <div>
                <CardTitle className="text-lg">Olá, Rodrigo da Silva!</CardTitle>
                <CardDescription>rodrigo.silva@estudante.ufjf.br</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              Discente
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Comprovante de Matrícula (PDF emitido pelo SIGA)</Label>

              {!arquivo ? (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg p-8 cursor-pointer hover:bg-slate-100/70 transition">
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isProcessingPdf}
                  />
                  {isProcessingPdf ? (
                    <div className="flex flex-col items-center gap-2 text-slate-600">
                      <Loader2 className="w-6 h-6 animate-spin text-red-800" />
                      <span className="text-sm font-medium">
                        Extraindo matrícula e disciplinas do SIGA...
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center gap-1.5 text-slate-500">
                      <Upload className="w-7 h-7 text-slate-600" />
                      <span className="text-sm font-medium text-slate-700">
                        Clique para selecionar o PDF do comprovante
                      </span>
                      <span className="text-xs max-w-sm">
                        Identificaremos automaticamente sua matrícula e liberaremos as salas das disciplinas ativas
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <div className="flex items-center justify-between border border-slate-200 bg-slate-50 rounded-lg px-3.5 py-3">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <FileText className="w-5 h-5 text-red-800 shrink-0" />
                    <div className="truncate">
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {arquivo.nome}
                      </p>
                      <p className="text-xs text-slate-500">{arquivo.tamanho}</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleDeleteFile}
                    title="Remover arquivo"
                    className="shrink-0 text-slate-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {arquivo && (
              <div className="space-y-3 bg-emerald-50/70 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-center justify-between text-xs text-emerald-900 border-b border-emerald-200/80 pb-2.5">
                  <span className="font-medium flex items-center gap-1.5">
                    <IdCard className="w-4 h-4 text-emerald-700" />
                    Matrícula identificada:
                  </span>
                  <span className="font-mono font-semibold bg-white px-2 py-0.5 rounded border border-emerald-200">
                    202565042A
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    3 disciplinas vinculadas para 2026.2:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary" className="bg-white border-emerald-200 text-slate-700">
                      DCC117 - Modelagem de Sistemas
                    </Badge>
                    <Badge variant="secondary" className="bg-white border-emerald-200 text-slate-700">
                      DCC013 - Estrutura de Dados
                    </Badge>
                    <Badge variant="secondary" className="bg-white border-emerald-200 text-slate-700">
                      MAT154 - Cálculo II
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={!arquivo}
              className="w-full h-11 bg-red-800 hover:bg-red-900 text-white gap-2 cursor-pointer"
            >
              Acessar Minhas Monitorias
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}