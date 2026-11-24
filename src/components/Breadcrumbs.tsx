import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  to?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Navegação estrutural (Breadcrumb)"
      className="mb-6 flex items-center flex-wrap gap-1.5 text-xs text-slate-500 dark:text-slate-400"
    >
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <Home className="h-3.5 w-3.5" />
        <span>Início</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1
        return (
          <div key={idx} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
            {isLast || !item.to ? (
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[240px] sm:max-w-md">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.to}
                className="hover:text-slate-900 dark:hover:text-white transition-colors truncate max-w-[200px]"
              >
                {item.label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
