"use client";

import { useState } from "react";
import {
  Calendar,
  ChevronDown,
  FolderOpen,
  Lock,
  MapPin,
  MessageSquare,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Disciplina, Material, Mensagem, PerfilSimulado } from "./types";
import {
  DISCIPLINAS_INICIAIS,
  MATERIAIS_INICIAIS,
  MENSAGENS_PRIVADAS_INICIAIS,
  MENSAGENS_PUBLICAS_INICIAIS,
} from "./mock-data";
import { TopHeader } from "./_components/top-header";
import { SidebarDisciplinas } from "./_components/sidebar-disciplinas";
import { AbaChat } from "./_components/aba-chat";
import { AbaMateriais } from "./_components/aba-materiais";
import { ModalConfigSala } from "./_components/modal-config-monitoria";

export default function MonitoriasPage() {
  const [perfil, setPerfil] = useState<PerfilSimulado>("DISCENTE");
  const [disciplinas, setDisciplinas] =
    useState<Disciplina[]>(DISCIPLINAS_INICIAIS);
  const [codigoAtivo, setCodigoAtivo] = useState<string>("DCC117");
  const [abaAtiva, setAbaAtiva] = useState<string>("chat");

  const [mensagensPublicas, setMensagensPublicas] = useState(
    MENSAGENS_PUBLICAS_INICIAIS,
  );
  const [mensagensPrivadas, setMensagensPrivadas] = useState(
    MENSAGENS_PRIVADAS_INICIAIS,
  );
  const [materiais, setMateriais] = useState(MATERIAIS_INICIAIS);

  const DOCENTE_SIMULADO = "Prof. Fabrício Martins Mendonça";

  const disciplinasVisiveis =
    perfil === "DOCENTE"
      ? disciplinas.filter((d) => d.professor === DOCENTE_SIMULADO)
      : disciplinas;
    
  const disciplinaAtual =
    disciplinasVisiveis.find((d) => d.codigo === codigoAtivo) ||
    disciplinasVisiveis[0]

  const podeGerenciarSala =
    perfil === "DOCENTE" ||
    (perfil === "MONITOR" && disciplinaAtual.codigo === "DCC117");
  const podeAcessarPrivado =
    perfil === "DOCENTE" ||
    (perfil === "MONITOR" && disciplinaAtual.codigo === "DCC117");

  const [menuDisciplinasMobile, setMenuDisciplinasMobile] = useState(false);

  const getDadosAutorAtual = (): { nome: string; papel: Mensagem["papel"] } => {
    if (perfil === "DOCENTE")
      return { nome: disciplinaAtual.professor, papel: "Docente" };
    if (perfil === "MONITOR")
      return { nome: "Rodrigo da Silva", papel: "Monitor" };
    return { nome: "Rodrigo da Silva", papel: "Discente" };
  };

  const handleChangePerfil = (novoPerfil: PerfilSimulado) => {
    setPerfil(novoPerfil)

    if (novoPerfil === "DOCENTE") {
      const doDocente = disciplinas.filter((d) => d.professor === DOCENTE_SIMULADO)
      if (doDocente.length > 0 && !doDocente.some((d) => d.codigo === codigoAtivo)) {
        setCodigoAtivo(doDocente[0].codigo)
      }
    }

    if (novoPerfil === "DISCENTE" && abaAtiva === "privado") {
      setAbaAtiva("chat")
    }
  }

  const handleSelectDisciplina = (codigo: string) => {
    setCodigoAtivo(codigo);
    if (abaAtiva === "privado" && perfil === "MONITOR" && codigo !== "DCC117") {
      setAbaAtiva("chat");
    }
  };

  const criarNovaMensagem = (texto: string): Mensagem => {
    const autorInfo = getDadosAutorAtual();
    return {
      id: Date.now().toString(),
      autor: autorInfo.nome,
      papel: autorInfo.papel,
      horario: "Agora",
      texto,
    };
  };

  const handleEnviarPublico = (texto: string) => {
    const nova = criarNovaMensagem(texto);
    setMensagensPublicas((prev) => ({
      ...prev,
      [disciplinaAtual.codigo]: [...(prev[disciplinaAtual.codigo] || []), nova],
    }));
  };

  const handleEnviarPrivado = (texto: string) => {
    const nova = criarNovaMensagem(texto);
    setMensagensPrivadas((prev) => ({
      ...prev,
      [disciplinaAtual.codigo]: [...(prev[disciplinaAtual.codigo] || []), nova],
    }));
  };

  const handlePublicarMaterial = ({
    arquivo,
    titulo,
    descricao,
  }: {
    arquivo: File;
    titulo: string;
    descricao?: string;
  }) => {
    const autorInfo = getDadosAutorAtual();
    const extensao = arquivo.name.split(".").pop()?.toUpperCase() || "ARQUIVO";
    const tamanhoFormatado =
      arquivo.size >= 1024 * 1024
        ? `${(arquivo.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.max(1, Math.round(arquivo.size / 1024))} KB`;

    const novo: Material = {
      id: Date.now().toString(),
      titulo,
      descricao,
      nomeArquivo: arquivo.name,
      tipo: extensao,
      tamanho: tamanhoFormatado,
      data: "Agora",
      autor: `${autorInfo.nome} (${autorInfo.papel})`,
    };

    setMateriais((prev) => ({
      ...prev,
      [disciplinaAtual.codigo]: [novo, ...(prev[disciplinaAtual.codigo] || [])],
    }));
  };

  const handleAtualizarSessoes = (
    codigoDisciplina: string,
    novasSessoes: { dia: string; horario: string; local: string }[],
  ) => {
    setDisciplinas((prev) =>
      prev.map((d) =>
        d.codigo === codigoDisciplina ? { ...d, sessoes: novasSessoes } : d,
      ),
    );
  };

  const handleAtualizarMonitor = (
    codigoDisciplina: string,
    novoMonitor: string | null,
  ) => {
    setDisciplinas((prev) =>
      prev.map((d) =>
        d.codigo === codigoDisciplina ? { ...d, monitor: novoMonitor } : d,
      ),
    );
  };

  return (
    <div className="h-dvh overflow-hidden flex flex-col bg-slate-100">
      <TopHeader
        perfil={perfil}
        onChangePerfil={handleChangePerfil}
        nomeDocenteAtual={disciplinaAtual.professor}
      />

      <div className="flex-1 min-h-0 flex flex-col md:flex-row max-w-7xl w-full mx-auto overflow-hidden">
        <SidebarDisciplinas
          disciplinas={disciplinasVisiveis}
          codigoAtivo={disciplinaAtual.codigo}
          perfil={perfil}
          abertaMobile={menuDisciplinasMobile}
          onCloseMobile={() => setMenuDisciplinasMobile(false)}
          onSelectDisciplina={handleSelectDisciplina}
        />

        <main className="flex-1 min-h-0 flex flex-col bg-slate-50 min-w-0">
          {/* Cabeçalho */}
          <div className="bg-white border-b border-slate-200 px-4 py-3 md:px-6 md:py-4 space-y-2 md:space-y-3 shrink-0">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <button
                  type="button"
                  onClick={() => setMenuDisciplinasMobile(true)}
                  className="md:pointer-events-none flex items-center gap-1.5 text-left group cursor-pointer md:cursor-default max-w-full"
                >
                  <h1 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 truncate group-hover:text-red-800 md:group-hover:text-slate-900 transition-colors">
                    {disciplinaAtual.codigo} {disciplinaAtual.turma} — {disciplinaAtual.nome}
                  </h1>
                  <span className="md:hidden inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 text-slate-700 shrink-0">
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                <p className="hidden md:block text-xs text-slate-600 mt-1">
                  <span className="font-medium">{disciplinaAtual.professor}</span> •{" "}
                  <span>Aula: {disciplinaAtual.horariosAula}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {disciplinaAtual.monitor ? (
                  <span className="text-xs text-amber-900 py-1 px-2.5 hidden sm:inline">
                    Monitor(a): {disciplinaAtual.monitor}
                  </span>
                ) : (
                  <span className="text-xs text-slate-500 py-1 px-2.5 hidden sm:inline">
                    Sem monitor vinculado
                  </span>
                )}

                {podeGerenciarSala && (
                  <ModalConfigSala
                    disciplina={disciplinaAtual}
                    perfil={perfil}
                    onAtualizarSessoes={handleAtualizarSessoes}
                    onAtualizarMonitor={handleAtualizarMonitor}
                  />
                )}
              </div>
            </div>

            <div className="py-2 flex flex-wrap items-center gap-x-6 gap-y-1.5 text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-red-800" />
                Sessões de Monitoria:
              </span>
              {disciplinaAtual.sessoes.length > 0 ? (
                disciplinaAtual.sessoes.map((p, idx) => (
                  <span
                    key={idx}
                    className="text-slate-600 flex items-center gap-1"
                  >
                    <strong>{p.dia}</strong> ({p.horario}) •{" "}
                    <span className="inline-flex items-center gap-0.5 text-slate-500">
                      <MapPin className="w-3 h-3" /> {p.local}
                    </span>
                  </span>
                ))
              ) : (
                <span className="text-slate-400 italic">
                  Nenhum horário cadastrado para esta disciplina ainda.
                </span>
              )}
            </div>
          </div>

          {/* Abas Conectadas */}
          <Tabs
            value={abaAtiva}
            onValueChange={setAbaAtiva}
            className="flex-1 min-h-0 flex flex-col"
          >
            <div className="flex-1 min-h-0 flex flex-col border border-slate-200 bg-white overflow-hidden shadow-xs">
              <TabsList className="w-full h-11 p-0 bg-slate-100 border-b border-slate-200 rounded-none flex items-stretch justify-start shrink-0">
                <TabsTrigger
                  value="chat"
                  className="flex-1 sm:flex-none sm:px-6 h-full rounded-none  border-r gap-2 text-xs font-semibold text-slate-600 transition-colors cursor-pointer data-[state=active]:bg-red-800 data-[state=active]:text-white data-[state=active]:shadow-none"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chat
                </TabsTrigger>

                <TabsTrigger
                  value="materiais"
                  className="flex-1 sm:flex-none sm:px-6 h-full rounded-none border-r gap-2 text-xs font-semibold text-slate-600 transition-colors cursor-pointer data-[state=active]:bg-red-800 data-[state=active]:text-white data-[state=active]:shadow-none"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  Materiais ({(materiais[disciplinaAtual.codigo] || []).length})
                </TabsTrigger>

                {podeAcessarPrivado && (
                  <TabsTrigger
                    value="privado"
                    className="flex-1 sm:flex-none sm:px-6 h-full rounded-none border-r gap-2 text-xs font-semibold text-red-800 transition-colors cursor-pointer data-[state=active]:bg-red-800 data-[state=active]:text-white data-[state=active]:shadow-none"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Privado (Docente & Monitor)
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent
                value="chat"
                className="flex-1 min-h-0 flex flex-col m-0 bg-white focus-visible:outline-none"
              >
                <AbaChat
                  mensagens={mensagensPublicas[disciplinaAtual.codigo] || []}
                  placeholder={`Enviar mensagem pública em ${disciplinaAtual.codigo}...`}
                  emptyMessage="Nenhuma dúvida enviada ainda. Seja o primeiro a perguntar!"
                  onEnviarMensagem={handleEnviarPublico}
                />
              </TabsContent>

              <TabsContent
                value="materiais"
                className="flex-1 min-h-0 flex flex-col m-0 bg-white focus-visible:outline-none"
              >
                <AbaMateriais
                  materiais={materiais[disciplinaAtual.codigo] || []}
                  podeGerenciarSala={podeGerenciarSala}
                  perfil={perfil}
                  onPublicarMaterial={handlePublicarMaterial}
                />
              </TabsContent>

              {podeAcessarPrivado && (
                <TabsContent
                  value="privado"
                  className="flex-1 min-h-0 flex flex-col m-0 bg-white focus-visible:outline-none"
                >
                  <AbaChat
                    mensagens={mensagensPrivadas[disciplinaAtual.codigo] || []}
                    placeholder="Mensagem privada entre Docente e Monitor..."
                    emptyMessage="Nenhuma mensagem privada neste canal ainda."
                    isPrivado
                    onEnviarMensagem={handleEnviarPrivado}
                  />
                </TabsContent>
              )}
            </div>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
