export default function MaintenancePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
      <div className="rounded-2xl border border-[#F0DFD7] bg-white/95 p-10 max-w-md shadow-sm">
        <div className="text-4xl mb-4">🔧</div>
        <h1 className="text-2xl font-bold text-[#2A1D24] mb-2">Sedang Maintenance</h1>
        <p className="text-sm text-[#6E5D66]">
          Website sedang dalam pemeliharaan sistem. Website akan kembali normal sebentar lagi.
        </p>
      </div>
    </div>
  );
}
