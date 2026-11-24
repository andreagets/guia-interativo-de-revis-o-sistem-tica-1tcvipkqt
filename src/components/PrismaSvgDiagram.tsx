import React from 'react'
import { PrismaFormData } from '@/data/prismaTypes'

interface PrismaSvgProps {
  data: PrismaFormData
  svgRef?: React.RefObject<SVGSVGElement | null>
}

/**
 * High-fidelity PRISMA 2020 SVG diagram renderer.
 * Strictly adheres to official Word templates:
 * - Yellow header bands (#FFF2CC or #FFE599 with black text)
 * - Lateral phase labels in gray boxes (IDENTIFICAÇÃO, TRIAGEM, INCLUSÃO)
 * - Sharp contour rectangular boxes with clear typography
 * - Directional straight arrows connecting phases
 * - Lateral branch for excluded records/reports with specific reasons
 * - Formal citation footer (Page MJ et al. BMJ 2021) and CC-BY 4.0 license note.
 */
export default function PrismaSvgDiagram({ data, svgRef }: PrismaSvgProps) {
  const isV2 = data.templateId === 'new_v2' || data.templateId === 'updated_v2'
  const isUpdated = data.templateId === 'updated_v1' || data.templateId === 'updated_v2'

  // Dimensions
  const width = isV2 ? 1040 : 760
  const height = isUpdated ? 1080 : 960

  const yellowFill = '#FFF2CC'
  const yellowStroke = '#D6B656'
  const boxFill = '#FFFFFF'
  const boxStroke = '#333333'
  const phaseFill = '#F5F5F5'
  const phaseStroke = '#CCCCCC'
  const textDark = '#111111'
  const textGray = '#444444'

  // Branch 1 coordinates
  const leftX = 140
  const boxW = 270

  // Lateral exclusion coordinates (Branch 1)
  const exclX = isV2 ? 430 : 435
  const exclW = isV2 ? 260 : 280

  // Branch 2 coordinates (Other sources, for v2)
  const otherLeftX = 720
  const otherBoxW = 270

  // Calculations
  const totalIdentified = data.recDatabases + data.recRegisters
  const totalRemoved = data.dupRemoved + data.ineligibleAutomation + data.removedOtherReasons

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto max-w-full font-sans select-none bg-white rounded-lg border border-slate-200 shadow-sm"
      role="img"
      aria-label="Fluxograma PRISMA 2020 de Seleção e Inclusão de Estudos"
    >
      <defs>
        {/* Arrowhead marker */}
        <marker
          id="prisma-arrow"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#333333" />
        </marker>
      </defs>

      {/* BACKGROUND */}
      <rect width={width} height={height} fill="#FFFFFF" />

      {/* ==================================================== */}
      {/* LATERAL PHASE LABELS (LEFTMOST STRIP)                */}
      {/* ==================================================== */}
      {/* Identificação */}
      <g transform="translate(15, 30)">
        <rect width="100" height="190" fill={phaseFill} stroke={phaseStroke} rx="3" />
        <text
          x="-95"
          y="55"
          transform="rotate(-90)"
          textAnchor="middle"
          fill={textDark}
          fontSize="12"
          fontWeight="bold"
          letterSpacing="1"
        >
          IDENTIFICAÇÃO
        </text>
      </g>

      {/* Triagem */}
      <g transform="translate(15, 240)">
        <rect width="100" height="490" fill={phaseFill} stroke={phaseStroke} rx="3" />
        <text
          x="-245"
          y="55"
          transform="rotate(-90)"
          textAnchor="middle"
          fill={textDark}
          fontSize="12"
          fontWeight="bold"
          letterSpacing="1"
        >
          TRIAGEM
        </text>
      </g>

      {/* Inclusão */}
      <g transform="translate(15, 750)">
        <rect
          width="100"
          height={isUpdated ? 230 : 130}
          fill={phaseFill}
          stroke={phaseStroke}
          rx="3"
        />
        <text
          x={isUpdated ? -115 : -65}
          y="55"
          transform="rotate(-90)"
          textAnchor="middle"
          fill={textDark}
          fontSize="12"
          fontWeight="bold"
          letterSpacing="1"
        >
          INCLUSÃO
        </text>
      </g>

      {/* ==================================================== */}
      {/* HEADER BANDS (YELLOW BARS - PRISMA 2020 SIGNATURE)   */}
      {/* ==================================================== */}
      {/* Yellow Header 1: Databases & Registers */}
      <rect
        x={leftX}
        y="30"
        width={isV2 ? 550 : boxW + exclW + 25}
        height="38"
        fill={yellowFill}
        stroke={yellowStroke}
        strokeWidth="1.2"
        rx="2"
      />
      <text
        x={leftX + (isV2 ? 275 : (boxW + exclW + 25) / 2)}
        y="54"
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
        fill={textDark}
      >
        Identificação de estudos via bases de dados e registros
      </text>

      {/* Yellow Header 2: Other methods (only v2) */}
      {isV2 && (
        <>
          <rect
            x={otherLeftX}
            y="30"
            width={otherBoxW}
            height="38"
            fill={yellowFill}
            stroke={yellowStroke}
            strokeWidth="1.2"
            rx="2"
          />
          <text
            x={otherLeftX + otherBoxW / 2}
            y="54"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill={textDark}
          >
            Identificação via outros métodos
          </text>
        </>
      )}

      {/* ==================================================== */}
      {/* RAMO 1: BASES DE DADOS E REGISTROS                   */}
      {/* ==================================================== */}

      {/* BOX 1: Registros identificados */}
      <rect
        x={leftX}
        y="85"
        width={boxW}
        height="135"
        fill={boxFill}
        stroke={boxStroke}
        strokeWidth="1.2"
      />
      <text x={leftX + 10} y="105" fontSize="11" fontWeight="bold" fill={textDark}>
        Registros identificados de:*
      </text>
      <text x={leftX + 15} y="125" fontSize="10.5" fill={textDark}>
        Bases de dados (n = {data.recDatabases})
      </text>
      <text x={leftX + 15} y="145" fontSize="10.5" fill={textDark}>
        Registros de ensaios (n = {data.recRegisters})
      </text>
      <text x={leftX + 15} y="165" fontSize="10" fontStyle="italic" fill={textGray}>
        Total identificado = {totalIdentified}
      </text>

      {/* Seta horizontal para remoções */}
      <line
        x1={leftX + boxW}
        y1="152"
        x2={exclX}
        y2="152"
        stroke={boxStroke}
        strokeWidth="1.2"
        markerEnd="url(#prisma-arrow)"
      />

      {/* BOX LATERAL 1: Registros removidos antes da triagem */}
      <rect
        x={exclX}
        y="85"
        width={exclW}
        height="135"
        fill={boxFill}
        stroke={boxStroke}
        strokeWidth="1.2"
      />
      <text x={exclX + 10} y="105" fontSize="11" fontWeight="bold" fill={textDark}>
        Registros removidos antes da triagem:
      </text>
      <text x={exclX + 15} y="125" fontSize="10" fill={textDark}>
        Duplicatas removidas (n = {data.dupRemoved})
      </text>
      <text x={exclX + 15} y="145" fontSize="10" fill={textDark}>
        Marcados inelegíveis por automação (n = {data.ineligibleAutomation})
      </text>
      <text x={exclX + 15} y="165" fontSize="10" fill={textDark}>
        Removidos por outros motivos (n = {data.removedOtherReasons})
      </text>
      <text x={exclX + 15} y="185" fontSize="9.5" fontStyle="italic" fill={textGray}>
        Total removido = {totalRemoved}
      </text>

      {/* Seta vertical: Identificação -> Triagem */}
      <line
        x1={leftX + boxW / 2}
        y1="220"
        x2={leftX + boxW / 2}
        y2="255"
        stroke={boxStroke}
        strokeWidth="1.2"
        markerEnd="url(#prisma-arrow)"
      />

      {/* BOX 2: Registros triados */}
      <rect
        x={leftX}
        y="255"
        width={boxW}
        height="75"
        fill={boxFill}
        stroke={boxStroke}
        strokeWidth="1.2"
      />
      <text x={leftX + 10} y="280" fontSize="11" fontWeight="bold" fill={textDark}>
        Registros triados
      </text>
      <text x={leftX + 15} y="305" fontSize="11" fill={textDark}>
        (n = {data.recScreened})
      </text>

      {/* Seta lateral para Registros Excluídos */}
      <line
        x1={leftX + boxW}
        y1="292"
        x2={exclX}
        y2="292"
        stroke={boxStroke}
        strokeWidth="1.2"
        markerEnd="url(#prisma-arrow)"
      />

      {/* BOX LATERAL 2: Registros excluídos */}
      <rect
        x={exclX}
        y="255"
        width={exclW}
        height="75"
        fill={boxFill}
        stroke={boxStroke}
        strokeWidth="1.2"
      />
      <text x={exclX + 10} y="280" fontSize="11" fontWeight="bold" fill={textDark}>
        Registros excluídos**
      </text>
      <text x={exclX + 15} y="305" fontSize="11" fill={textDark}>
        (n = {data.recExcluded})
      </text>

      {/* Seta vertical: Triados -> Relatórios procurados */}
      <line
        x1={leftX + boxW / 2}
        y1="330"
        x2={leftX + boxW / 2}
        y2="365"
        stroke={boxStroke}
        strokeWidth="1.2"
        markerEnd="url(#prisma-arrow)"
      />

      {/* BOX 3: Relatórios procurados para recuperação */}
      <rect
        x={leftX}
        y="365"
        width={boxW}
        height="75"
        fill={boxFill}
        stroke={boxStroke}
        strokeWidth="1.2"
      />
      <text x={leftX + 10} y="390" fontSize="11" fontWeight="bold" fill={textDark}>
        Relatórios procurados para recuperação
      </text>
      <text x={leftX + 15} y="415" fontSize="11" fill={textDark}>
        (n = {data.repSought})
      </text>

      {/* Seta lateral para Relatórios Não Recuperados */}
      <line
        x1={leftX + boxW}
        y1="402"
        x2={exclX}
        y2="402"
        stroke={boxStroke}
        strokeWidth="1.2"
        markerEnd="url(#prisma-arrow)"
      />

      {/* BOX LATERAL 3: Relatórios não recuperados */}
      <rect
        x={exclX}
        y="365"
        width={exclW}
        height="75"
        fill={boxFill}
        stroke={boxStroke}
        strokeWidth="1.2"
      />
      <text x={exclX + 10} y="390" fontSize="11" fontWeight="bold" fill={textDark}>
        Relatórios não recuperados
      </text>
      <text x={exclX + 15} y="415" fontSize="11" fill={textDark}>
        (n = {data.repNotRetrieved})
      </text>

      {/* Seta vertical: Procurados -> Avaliados para elegibilidade */}
      <line
        x1={leftX + boxW / 2}
        y1="440"
        x2={leftX + boxW / 2}
        y2="475"
        stroke={boxStroke}
        strokeWidth="1.2"
        markerEnd="url(#prisma-arrow)"
      />

      {/* BOX 4: Relatórios avaliados para elegibilidade */}
      <rect
        x={leftX}
        y="475"
        width={boxW}
        height="85"
        fill={boxFill}
        stroke={boxStroke}
        strokeWidth="1.2"
      />
      <text x={leftX + 10} y="500" fontSize="11" fontWeight="bold" fill={textDark}>
        Relatórios avaliados para elegibilidade
      </text>
      <text x={leftX + 15} y="525" fontSize="11" fill={textDark}>
        (n = {data.repAssessed})
      </text>

      {/* Seta lateral para Relatórios Excluídos com motivos */}
      <line
        x1={leftX + boxW}
        y1="517"
        x2={exclX}
        y2="517"
        stroke={boxStroke}
        strokeWidth="1.2"
        markerEnd="url(#prisma-arrow)"
      />

      {/* BOX LATERAL 4: Relatórios excluídos com motivos */}
      <rect
        x={exclX}
        y="475"
        width={exclW}
        height="230"
        fill={boxFill}
        stroke={boxStroke}
        strokeWidth="1.2"
      />
      <text x={exclX + 10} y="497" fontSize="11" fontWeight="bold" fill={textDark}>
        Relatórios excluídos:
      </text>
      <text x={exclX + 15} y="517" fontSize="10.5" fill={textDark}>
        Total excluídos (n = {data.repExcluded})
      </text>
      <text x={exclX + 10} y="537" fontSize="9.5" fontStyle="italic" fill={textGray}>
        Motivos específicos de exclusão:
      </text>

      {/* Motivos de exclusão dinâmicos */}
      {data.exclusionReasons.slice(0, 7).map((r, idx) => (
        <text key={r.id || idx} x={exclX + 12} y={557 + idx * 18} fontSize="9" fill={textDark}>
          • {r.reason.slice(0, 36)} (n = {r.count})
        </text>
      ))}

      {/* ==================================================== */}
      {/* RAMO 2: OUTRAS FONTES (SOMENTE EM v2)                */}
      {/* ==================================================== */}
      {isV2 && (
        <g>
          {/* BOX Other 1: Identificação */}
          <rect
            x={otherLeftX}
            y="85"
            width={otherBoxW}
            height="135"
            fill={boxFill}
            stroke={boxStroke}
            strokeWidth="1.2"
          />
          <text x={otherLeftX + 10} y="105" fontSize="11" fontWeight="bold" fill={textDark}>
            Registros identificados de:*
          </text>
          <text x={otherLeftX + 15} y="125" fontSize="10" fill={textDark}>
            Websites (n = {data.otherWebsites})
          </text>
          <text x={otherLeftX + 15} y="145" fontSize="10" fill={textDark}>
            Organizações (n = {data.otherOrgs})
          </text>
          <text x={otherLeftX + 15} y="165" fontSize="10" fill={textDark}>
            Busca em citações (n = {data.otherCitations})
          </text>
          <text x={otherLeftX + 15} y="185" fontSize="10" fill={textDark}>
            Outros métodos (n = {data.otherOtherMethods})
          </text>

          {/* Seta vertical: Identificação -> Procurados */}
          <line
            x1={otherLeftX + otherBoxW / 2}
            y1="220"
            x2={otherLeftX + otherBoxW / 2}
            y2="365"
            stroke={boxStroke}
            strokeWidth="1.2"
            markerEnd="url(#prisma-arrow)"
          />

          {/* BOX Other 2: Relatórios procurados */}
          <rect
            x={otherLeftX}
            y="365"
            width={otherBoxW}
            height="75"
            fill={boxFill}
            stroke={boxStroke}
            strokeWidth="1.2"
          />
          <text x={otherLeftX + 10} y="390" fontSize="11" fontWeight="bold" fill={textDark}>
            Relatórios procurados para recuperação
          </text>
          <text x={otherLeftX + 15} y="415" fontSize="11" fill={textDark}>
            (n = {data.otherRepSought})
          </text>

          {/* Seta vertical: Procurados -> Avaliados */}
          <line
            x1={otherLeftX + otherBoxW / 2}
            y1="440"
            x2={otherLeftX + otherBoxW / 2}
            y2="475"
            stroke={boxStroke}
            strokeWidth="1.2"
            markerEnd="url(#prisma-arrow)"
          />

          {/* BOX Other 3: Avaliados e excluídos */}
          <rect
            x={otherLeftX}
            y="475"
            width={otherBoxW}
            height="230"
            fill={boxFill}
            stroke={boxStroke}
            strokeWidth="1.2"
          />
          <text x={otherLeftX + 10} y="497" fontSize="11" fontWeight="bold" fill={textDark}>
            Relatórios avaliados para elegibilidade
          </text>
          <text x={otherLeftX + 15} y="517" fontSize="10.5" fill={textDark}>
            (n = {data.otherRepAssessed})
          </text>

          <text x={otherLeftX + 10} y="542" fontSize="10.5" fontWeight="bold" fill={textDark}>
            Relatórios excluídos:
          </text>
          <text x={otherLeftX + 15} y="562" fontSize="10" fill={textDark}>
            Total excluídos (n = {data.otherRepExcluded})
          </text>

          {data.otherExclusionReasons.slice(0, 5).map((r, idx) => (
            <text
              key={r.id || idx}
              x={otherLeftX + 15}
              y={585 + idx * 18}
              fontSize="9"
              fill={textDark}
            >
              • {r.reason.slice(0, 36)} (n = {r.count})
            </text>
          ))}
        </g>
      )}

      {/* ==================================================== */}
      {/* FASE FINAL: INCLUSÃO                                 */}
      {/* ==================================================== */}

      {/* Seta vertical convergindo para Inclusão */}
      <line
        x1={leftX + boxW / 2}
        y1="560"
        x2={leftX + boxW / 2}
        y2="750"
        stroke={boxStroke}
        strokeWidth="1.2"
        markerEnd="url(#prisma-arrow)"
      />

      {isV2 && (
        <path
          d={`M ${otherLeftX + otherBoxW / 2} 705 L ${otherLeftX + otherBoxW / 2} 725 L ${
            leftX + boxW / 2 + 100
          } 725 L ${leftX + boxW / 2 + 100} 750`}
          fill="none"
          stroke={boxStroke}
          strokeWidth="1.2"
          markerEnd="url(#prisma-arrow)"
        />
      )}

      {/* BOX FINAL DE INCLUSÃO */}
      {!isUpdated ? (
        /* Revisão Nova (v1 ou v2) */
        <g transform={`translate(${leftX}, 750)`}>
          <rect
            width={isV2 ? 450 : boxW + 80}
            height="110"
            fill={boxFill}
            stroke={boxStroke}
            strokeWidth="1.3"
          />
          <text x="15" y="30" fontSize="12" fontWeight="bold" fill={textDark}>
            Estudos incluídos na revisão
          </text>
          <text x="20" y="55" fontSize="11" fill={textDark}>
            Estudos novos incluídos (n = {data.studiesIncluded})
          </text>
          <text x="20" y="80" fontSize="11" fill={textDark}>
            Relatórios dos novos estudos incluídos (n = {data.reportsIncluded})
          </text>
        </g>
      ) : (
        /* Revisão Atualizada (v1 ou v2) */
        <g transform={`translate(${leftX}, 750)`}>
          <rect
            width={isV2 ? 550 : boxW + 150}
            height="190"
            fill={boxFill}
            stroke={boxStroke}
            strokeWidth="1.3"
          />
          <text x="15" y="28" fontSize="12" fontWeight="bold" fill={textDark}>
            Estudos incluídos na revisão atualizada
          </text>

          <text x="20" y="52" fontSize="10.5" fill={textDark}>
            Estudos incluídos na versão anterior (n = {data.prevStudies})
          </text>
          <text x="20" y="72" fontSize="10.5" fill={textDark}>
            Relatórios dos estudos incluídos anteriormente (n = {data.prevReports})
          </text>

          <line
            x1="15"
            y1="85"
            x2={isV2 ? 535 : boxW + 135}
            y2="85"
            stroke="#DDDDDD"
            strokeWidth="1"
          />

          <text x="20" y="107" fontSize="10.5" fill={textDark}>
            Novos estudos incluídos nesta atualização (n = {data.newStudies})
          </text>
          <text x="20" y="127" fontSize="10.5" fill={textDark}>
            Relatórios dos novos estudos incluídos (n = {data.newReports})
          </text>

          <line
            x1="15"
            y1="140"
            x2={isV2 ? 535 : boxW + 135}
            y2="140"
            stroke="#DDDDDD"
            strokeWidth="1"
          />

          <text x="20" y="162" fontSize="11" fontWeight="bold" fill={textDark}>
            Total de estudos incluídos na revisão = {data.totalStudies}
          </text>
          <text x="20" y="180" fontSize="11" fontWeight="bold" fill={textDark}>
            Total de relatórios dos estudos = {data.totalReports}
          </text>
        </g>
      )}

      {/* FOOTER SCIENTIFIC SOURCE & LICENSE NOTE */}
      <g transform={`translate(20, ${height - 25})`}>
        <text fontSize="8.5" fill="#666666">
          *Considere relatar o número de registros identificados em cada base/registro
          individualmente. **Na triagem de títulos e resumos, a especificação detalhada de motivos
          de exclusão não é mandatória.
        </text>
        <text y="14" fontSize="8.5" fill="#888888">
          Fonte: Page MJ, et al. The PRISMA 2020 statement: an updated guideline for reporting
          systematic reviews. BMJ 2021;372:n71. DOI: 10.1136/bmj.n71. Licença CC-BY 4.0.
        </text>
      </g>
    </svg>
  )
}
