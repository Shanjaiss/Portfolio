import { Filter } from 'lucide-react'
import {
  projectFilters,
  type ProjectFilterValue,
} from '../../data/projectFilters'

type ProjectFilterProps = {
  value: ProjectFilterValue
  onChange: (filter: ProjectFilterValue) => void
}

export default function ProjectFilter({ value, onChange }: ProjectFilterProps) {
  return (
    <>
      <div className="filter-label">
        <Filter size={14} /> FILTER
      </div>
      <div className="filter-list" role="group" aria-label="Filter projects">
        {projectFilters.map((filter) => (
          <button
            key={filter}
            className={`filter-chip${value === filter ? ' active' : ''}`}
            onClick={() => onChange(filter)}
            aria-pressed={value === filter}
          >
            {filter}
          </button>
        ))}
      </div>
    </>
  )
}
