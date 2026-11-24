import { Disciplina, Material, Mensagem } from "./types"

export const DISCIPLINAS_INICIAIS: Disciplina[] = [
  {
    codigo: "DCC117",
    turma: "A",
    nome: "Modelagem de Sistemas",
    professor: "Prof. Fabrício Martins Mendonça",
    monitor: "Rodrigo da Silva",
    horariosAula: "Ter 14:00 • Qui 14:00 (S.302 - ICE)",
    sessoes: [
      { dia: "Quarta-feira", horario: "16:00 - 18:00", local: "Lab 3 - DCC" },
      { dia: "Sexta-feira", horario: "18:00 - 19:30", local: "Online (Google Meet)" },
    ],
  },
  {
    codigo: "DCC012",
    turma: "A",
    nome: "Estrutura de Dados II",
    professor: "Profa. Bárbara de Melo Quintela",
    monitor: "Lucas Mendes",
    horariosAula: "Ter 16:00 • Sex 14:00 (S.309 - ICE)",
    sessoes: [{ dia: "Segunda-feira", horario: "10:00 - 12:00", local: "Lab 2 - DCC" }],
  },
  {
    codigo: "DCC008",
    turma: "X",
    nome: "Cálculo Numérico",
    professor: "Prof. Joventino de Oliveira Campos",
    monitor: "Mariana Costa",
    horariosAula: "Seg 16:00 • Qui 16:00 (S.301 - ICE)",
    sessoes: [{ dia: "Quinta-feira", horario: "14:00 - 16:00", local: "Sala Monitoria ICE" }],
  },
  {
    codigo: "MAT158",
    turma: "B",
    nome: "Álgebra Linear",
    professor: "Prof. Evandro Riva",
    monitor: "Gabriel Alves",
    horariosAula: "Ter 10:00 • Qui 10:00 (S.304 - ICE)",
    sessoes: [{ dia: "Quarta-feira", horario: "10:00 - 12:00", local: "S.205 - ICE" }],
  },
  {
    codigo: "MAT157",
    turma: "E",
    nome: "Cálculo III",
    professor: "Prof. Régis Castijos Alves Soares Jr.",
    monitor: "Beatriz Souza",
    horariosAula: "Qua 19:00 • Sex 21:00 (S.301 - ICE)",
    sessoes: [{ dia: "Terça-feira", horario: "18:00 - 19:00", local: "S.110 - ICE" }],
  },
  {
    codigo: "MAT029",
    turma: "D",
    nome: "Equações Diferenciais I",
    professor: "Profa. Lucy Tiemi Takahashi",
    monitor: "Pedro Henrique",
    horariosAula: "Qua 21:00 • Sex 19:00 (S.113 - ICE)",
    sessoes: [{ dia: "Quinta-feira", horario: "18:00 - 19:00", local: "S.113 - ICE" }],
  },
  {
    codigo: "DCC070",
    turma: "A",
    nome: "Organização de Computadores",
    professor: "Prof. Marcelo Lobosco",
    monitor: null,
    horariosAula: "Seg 14:00 • Qua 14:00 (S.209 - ICE)",
    sessoes: [],
  },
]

export const MENSAGENS_PUBLICAS_INICIAIS: Record<string, Mensagem[]> = {
  DCC117: [
    {
      id: "1",
      autor: "Prof. Fabrício Martins Mendonça",
      papel: "Docente",
      horario: "09:15",
      texto: "Bom dia, turma! Os horários desta semana já estão fixados acima.",
    },
    {
      id: "2",
      autor: "Rodrigo da Silva",
      papel: "Monitor",
      horario: "10:02",
      texto: "Pessoal, acabei de subir o guia de cardinalidade UML e exemplos de Diagrama de Classes na aba Materiais.",
    },
    {
      id: "3",
      autor: "Camila Ferreira",
      papel: "Discente",
      horario: "10:14",
      texto: "Valeu! Na relação N:N entre Discente e Disciplina precisamos criar classe associativa?",
    },
  ],
}

export const MENSAGENS_PRIVADAS_INICIAIS: Record<string, Mensagem[]> = {
  DCC117: [
    {
      id: "p1",
      autor: "Prof. Fabrício Martins Mendonça",
      papel: "Docente",
      horario: "Ontem, 17:30",
      texto: "Rodrigo, na sexta-feira foque nos exercícios de Diagrama de Sequência com os alunos que tiveram dúvida na aula.",
    },
    {
      id: "p2",
      autor: "Rodrigo da Silva",
      papel: "Monitor",
      horario: "Ontem, 17:42",
      texto: "Combinado, professor! Já separei 3 cenários práticos para resolvermos na sessão.",
    },
  ],
}

export const MATERIAIS_INICIAIS: Record<string, Material[]> = {
  DCC117: [
    {
      id: "m1",
      titulo: "Gabarito Comentado — Lista 03 (Diagrama de Classes)",
      descricao:
        "Pessoal, resolvi passo a passo as questões de agregação vs. composição e classes associativas que caem na próxima prova.",
      nomeArquivo: "Lista_03_Classes_Gabarito.pdf",
      tipo: "PDF",
      tamanho: "1.4 MB",
      data: "Hoje, 10:01",
      autor: "Rodrigo da Silva (Monitor)",
    },
    {
      id: "m2",
      titulo: "Resumo Rápido: Casos de Uso (Include vs. Extend)",
      descricao:
        "Mapa mental com exemplos práticos de quando usar <<include>> e <<extend>> sem confundir a direção das setas.",
      nomeArquivo: "Resumo_Casos_de_Uso.pdf",
      tipo: "PDF",
      tamanho: "820 KB",
      data: "18/11/2026",
      autor: "Rodrigo da Silva (Monitor)",
    },
  ],
}