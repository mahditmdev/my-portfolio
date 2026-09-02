type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="mb-3 text-sm font-bold tracking-wider text-cyan-400">
        {eyebrow}
      </p>

      <h2 className="text-3xl font-black text-white sm:text-5xl">{title}</h2>

      {description && (
        <p className="mt-5 leading-8 text-zinc-400">{description}</p>
      )}
    </div>
  );
}
