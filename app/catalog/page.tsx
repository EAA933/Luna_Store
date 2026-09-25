// app/catalog/page.tsx
"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import FitHelpModal from "@/components/FitHelpModal";
import { products, StoreProduct, MirarCollection } from "@/lib/products";
import {
  RotateCcw,
  Search,
  SlidersHorizontal,
  Check,
  X,
  Sparkles,
  ArrowRight,
  Layers,
  Tag,
  Flame,
  ChevronLeft,
  ChevronRight,
  Ruler,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

// Helper para normalizar cadenas (remueve acentos y pasa a minúsculas)
function normalizeText(text: string): string {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Componente para resaltar coincidencias de texto con tipografía sans limpia
function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query || !query.trim()) return <span>{text}</span>;

  const normalizedQuery = normalizeText(query);
  const normalizedText = normalizeText(text);
  const matchIndex = normalizedText.indexOf(normalizedQuery);

  if (matchIndex === -1) return <span>{text}</span>;

  const before = text.slice(0, matchIndex);
  const match = text.slice(matchIndex, matchIndex + query.length);
  const after = text.slice(matchIndex + query.length);

  return (
    <span>
      {before}
      <mark className="bg-[rgb(var(--accent))]/20 text-[rgb(var(--fg))] font-semibold rounded px-0.5">
        {match}
      </mark>
      {after}
    </span>
  );
}

// Búsquedas populares / sugerencias rápidas en píldoras estilo Apple
const POPULAR_SEARCH_PILLS = [
  { label: "Polarizados HD", query: "Polarizado", type: "filter" },
  { label: "Titanio", query: "Titanio", type: "material" },
  { label: "Bio-Acetato", query: "Bio-Acetato", type: "material" },
  { label: "rePlastic®", query: "rePlastic", type: "collection" },
  { label: "Brisa", query: "Brisa", type: "model" },
  { label: "Duna", query: "Duna", type: "model" },
  { label: "Marea", query: "Marea", type: "model" },
  { label: "Ocaso", query: "Ocaso", type: "model" },
  { label: "Carey Ámbar", query: "Ámbar", type: "lens" },
  { label: "Aviador", query: "Aviador", type: "shape" },
];

function CatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const collectionInUrl = (searchParams.get("collection") || "") as MirarCollection | "";
  const segmentInUrl = (searchParams.get("segment") || "") as "men" | "women" | "unisex" | "";

  const [q, setQ] = useState("");
  const [collection, setCollection] = useState<typeof collectionInUrl>(collectionInUrl);
  const [segment, setSegment] = useState<typeof segmentInUrl>(segmentInUrl);
  const [material, setMaterial] = useState<string>("");
  const [polarizedOnly, setPolarizedOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(2600);

  // Estados para la predictibilidad de búsqueda
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Estado para modal de ayuda y guía de calce
  const [isFitHelpOpen, setIsFitHelpOpen] = useState(false);

  // Ref para el carrusel de "Conoce la gama" al inicio
  const rangeSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCollection(collectionInUrl);
  }, [collectionInUrl]);

  useEffect(() => {
    setSegment(segmentInUrl);
  }, [segmentInUrl]);

  // Cerrar sugerencias al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCollectionChange = useCallback(
    (val: MirarCollection | "") => {
      setCollection(val);
      const sp = new URLSearchParams(searchParams.toString());
      if (val) sp.set("collection", val);
      else sp.delete("collection");
      router.push(`/catalog?${sp.toString()}`);
      setIsSearchFocused(false);
    },
    [router, searchParams]
  );

  function scrollRange(dir: "left" | "right") {
    if (!rangeSliderRef.current) return;
    const offset = dir === "left" ? -340 : 340;
    rangeSliderRef.current.scrollBy({ left: offset, behavior: "smooth" });
  }

  // Productos filtrados en tiempo real (instantáneo con q)
  const filtered = useMemo(() => {
    const normQ = normalizeText(q);

    return products.filter((p) => {
      const matchQ =
        !normQ ||
        normalizeText(p.name).includes(normQ) ||
        normalizeText(p.ref).includes(normQ) ||
        normalizeText(p.collection).includes(normQ) ||
        normalizeText(p.shape).includes(normQ) ||
        normalizeText(p.lensColor).includes(normQ) ||
        normalizeText(p.lensType).includes(normQ) ||
        normalizeText(p.material).includes(normQ) ||
        normalizeText(p.edition).includes(normQ) ||
        normalizeText(p.description).includes(normQ) ||
        normalizeText(p.sustainabilityBadge).includes(normQ);

      const matchCollection = !collection || p.collection === collection;
      const matchSegment = !segment || p.segment === segment;
      const matchMaterial =
        !material || normalizeText(p.material).includes(normalizeText(material));
      const matchPolarized = !polarizedOnly || p.polarized;
      const matchPrice = p.price <= maxPrice;

      return matchQ && matchCollection && matchSegment && matchMaterial && matchPolarized && matchPrice;
    });
  }, [q, collection, segment, material, polarizedOnly, maxPrice]);

  // Sugerencias predictivas calculadas al vuelo
  const predictiveSuggestions = useMemo(() => {
    const normQ = normalizeText(q);
    if (!normQ) {
      return {
        matchedProducts: [],
        filterSuggestions: [],
      };
    }

    const matchedProducts = products.filter((p) => {
      return (
        normalizeText(p.name).includes(normQ) ||
        normalizeText(p.ref).includes(normQ) ||
        normalizeText(p.edition).includes(normQ) ||
        normalizeText(p.shape).includes(normQ) ||
        normalizeText(p.material).includes(normQ) ||
        normalizeText(p.lensColor).includes(normQ)
      );
    });

    const filterSuggestions: Array<{
      id: string;
      label: string;
      category: string;
      action: () => void;
    }> = [];

    const collectionsList: MirarCollection[] = ["Urban", "Nature", "rePlastic", "Horizon"];
    collectionsList.forEach((c) => {
      if (normalizeText(c).includes(normQ)) {
        filterSuggestions.push({
          id: `col-${c}`,
          label: `Colección ${c}`,
          category: "Colección",
          action: () => handleCollectionChange(c),
        });
      }
    });

    const materialsList = [
      { name: "rePlastic® Marino Circular", key: "rePlastic" },
      { name: "Acero Quirúrgico 316L", key: "Acero" },
      { name: "Bio-Acetato de Algodón", key: "Acetato" },
      { name: "Titanio Grado 2", key: "Titanio" },
    ];
    materialsList.forEach((m) => {
      if (normalizeText(m.name).includes(normQ) || normalizeText(m.key).includes(normQ)) {
        filterSuggestions.push({
          id: `mat-${m.key}`,
          label: m.name,
          category: "Material",
          action: () => {
            setMaterial(m.key);
            setQ("");
            setIsSearchFocused(false);
          },
        });
      }
    });

    if ("polarizado".includes(normQ) || "filtro hd".includes(normQ)) {
      filterSuggestions.push({
        id: "polar-filter",
        label: "Sólo lentes Polarizados HD",
        category: "Filtro Óptico",
        action: () => {
          setPolarizedOnly(true);
          setQ("");
          setIsSearchFocused(false);
        },
      });
    }

    return {
      matchedProducts: matchedProducts.slice(0, 4),
      filterSuggestions: filterSuggestions.slice(0, 3),
    };
  }, [q, handleCollectionChange]);

  // Manejador del teclado para navegar entre sugerencias
  function handleKeyDown(e: React.KeyboardEvent) {
    const totalItems =
      predictiveSuggestions.matchedProducts.length +
      predictiveSuggestions.filterSuggestions.length;

    if (!isSearchFocused || totalItems === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev + 1) % totalItems);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev - 1 + totalItems) % totalItems);
    } else if (e.key === "Enter") {
      if (activeSuggestionIndex >= 0) {
        e.preventDefault();
        if (activeSuggestionIndex < predictiveSuggestions.matchedProducts.length) {
          const selectedProd =
            predictiveSuggestions.matchedProducts[activeSuggestionIndex];
          router.push(`/product/${selectedProd.slug}`);
          setIsSearchFocused(false);
        } else {
          const filterIdx =
            activeSuggestionIndex - predictiveSuggestions.matchedProducts.length;
          const selectedFilter = predictiveSuggestions.filterSuggestions[filterIdx];
          if (selectedFilter) {
            selectedFilter.action();
          }
        }
      }
    } else if (e.key === "Escape") {
      setIsSearchFocused(false);
    }
  }

  function handleApplySearchPill(queryStr: string) {
    setQ(queryStr);
    setIsSearchFocused(false);
  }

  function resetFilters() {
    setQ("");
    setCollection("");
    setSegment("");
    setMaterial("");
    setPolarizedOnly(false);
    setMaxPrice(2600);
    setIsSearchFocused(false);
    router.push("/catalog");
  }

  const hasActiveFilters = Boolean(
    q || collection || segment || material || polarizedOnly || maxPrice < 2600
  );

  return (
    <main className="w-full min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))] px-5 sm:px-8 md:px-12 py-10 transition-colors">
      {/* Modal de ayuda y guía anatómica de calce */}
      <FitHelpModal isOpen={isFitHelpOpen} onClose={() => setIsFitHelpOpen(false)} />

      {/* HEADER DEL CATÁLOGO CON BOTÓN DE ¿NECESITAS AYUDA? */}
      <div className="max-w-7xl mx-auto pb-6 border-b border-[rgb(var(--stroke))] mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <span className="text-xs uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))] block mb-1">
              CATÁLOGO DE LENTES DE SOL
            </span>
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[rgb(var(--fg))]">
              Todos los modelos.
            </h1>
            <p className="text-xs sm:text-sm text-[rgb(var(--secondary))] mt-1.5 max-w-xl leading-relaxed">
              Explora nuestra gama de monturas. Micas con protección UV400, bisagras de 7 gavilanes, estuche de cuero vegetal y garantía de por vida.
            </p>
          </div>

          {/* Acciones del header: Selector de colecciones y Botón ¿Necesitas ayuda? */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
            {/* BOTÓN: ¿NECESITAS AYUDA? -> Abre "Tu calce ideal" */}
            <button
              type="button"
              onClick={() => setIsFitHelpOpen(true)}
              className="btn-apple-secondary px-4 py-1.5 text-xs font-medium rounded-full inline-flex items-center gap-1.5 shadow-sm"
              title="Abre la guía anatómica de calibres y medidas"
            >
              <Ruler className="w-3.5 h-3.5 text-[rgb(var(--accent))]" />
              <span>¿Necesitas ayuda? Tu calce</span>
            </button>

            {/* Selector de Colección en PÍLDORAS */}
            <div className="flex flex-wrap gap-1 p-1 bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] rounded-full">
              {[
                { label: "Todos", value: "" },
                { label: "Urban", value: "Urban" },
                { label: "Nature", value: "Nature" },
                { label: "rePlastic®", value: "rePlastic" },
                { label: "Horizon", value: "Horizon" },
              ].map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => handleCollectionChange(opt.value as any)}
                  className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all ${
                    collection === opt.value
                      ? "bg-[rgb(var(--bg))] text-[rgb(var(--fg))] shadow-sm"
                      : "text-[rgb(var(--secondary))] hover:text-[rgb(var(--fg))]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 1. SECCIÓN «CONOCE LA GAMA» HASTA ARRIBA DEL CATÁLOGO */}
      <section className="max-w-7xl mx-auto mb-12 pb-10 border-b border-[rgb(var(--stroke))]">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <span className="text-[11px] uppercase font-medium tracking-[0.2em] text-[rgb(var(--secondary))] block">
              GAMA COMPLETA
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[rgb(var(--fg))] mt-0.5">
              Conoce la gama.
            </h2>
            <p className="text-xs text-[rgb(var(--secondary))] mt-1">
              Desplaza horizontalmente para explorar cada una de nuestras siluetas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollRange("left")}
              aria-label="Desplazar a la izquierda"
              className="w-8 h-8 rounded-full border border-[rgb(var(--stroke))] flex items-center justify-center text-[rgb(var(--secondary))] hover:text-[rgb(var(--fg))] hover:border-[rgb(var(--fg))] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollRange("right")}
              aria-label="Desplazar a la derecha"
              className="w-8 h-8 rounded-full border border-[rgb(var(--stroke))] flex items-center justify-center text-[rgb(var(--secondary))] hover:text-[rgb(var(--fg))] hover:border-[rgb(var(--fg))] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carrusel horizontal de modelos */}
        <div
          ref={rangeSliderRef}
          className="w-full overflow-x-auto flex gap-4 scroll-smooth no-scrollbar pb-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.slug}`}
              className="flex-shrink-0 w-[240px] sm:w-[280px] p-5 rounded-3xl bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] flex flex-col justify-between group hover:shadow-lg transition-all"
              style={{ scrollSnapAlign: "start" }}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-[rgb(var(--secondary))] mb-1">
                  <span>{p.ref}</span>
                  <span>{p.caliber} mm</span>
                </div>
                <h3 className="text-base font-semibold text-[rgb(var(--fg))] group-hover:text-[rgb(var(--accent))] transition-colors">
                  {p.name}
                </h3>
                <p className="text-[11px] text-[rgb(var(--secondary))] line-clamp-1 mt-0.5">
                  {p.shape}
                </p>

                <div className="relative aspect-[4/3] w-full my-3 flex items-center justify-center">
                  <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      referrerPolicy="no-referrer"
                      className="object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[rgb(var(--stroke))] flex items-center justify-between">
                <span className="text-xs font-semibold text-[rgb(var(--fg))]">
                  ${p.price.toLocaleString("es-MX")} MXN
                </span>
                <span className="text-[11px] text-[rgb(var(--accent))] font-medium group-hover:underline inline-flex items-center gap-0.5">
                  <span>Ver modelo</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 2. BARRA DE BÚSQUEDA PREDICTIVA PRINCIPAL CON AUTOCOMPLETADO */}
      <div className="max-w-7xl mx-auto mb-10">
        <div ref={searchContainerRef} className="relative z-30">
          <div className="rounded-full p-2 bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] focus-within:border-[rgb(var(--accent))] transition-all shadow-sm hover:shadow-md flex items-center gap-3">
            <div className="pl-3 text-[rgb(var(--accent))] flex items-center justify-center">
              <Search className="w-4 h-4" />
            </div>

            {/* Input de Búsqueda Predictiva en Tiempo Real */}
            <input
              ref={searchInputRef}
              type="text"
              role="combobox"
              aria-expanded={isSearchFocused}
              aria-controls="predictive-search-results"
              aria-autocomplete="list"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setIsSearchFocused(true);
                setActiveSuggestionIndex(-1);
              }}
              onFocus={() => setIsSearchFocused(true)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar por modelo, mica o material (ej. 'Orion', 'Polarizado', 'Titanio')..."
              className="w-full bg-transparent text-sm sm:text-base font-sans text-[rgb(var(--fg))] placeholder:text-[rgb(var(--secondary))]/70 focus:outline-none"
            />

            {/* Indicador sutil de filtrado en vivo */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] rounded-full text-[11px] font-medium text-[rgb(var(--secondary))] whitespace-nowrap shadow-sm">
              <Sparkles className="w-3 h-3 text-[rgb(var(--accent))]" />
              <span>En vivo</span>
            </div>

            {/* Botón de limpiar búsqueda */}
            {q && (
              <button
                type="button"
                onClick={() => {
                  setQ("");
                  searchInputRef.current?.focus();
                }}
                className="p-1.5 mr-1 hover:bg-[rgb(var(--card-warm))] rounded-full text-[rgb(var(--secondary))] hover:text-[rgb(var(--fg))] transition-colors"
                title="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* DESPLEGABLE PREDICTIVO FLOTANTE */}
          {isSearchFocused && (q.trim().length > 0 || !q) && (
            <div
              id="predictive-search-results"
              className="absolute top-full left-0 right-0 mt-2 bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] rounded-3xl shadow-2xl p-4 backdrop-blur-md z-40 max-h-[460px] overflow-y-auto"
            >
              {q.trim().length === 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[rgb(var(--secondary))] px-2 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-[rgb(var(--accent))]" />
                      Búsquedas sugeridas
                    </span>
                    <span>Clic para filtrar</span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {POPULAR_SEARCH_PILLS.map((pill) => (
                      <button
                        key={pill.label}
                        type="button"
                        onClick={() => handleApplySearchPill(pill.query)}
                        className="px-4 py-1.5 text-xs font-medium rounded-full border border-[rgb(var(--stroke))] bg-[rgb(var(--bg))] hover:border-[rgb(var(--fg))] transition-all flex items-center gap-1.5 shadow-sm text-[rgb(var(--fg))]"
                      >
                        <Tag className="w-3 h-3 text-[rgb(var(--secondary))]" />
                        <span>{pill.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Encabezado con estado predictivo */}
                  <div className="flex items-center justify-between text-xs border-b border-[rgb(var(--stroke))] pb-2 px-1">
                    <span className="text-[rgb(var(--secondary))] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[rgb(var(--accent))]" />
                      <span>Resultados para &ldquo;{q}&rdquo;:</span>
                    </span>
                    <span className="font-semibold text-[rgb(var(--fg))]">
                      {filtered.length} modelo(s)
                    </span>
                  </div>

                  {/* 1. Lista de modelos coincidentes con imágenes sin fondo */}
                  {predictiveSuggestions.matchedProducts.length > 0 && (
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[rgb(var(--secondary))] font-medium block mb-2 px-1">
                        Modelos de Lentes
                      </span>
                      <div className="grid gap-2">
                        {predictiveSuggestions.matchedProducts.map((prod, index) => {
                          const isSelected = activeSuggestionIndex === index;
                          return (
                            <Link
                              key={prod.id}
                              href={`/product/${prod.slug}`}
                              onClick={() => setIsSearchFocused(false)}
                              className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                                isSelected
                                  ? "bg-[rgb(var(--bg))] border-[rgb(var(--fg))] shadow-sm"
                                  : "border-[rgb(var(--stroke))] bg-[rgb(var(--bg))]/70 hover:bg-[rgb(var(--bg))]"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-[rgb(var(--card))] overflow-hidden flex-shrink-0 border border-[rgb(var(--stroke))] relative flex items-center justify-center p-1">
                                  <Image
                                    src={prod.image}
                                    alt={prod.name}
                                    width={44}
                                    height={44}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] text-[rgb(var(--secondary))]">
                                      {prod.ref}
                                    </span>
                                    <h4 className="text-sm font-semibold text-[rgb(var(--fg))]">
                                      <HighlightMatch text={prod.name} query={q} />
                                    </h4>
                                  </div>
                                  <p className="text-xs text-[rgb(var(--secondary))] mt-0.5 line-clamp-1">
                                    {prod.material} · {prod.lensColor}
                                  </p>
                                </div>
                              </div>

                              <div className="text-right flex items-center gap-3">
                                <div>
                                  <span className="text-xs font-semibold text-[rgb(var(--fg))] block">
                                    ${prod.price.toLocaleString("es-MX")} MXN
                                  </span>
                                  <span className="text-[10px] text-[rgb(var(--secondary))]">
                                    {prod.polarized ? "Polarizado HD" : "Mineral UV400"}
                                  </span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[rgb(var(--accent))]" />
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 2. Filtros sugeridos */}
                  {predictiveSuggestions.filterSuggestions.length > 0 && (
                    <div className="pt-2 border-t border-[rgb(var(--stroke))]">
                      <span className="text-[11px] uppercase tracking-wider text-[rgb(var(--secondary))] font-medium block mb-2 px-1">
                        Sugerencias de Filtro
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {predictiveSuggestions.filterSuggestions.map((sug, i) => {
                          const itemIndex =
                            predictiveSuggestions.matchedProducts.length + i;
                          const isSelected = activeSuggestionIndex === itemIndex;
                          return (
                            <button
                              key={sug.id}
                              type="button"
                              onClick={sug.action}
                              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all flex items-center gap-1.5 ${
                                isSelected
                                  ? "bg-[rgb(var(--fg))] text-[rgb(var(--bg))] border-[rgb(var(--fg))] shadow-sm"
                                  : "border-[rgb(var(--stroke))] bg-[rgb(var(--bg))] text-[rgb(var(--fg))] hover:border-[rgb(var(--fg))]"
                              }`}
                            >
                              <Layers className="w-3 h-3 text-[rgb(var(--secondary))]" />
                              <span className="text-[rgb(var(--secondary))]">{sug.category}:</span>
                              <span>{sug.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 3. Cero sugerencias */}
                  {predictiveSuggestions.matchedProducts.length === 0 &&
                    predictiveSuggestions.filterSuggestions.length === 0 && (
                      <div className="py-4 text-center">
                        <p className="text-xs text-[rgb(var(--secondary))] mb-2">
                          No hay sugerencias directas para &ldquo;{q}&rdquo;.
                        </p>
                        <div className="flex flex-wrap justify-center gap-1.5">
                          {["Brisa", "Duna", "Marea", "Ocaso", "Titanio", "Carey"].map(
                            (term) => (
                              <button
                                key={term}
                                type="button"
                                onClick={() => handleApplySearchPill(term)}
                                className="px-3 py-1 text-xs font-medium rounded-full border border-[rgb(var(--stroke))] bg-[rgb(var(--bg))] hover:border-[rgb(var(--fg))]"
                              >
                                {term}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Píldoras de búsqueda rápida debajo de la barra */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-[rgb(var(--secondary))] flex items-center gap-1 flex-shrink-0 text-xs font-medium">
            <Tag className="w-3 h-3 text-[rgb(var(--secondary))]" />
            Atajos:
          </span>
          {POPULAR_SEARCH_PILLS.map((pill) => (
            <button
              key={pill.label}
              type="button"
              onClick={() => handleApplySearchPill(pill.query)}
              className={`px-3 py-1 rounded-full border transition-all flex-shrink-0 text-xs font-medium ${
                normalizeText(q) === normalizeText(pill.query)
                  ? "bg-[rgb(var(--fg))] text-[rgb(var(--bg))] border-[rgb(var(--fg))] shadow-sm"
                  : "border-[rgb(var(--stroke))] bg-[rgb(var(--card))] text-[rgb(var(--secondary))] hover:border-[rgb(var(--stroke-strong))] hover:text-[rgb(var(--fg))]"
              }`}
            >
              {pill.label}
            </button>
          ))}
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              className="px-2.5 py-1 rounded-full border border-[rgb(var(--accent))]/40 text-[rgb(var(--accent))] hover:bg-[rgb(var(--accent))]/10 transition-colors flex items-center gap-1 text-xs font-medium flex-shrink-0"
            >
              <X className="w-3 h-3" />
              Borrar filtro ({q})
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-start">
        {/* Barra Lateral de Filtros en Píldoras Limpias */}
        <aside className="lg:col-span-3 p-6 rounded-3xl space-y-6 bg-[rgb(var(--card))] border border-[rgb(var(--stroke))]">
          <div className="flex items-center justify-between pb-4 border-b border-[rgb(var(--stroke))]">
            <h3 className="font-semibold text-sm flex items-center gap-2 text-[rgb(var(--fg))]">
              <SlidersHorizontal className="w-4 h-4 text-[rgb(var(--secondary))]" />
              <span>Filtros</span>
            </h3>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-[rgb(var(--accent))] hover:underline flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                Limpiar todo
              </button>
            )}
          </div>

          {/* BOTÓN ASISTENCIA DE CALCE EN SIDEBAR */}
          <div>
            <button
              type="button"
              onClick={() => setIsFitHelpOpen(true)}
              className="w-full py-2.5 px-4 text-xs font-medium rounded-full bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] text-[rgb(var(--fg))] hover:border-[rgb(var(--accent))] transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Ruler className="w-3.5 h-3.5 text-[rgb(var(--accent))]" />
              <span>¿Dudas de tu calce? Ver guía</span>
            </button>
          </div>

          {/* Búsqueda lateral sincronizada */}
          <div>
            <div className="flex items-center justify-between mb-2 text-xs text-[rgb(var(--secondary))] font-medium">
              <span>Buscar</span>
              {q && (
                <span className="text-[rgb(var(--accent))] font-medium">
                  {filtered.length} coincidencias
                </span>
              )}
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-[rgb(var(--secondary))]" />
              <input
                type="text"
                placeholder="Orion, Vega, MR-01..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] pl-10 pr-9 py-2 text-xs text-[rgb(var(--fg))] font-sans rounded-full focus:outline-none focus:border-[rgb(var(--accent))]"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="absolute right-3 top-2 text-[rgb(var(--secondary))] hover:text-[rgb(var(--fg))]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Línea de Género en Píldoras */}
          <div>
            <label className="block text-xs uppercase font-medium tracking-wider text-[rgb(var(--secondary))] mb-2">
              Línea / Género
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs font-medium">
              {[
                { label: "Todos", val: "" },
                { label: "Hombre", val: "men" },
                { label: "Mujer", val: "women" },
                { label: "Unisex", val: "unisex" },
              ].map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setSegment(s.val as any)}
                  className={`py-2 px-3 text-center rounded-full border transition-all ${
                    segment === s.val
                      ? "bg-[rgb(var(--fg))] text-[rgb(var(--bg))] border-[rgb(var(--fg))] shadow-sm font-semibold"
                      : "border-[rgb(var(--stroke))] bg-[rgb(var(--bg))] text-[rgb(var(--secondary))] hover:text-[rgb(var(--fg))]"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Material de Montura */}
          <div>
            <label className="block text-xs uppercase font-medium tracking-wider text-[rgb(var(--secondary))] mb-2">
              Material de Montura
            </label>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] px-4 py-2 text-xs text-[rgb(var(--fg))] font-sans rounded-full focus:outline-none focus:border-[rgb(var(--accent))]"
            >
              <option value="">Todos los materiales</option>
              <option value="rePlastic">rePlastic® Marino Circular</option>
              <option value="Acero">Acero Quirúrgico 316L</option>
              <option value="Acetato">Bio-Acetato de Algodón</option>
              <option value="Titanio">Titanio Grado 2</option>
            </select>
          </div>

          {/* Polarizado toggle en Píldora */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setPolarizedOnly(!polarizedOnly)}
              className={`w-full py-2.5 px-4 text-xs font-medium flex items-center justify-between rounded-full border transition-all ${
                polarizedOnly
                  ? "bg-[rgb(var(--fg))] text-[rgb(var(--bg))] border-[rgb(var(--fg))] shadow-sm"
                  : "bg-[rgb(var(--bg))] text-[rgb(var(--secondary))] border-[rgb(var(--stroke))] hover:text-[rgb(var(--fg))]"
              }`}
            >
              <span>Sólo Polarizados HD</span>
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                  polarizedOnly
                    ? "border-[rgb(var(--bg))] bg-[rgb(var(--bg))]/20"
                    : "border-[rgb(var(--stroke))]"
                }`}
              >
                {polarizedOnly && <Check className="w-3 h-3 text-[rgb(var(--bg))]" />}
              </span>
            </button>
          </div>

          {/* Rango de Precio */}
          <div className="pt-2 border-t border-[rgb(var(--stroke))]">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-[rgb(var(--secondary))]">Precio máximo:</span>
              <span className="font-semibold text-[rgb(var(--fg))]">${maxPrice.toLocaleString("es-MX")} MXN</span>
            </div>
            <input
              type="range"
              min={1600}
              max={2600}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[rgb(var(--accent))] cursor-pointer"
            />
          </div>

          {/* Banner de Garantía */}
          <div className="p-4 bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] rounded-2xl text-xs text-[rgb(var(--secondary))] leading-relaxed space-y-1">
            <span className="block font-semibold text-[rgb(var(--fg))]">
              Envío y devolución gratuita
            </span>
            <p>Prueba tus lentes durante 30 días en casa sin compromiso alguno.</p>
          </div>
        </aside>

        {/* Grilla de Resultados */}
        <div className="lg:col-span-9">
          {/* Barra de conteo */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[rgb(var(--stroke))] text-xs">
            <div className="flex items-center gap-2 text-[rgb(var(--secondary))]">
              <span>
                Mostrando <strong className="text-[rgb(var(--fg))]">{filtered.length}</strong> modelos
              </span>
              {q && (
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] text-[rgb(var(--fg))] font-medium">
                  &ldquo;{q}&rdquo;
                  <button
                    type="button"
                    onClick={() => setQ("")}
                    className="hover:text-[rgb(var(--accent))] ml-1"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {collection && (
                <span className="bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] text-[rgb(var(--fg))] font-medium px-3 py-0.5 rounded-full text-xs">
                  {collection}
                </span>
              )}
              {material && (
                <span className="bg-[rgb(var(--card))] border border-[rgb(var(--stroke))] text-[rgb(var(--fg))] font-medium px-3 py-0.5 rounded-full text-xs">
                  {material}
                </span>
              )}
              {polarizedOnly && (
                <span className="bg-[rgb(var(--accent))] text-white font-medium px-3 py-0.5 rounded-full text-xs">
                  Polarizado HD
                </span>
              )}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="p-14 text-center rounded-3xl bg-[rgb(var(--card))] border border-[rgb(var(--stroke))]">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[rgb(var(--bg))] border border-[rgb(var(--stroke))] flex items-center justify-center text-[rgb(var(--secondary))]">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-[rgb(var(--fg))] mb-2 tracking-tight">
                No se encontraron modelos para &ldquo;{q || "los filtros aplicados"}&rdquo;
              </h3>
              <p className="text-xs text-[rgb(var(--secondary))] mb-6 max-w-md mx-auto leading-relaxed">
                Prueba con una de las siguientes sugerencias populares o restablece los filtros:
              </p>

              <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-lg mx-auto">
                {POPULAR_SEARCH_PILLS.map((pill) => (
                  <button
                    key={pill.label}
                    type="button"
                    onClick={() => {
                      setQ(pill.query);
                      setCollection("");
                      setMaterial("");
                      setPolarizedOnly(false);
                      setMaxPrice(2600);
                    }}
                    className="px-4 py-1.5 text-xs font-medium rounded-full border border-[rgb(var(--stroke))] bg-[rgb(var(--bg))] text-[rgb(var(--fg))] hover:border-[rgb(var(--fg))] transition-all"
                  >
                    Buscar {pill.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={resetFilters}
                className="btn-apple-primary text-xs px-6 py-2.5 rounded-full"
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  slug={product.slug}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  material={product.material}
                  lensColor={product.lensColor}
                  edition={product.edition}
                  polarized={product.polarized}
                  shape={product.shape}
                  refCode={product.ref}
                  sustainabilityBadge={product.sustainabilityBadge}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex items-center justify-center text-xs text-[rgb(var(--secondary))]">
          Cargando catálogo de lentes...
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
