export type PerfilSimulado = "DISCENTE" | "MONITOR" | "DOCENTE"

export interface Mensagem {
  id: string
  autor: string
  papel: "Discente" | "Monitor" | "Docente"
  horario: string
  texto: string
}

export interface Material {
  id: string
  titulo: string
  descricao?: string
  nomeArquivo: string
  tipo: string
  tamanho: string
  data: string
  autor: string
}

export interface Disciplina {
  codigo: string
  turma: string
  nome: string
  professor: string
  monitor: string | null
  horariosAula: string
  sessoes: { dia: string; horario: string; local: string }[]
}