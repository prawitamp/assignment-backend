export default function MaintenancePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
      <div className="rounded-2xl border border-zinc-800 bg-[#121318] p-10 max-w-md shadow-2xl">
        <div className="text-4xl mb-4">🔧</div>
        <h1 className="text-2xl font-bold text-white mb-2">Sedang Maintenance</h1>
        <p className="text-sm text-zinc-400">
          Website sedang dalam pemeliharaan sistem. Website akan kembali normal sebentar lagi.
        </p>
      </div>
    </div>
  );
}
