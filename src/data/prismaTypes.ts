export type PrismaTemplateId =
  | 'new_v1' // Nova revisão, apenas bases de dados e registros
  | 'new_v2' // Nova revisão, bases/registros + outras fontes
  | 'updated_v1' // Revisão atualizada, apenas bases de dados e registros
  | 'updated_v2' // Revisão atualizada, bases/registros + outras fontes

export interface ExclusionReason {
  id: string
  reason: string
  count: number
}

export interface PrismaFormData {
  templateId: PrismaTemplateId

  // IDENTIFICAÇÃO (Bases & Registros)
  recDatabases: number
  recRegisters: number
  dupRemoved: number
  ineligibleAutomation: number
  removedOtherReasons: number

  // TRIAGEM
  recScreened: number
  recExcluded: number

  // RECUPERAÇÃO
  repSought: number
  repNotRetrieved: number

  // ELEGIBILIDADE
  repAssessed: number
  repExcluded: number
  exclusionReasons: ExclusionReason[]

  // OUTRAS FONTES (v2 models)
  otherWebsites: number
  otherOrgs: number
  otherCitations: number
  otherOtherMethods: number
  otherRepSought: number
  otherRepNotRetrieved: number
  otherRepAssessed: number
  otherRepExcluded: number
  otherExclusionReasons: ExclusionReason[]

  // INCLUSÃO
  studiesIncluded: number
  reportsIncluded: number

  // REVISÕES ATUALIZADAS (updated models)
  prevStudies: number
  prevReports: number
  newStudies: number
  newReports: number
  totalStudies: number
  totalReports: number
}

export interface ValidationError {
  field: string
  message: string
}

export const DEFAULT_PRISMA_NEW_V1: PrismaFormData = {
  templateId: 'new_v1',
  recDatabases: 1450,
  recRegisters: 50,
  dupRemoved: 320,
  ineligibleAutomation: 80,
  removedOtherReasons: 0,
  recScreened: 1100, // 1500 - 400 = 1100
  recExcluded: 980,
  repSought: 120, // 1100 - 980 = 120
  repNotRetrieved: 5,
  repAssessed: 115, // 120 - 5 = 115
  repExcluded: 90,
  exclusionReasons: [
    { id: '1', reason: 'População não elegível (dor aguda)', count: 42 },
    { id: '2', reason: 'Intervenção sem acompanhamento de fisioterapeuta', count: 28 },
    { id: '3', reason: 'Delineamento não randomizado', count: 20 },
  ],
  otherWebsites: 0,
  otherOrgs: 0,
  otherCitations: 0,
  otherOtherMethods: 0,
  otherRepSought: 0,
  otherRepNotRetrieved: 0,
  otherRepAssessed: 0,
  otherRepExcluded: 0,
  otherExclusionReasons: [],
  studiesIncluded: 20, // 20 estudos representados por 25 relatórios
  reportsIncluded: 25, // 115 - 90 = 25
  prevStudies: 0,
  prevReports: 0,
  newStudies: 0,
  newReports: 0,
  totalStudies: 0,
  totalReports: 0,
}

export const DEFAULT_PRISMA_NEW_V2: PrismaFormData = {
  ...DEFAULT_PRISMA_NEW_V1,
  templateId: 'new_v2',
  otherWebsites: 40,
  otherOrgs: 15,
  otherCitations: 25,
  otherOtherMethods: 0,
  otherRepSought: 80, // 40 + 15 + 25
  otherRepNotRetrieved: 8,
  otherRepAssessed: 72, // 80 - 8
  otherRepExcluded: 64,
  otherExclusionReasons: [
    { id: 'o1', reason: 'Apenas resumo de congresso sem dados metodológicos', count: 40 },
    { id: 'o2', reason: 'Duplicidade com estudos de bases indexadas', count: 24 },
  ],
  studiesIncluded: 26,
  reportsIncluded: 33, // 25 (bases) + 8 (outras fontes: 72 - 64) = 33 relatórios
}

export const DEFAULT_PRISMA_UPDATED_V1: PrismaFormData = {
  ...DEFAULT_PRISMA_NEW_V1,
  templateId: 'updated_v1',
  prevStudies: 15,
  prevReports: 18,
  newStudies: 10,
  newReports: 12,
  totalStudies: 25, // 15 + 10
  totalReports: 30, // 18 + 12
  studiesIncluded: 25,
  reportsIncluded: 30,
}

