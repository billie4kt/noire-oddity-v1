interface ProjectTileProps {
  title: string
  category: string
  description: string
  image: string
}

export function ProjectTile({ title, category, description, image }: ProjectTileProps) {
  return (
    <div className="relative group overflow-hidden rounded-lg aspect-square">
      {/* Background image */}
      <img 
        src={image} 
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay with gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/15 via-black/40 to-black/85" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 transition-all duration-300">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 text-xs tracking-widest uppercase text-white/70 border border-white/30 group-hover:border-white/80 transition-colors">
            {category}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2 text-white">
          {title}
        </h3>
        <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
