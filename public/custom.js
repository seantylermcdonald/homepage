document.addEventListener("DOMContentLoaded", () => {
  // ⏰ Clock
  const clock = document.getElementById("clock");
  if (clock) {
    setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      clock.textContent = `${hours}:${minutes}`;
    }, 1000);
  }

  // 🌤️ Weather (Optional - replace with real API later)
  const weather = document.getElementById("weather");
  if (weather) weather.textContent = "72°F, Clear Skies"; // placeholder

  // 🍿 Jellyseerr Search
  const form = document.getElementById("jelly-search");
  const results = document.getElementById("jelly-results");
  const JELLYSEERR_URL = "http://192.168.1.189:5055"; // ✅ Set yours

  if (form && results) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const query = form.query.value.trim();
      if (!query) return;

      results.innerHTML = `<div class="text-blue-400 animate-pulse">Searching...</div>`;

      try {
        const res = await fetch(`${JELLYSEERR_URL}/api/v1/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();

        if (!data.results || data.results.length === 0) {
          results.innerHTML = `<div class="text-yellow-400">No results found.</div>`;
          return;
        }

        results.innerHTML = data.results
          .map((item) => {
            const title = item.title || item.name || "Untitled";
            const year = item.releaseDate?.split("-")[0] || "Unknown";
            const type = item.mediaType;
            const image = item.posterPath
              ? `${JELLYSEERR_URL}/image.tmdb.org/t/p/w185${item.posterPath}`
              : "https://via.placeholder.com/92x138?text=No+Image";
            const id = item.id;

            return `
              <div class="flex gap-4 items-center py-2 border-b border-gray-700 last:border-none">
                <img src="${image}" alt="${title}" class="w-[92px] h-[138px] rounded shadow-sm object-cover bg-gray-800"/>
                <div class="flex-1">
                  <div class="text-base text-white font-semibold">${title}</div>
                  <div class="text-sm text-gray-400">${year} • ${type}</div>
                  <a href="${JELLYSEERR_URL}/request/${type}/${id}" target="_blank"
                     class="mt-2 inline-block text-sm text-blue-400 hover:underline">
                    ➕ Open in Jellyseerr
                  </a>
                </div>
              </div>
            `;
          })
          .join("");
      } catch (err) {
        console.error(err);
        results.innerHTML = `<div class="text-red-500">Error fetching results. Check console or server status.</div>`;
      }
    });
  }
});

async function fetchDiskSpace() {
  try {
    const res = await fetch("/api/disks");
    const data = await res.json();

    const container = document.getElementById("disk-info");
    container.innerHTML = ""; // clear previous

    data.disks.forEach(disk => {
      const div = document.createElement("div");
      div.className = "bg-slate-800 p-3 rounded-lg";

      const percent = disk.percent;
      const usedText = `${disk.used} GB / ${disk.total} GB`;

      div.innerHTML = `
        <div class="flex justify-between mb-1 text-xs text-slate-300">
          <span>${disk.mount}</span><span>${usedText}</span>
        </div>
        <div class="w-full bg-slate-700 rounded-full h-2.5">
          <div class="h-2.5 rounded-full bg-indigo-400 transition-all duration-500"
               style="width: ${percent}%;"></div>
        </div>
      `;

      container.appendChild(div);
    });
  } catch (err) {
    console.error("Disk fetch failed:", err);
  }
}

setInterval(fetchDiskSpace, 60000); // refresh every 60s
fetchDiskSpace();
