"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext(undefined);

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data favorites dari API saat pertama kali load
  useEffect(() => {
    fetch("/api/favorites")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFavorites(data);
        }
      })
      .catch((err) => console.error("Error fetching favorites:", err))
      .finally(() => setLoading(false));
  }, []);

  async function addFavorite(user) {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      const saved = await res.json();
      setFavorites((prev) => [...prev, saved]);
    }
  }

  async function removeFavorite(userId) {
    const res = await fetch(`/api/favorites/${userId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setFavorites((prev) => prev.filter((f) => String(f.id) !== String(userId)));
    }
  }

  function isFavorite(userId) {
    return favorites.some((f) => String(f.id) === String(userId));
  }

  async function toggleFavorite(user) {
    if (isFavorite(user.id)) {
      await removeFavorite(user.id);
    } else {
      await addFavorite(user);
    }
  }

  async function updateNote(userId, note) {
    const res = await fetch(`/api/favorites/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note }),
    });

    if (res.ok) {
      const updated = await res.json();
      setFavorites((prev) =>
        prev.map((item) => (String(item.id) === String(userId) ? { ...item, ...updated } : item))
      );
    }
  }

  const value = {
    favorites,
    favoritesCount: favorites.length,
    loading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    updateNote,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error("useFavorite harus dipakai di dalam <FavoriteProvider>");
  }
  return context;
}

export const useFavorites = useFavorite;
