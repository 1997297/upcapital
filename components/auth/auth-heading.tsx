export function AuthHeading({ title, description }: { title: string; description: string }) {
  return (
    <>
      <p className="up-kicker">Account access</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-4 text-sm leading-7 text-text-secondary">{description}</p>
    </>
  );
}
