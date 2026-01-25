type Props = { onClick: () => void }

export default function MenuButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label="Open menu"
      className="fixed right-6 top-6 z-[70] flex h-12 w-12 items-center justify-center
                 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm
                 hover:bg-white/[0.06] transition"
    >
      <div className="space-y-1.5">
        <span className="block h-[2px] w-6 bg-white/70" />
        <span className="block h-[2px] w-6 bg-white/70" />
        <span className="block h-[2px] w-6 bg-white/70" />
      </div>
    </button>
  )
}