export const DEFAULT_PRISMA_UPDATED_V2: PrismaFormData = {
  ...DEFAULT_PRISMA_NEW_V2,
  templateId: 'updated_v2',
  prevStudies: 15,
  prevReports: 18,
  newStudies: 14,
  newReports: 17,
  totalStudies: 29, // 15 + 14
  totalReports: 35, // 18 + 17
  studiesIncluded: 29,
  reportsIncluded: 35,
}

export function validatePrismaData(data: PrismaFormData): ValidationError[] {
  const errors: ValidationError[] = []

  // Non-negative numbers check
  const numericKeys: (keyof PrismaFormData)[] = [
    'recDatabases',
    'recRegisters',
    'dupRemoved',
    'ineligibleAutomation',
    'removedOtherReasons',
    'recScreened',
    'recExcluded',
    'repSought',
    'repNotRetrieved',
    'repAssessed',
    'repExcluded',
    'studiesIncluded',
    'reportsIncluded',
  ]

  for (const k of numericKeys) {
    const val = data[k] as number
    if (typeof val !== 'number' || val < 0 || !Number.isInteger(val)) {
      errors.push({
        field: String(k),
        message: `O campo ${String(k)} deve ser um número inteiro maior ou igual a zero.`,
      })
    }
  }

  // 1. Identificação -> Triagem
  const totalIdentified = data.recDatabases + data.recRegisters
  const totalRemovedBeforeScreening =
    data.dupRemoved + data.ineligibleAutomation + data.removedOtherReasons

  if (totalRemovedBeforeScreening > totalIdentified) {
    errors.push({
      field: 'dupRemoved',
      message: `Registros removidos antes da triagem (${totalRemovedBeforeScreening}) excedem o total de registros identificados (${totalIdentified}).`,
    })
  }

  const expectedScreened = totalIdentified - totalRemovedBeforeScreening
  if (data.recScreened !== expectedScreened) {
    errors.push({
      field: 'recScreened',
      message: `Registros triados (${data.recScreened}) deve ser igual a [Identificados (${totalIdentified}) − Removidos (${totalRemovedBeforeScreening})] = ${expectedScreened}.`,
    })
  }

  // 2. Triagem -> Relatórios procurados
  if (data.recExcluded > data.recScreened) {
    errors.push({
      field: 'recExcluded',
      message: `Registros excluídos (${data.recExcluded}) não podem exceder os registros triados (${data.recScreened}).`,
    })
  }

  const expectedSought = data.recScreened - data.recExcluded
  if (data.repSought !== expectedSought) {
    errors.push({
      field: 'repSought',
      message: `Relatórios procurados (${data.repSought}) deve ser igual a [Triados (${data.recScreened}) − Excluídos (${data.recExcluded})] = ${expectedSought}.`,
    })
  }

  // 3. Recuperação -> Elegibilidade
  if (data.repNotRetrieved > data.repSought) {
    errors.push({
      field: 'repNotRetrieved',
      message: `Relatórios não recuperados (${data.repNotRetrieved}) não podem exceder os procurados (${data.repSought}).`,
    })
  }

  const expectedAssessed = data.repSought - data.repNotRetrieved
  if (data.repAssessed !== expectedAssessed) {
    errors.push({
      field: 'repAssessed',
      message: `Relatórios avaliados para elegibilidade (${data.repAssessed}) deve ser igual a [Procurados (${data.repSought}) − Não recuperados (${data.repNotRetrieved})] = ${expectedAssessed}.`,
    })
  }

  // 4. Elegibilidade -> Exclusões
  if (data.repExcluded > data.repAssessed) {
    errors.push({
      field: 'repExcluded',
      message: `Relatórios excluídos na elegibilidade (${data.repExcluded}) não podem exceder os avaliados (${data.repAssessed}).`,
    })
  }

  // 5. Soma dos motivos de exclusão = Total de relatórios excluídos
  const reasonsSum = data.exclusionReasons.reduce((acc, r) => acc + (Number(r.count) || 0), 0)
  if (reasonsSum !== data.repExcluded) {
    errors.push({
      field: 'exclusionReasons',
      message: `A soma das quantidades dos motivos de exclusão (${reasonsSum}) deve ser EXATAMENTE igual ao total de relatórios excluídos (${data.repExcluded}). Relação pendente de ajuste: faltam/sobram ${Math.abs(
        data.repExcluded - reasonsSum,
      )}.`,
    })
  }

  // 6. Inclusão: relatórios incluídos
  const expectedIncludedReportsBranch1 = data.repAssessed - data.repExcluded

  // 7. Validações do Ramo de Outras Fontes (v2)
  if (data.templateId === 'new_v2' || data.templateId === 'updated_v2') {
    const totalOtherIdentified =
      data.otherWebsites + data.otherOrgs + data.otherCitations + data.otherOtherMethods

    if (data.otherRepSought > totalOtherIdentified) {
      errors.push({
        field: 'otherRepSought',
        message: `Relatórios procurados em outras fontes (${data.otherRepSought}) não podem superar o total identificado (${totalOtherIdentified}).`,
      })
    }

    if (data.otherRepNotRetrieved > data.otherRepSought) {
      errors.push({
        field: 'otherRepNotRetrieved',
        message: `Relatórios não recuperados em outras fontes (${data.otherRepNotRetrieved}) não podem superar os procurados (${data.otherRepSought}).`,
      })
    }

    const expectedOtherAssessed = data.otherRepSought - data.otherRepNotRetrieved
    if (data.otherRepAssessed !== expectedOtherAssessed) {
      errors.push({
        field: 'otherRepAssessed',
        message: `Relatórios avaliados em outras fontes (${data.otherRepAssessed}) deve ser igual a [Procurados (${data.otherRepSought}) − Não recuperados (${data.otherRepNotRetrieved})] = ${expectedOtherAssessed}.`,
      })
    }

    if (data.otherRepExcluded > data.otherRepAssessed) {
      errors.push({
        field: 'otherRepExcluded',
        message: `Relatórios excluídos em outras fontes (${data.otherRepExcluded}) não podem superar os avaliados (${data.otherRepAssessed}).`,
      })
    }

    const otherReasonsSum = data.otherExclusionReasons.reduce(
      (acc, r) => acc + (Number(r.count) || 0),
      0,
    )
    if (otherReasonsSum !== data.otherRepExcluded) {
      errors.push({
        field: 'otherExclusionReasons',
        message: `A soma dos motivos de exclusão de outras fontes (${otherReasonsSum}) deve ser igual ao total excluído nesse ramo (${data.otherRepExcluded}).`,
      })
    }

    const expectedOtherIncludedReports = data.otherRepAssessed - data.otherRepExcluded
    const totalNewIncludedReportsExpected =
      expectedIncludedReportsBranch1 + expectedOtherIncludedReports

    if (data.templateId === 'new_v2') {
      if (data.reportsIncluded !== totalNewIncludedReportsExpected) {
        errors.push({
          field: 'reportsIncluded',
          message: `Total de relatórios incluídos (${data.reportsIncluded}) deve ser a soma do Ramo Bases (${expectedIncludedReportsBranch1}) + Ramo Outras Fontes (${expectedOtherIncludedReports}) = ${totalNewIncludedReportsExpected}.`,
        })
      }
    }
  } else if (data.templateId === 'new_v1') {
    if (data.reportsIncluded !== expectedIncludedReportsBranch1) {
      errors.push({
        field: 'reportsIncluded',
        message: `Relatórios incluídos (${data.reportsIncluded}) deve ser igual a [Avaliados (${data.repAssessed}) − Excluídos (${data.repExcluded})] = ${expectedIncludedReportsBranch1}.`,
      })
    }
  }

  // 8. Distinção essencial: Estudos únicos ≤ Relatórios incluídos
  if (data.studiesIncluded > data.reportsIncluded) {
    errors.push({
      field: 'studiesIncluded',
      message: `O número de estudos únicos incluídos (${data.studiesIncluded}) não pode ser maior do que o número de relatórios incluídos (${data.reportsIncluded}). Um estudo pode ter 1 ou mais relatórios, nunca menos que 1.`,
    })
  }

  // 9. Revisões Atualizadas: total = anteriores + novos
  if (data.templateId === 'updated_v1' || data.templateId === 'updated_v2') {
    if (data.totalStudies !== data.prevStudies + data.newStudies) {
      errors.push({
        field: 'totalStudies',
        message: `Total de estudos na revisão atualizada (${data.totalStudies}) deve ser igual a [Estudos anteriores (${data.prevStudies}) + Novos estudos (${data.newStudies})] = ${
          data.prevStudies + data.newStudies
        }.`,
      })
    }

    if (data.totalReports !== data.prevReports + data.newReports) {
      errors.push({
        field: 'totalReports',
        message: `Total de relatórios na revisão atualizada (${data.totalReports}) deve ser igual a [Relatórios anteriores (${data.prevReports}) + Novos relatórios (${data.newReports})] = ${
          data.prevReports + data.newReports
        }.`,
      })
    }
  }

  return errors
}
