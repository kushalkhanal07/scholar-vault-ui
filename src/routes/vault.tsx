import { createFileRoute } from "@tanstack/react-router";
import {
  Folder,
  FileText,
  Image as ImageIcon,
  Film,
  ChevronRight,
  Upload,
  Search,
  Grid3x3,
  List,
  MoreVertical,
  Star,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/vault")({
  component: VaultPage,
});

const folders = [
  { name: "Mathematics", count: 42, color: "from-indigo-400 to-purple-500" },
  { name: "Physics", count: 31, color: "from-cyan-400 to-blue-500" },
  { name: "Chemistry", count: 27, color: "from-emerald-400 to-teal-500" },
  { name: "Biology", count: 19, color: "from-pink-400 to-rose-500" },
  { name: "Computer Science", count: 56, color: "from-amber-400 to-orange-500" },
  { name: "History", count: 14, color: "from-violet-400 to-fuchsia-500" },
];

const files = [
  { name: "Eigenvectors Notes.pdf", type: "pdf", size: "2.4 MB", time: "2h", starred: true },
  { name: "Wave Equations.md", type: "doc", size: "12 KB", time: "Yesterday", starred: false },
  { name: "Periodic Table.png", type: "image", size: "1.1 MB", time: "3d", starred: true },
  { name: "Cell Division Lecture.mp4", type: "video", size: "82 MB", time: "1w", starred: false },
  { name: "Algorithms.pdf", type: "pdf", size: "5.6 MB", time: "1w", starred: false },
  { name: "Mind Map - WW2.png", type: "image", size: "780 KB", time: "2w", starred: false },
];

const iconFor = (t: string) =>
  t === "image" ? ImageIcon : t === "video" ? Film : FileText;

function VaultPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground gap-1.5">
        <span className="hover:text-foreground cursor-pointer">Vault</span>
        <ChevronRight className="size-3.5" />
        <span className="hover:text-foreground cursor-pointer">Year 2</span>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground font-medium">Semester 4</span>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="flex-1 flex items-center gap-2 glass rounded-xl px-3.5 py-2.5">
          <Search className="size-4 text-muted-foreground" />
          <input
            placeholder="Search files and folders…"
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center glass rounded-xl p-1">
            <button
              onClick={() => setView("grid")}
              className={`p-1.5 rounded-lg transition-colors ${view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              <Grid3x3 className="size-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-1.5 rounded-lg transition-colors ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              <List className="size-4" />
            </button>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-xl gradient-primary text-primary-foreground px-3.5 py-2 text-sm font-medium shadow-soft hover:shadow-elegant transition-shadow">
            <Upload className="size-4" /> Upload
          </button>
        </div>
      </div>

      {/* Drop area */}
      <div className="rounded-2xl border-2 border-dashed border-border hover:border-primary/60 transition-colors p-8 text-center bg-accent/30">
        <div className="size-12 mx-auto rounded-2xl gradient-soft grid place-items-center text-primary mb-3">
          <Upload className="size-5" />
        </div>
        <p className="text-sm font-medium">Drag & drop files here</p>
        <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, MP4, images — up to 200 MB</p>
      </div>

      {/* Folders */}
      <div>
        <h3 className="text-sm font-semibold tracking-tight mb-3">Folders</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {folders.map((f) => (
            <div
              key={f.name}
              className="glass rounded-2xl p-4 hover-lift cursor-pointer group"
            >
              <div className={`size-10 rounded-xl bg-gradient-to-br ${f.color} grid place-items-center text-white shadow-soft mb-3`}>
                <Folder className="size-5" />
              </div>
              <p className="text-sm font-medium truncate">{f.name}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{f.count} items</p>
            </div>
          ))}
        </div>
      </div>

      {/* Files */}
      <div>
        <h3 className="text-sm font-semibold tracking-tight mb-3">Recent files</h3>
        {view === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {files.map((f) => {
              const Icon = iconFor(f.type);
              return (
                <div key={f.name} className="glass rounded-2xl p-4 hover-lift group relative">
                  <button className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-muted">
                    <MoreVertical className="size-4" />
                  </button>
                  <div className="aspect-video rounded-xl gradient-soft grid place-items-center mb-3 text-primary">
                    <Icon className="size-8" />
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium truncate flex-1">{f.name}</p>
                    {f.starred && <Star className="size-3.5 fill-warning text-warning shrink-0" />}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{f.size} • {f.time}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass rounded-2xl divide-y divide-border overflow-hidden">
            {files.map((f) => {
              const Icon = iconFor(f.type);
              return (
                <div key={f.name} className="flex items-center gap-3 p-3.5 hover:bg-accent/60 transition-colors">
                  <div className="size-9 rounded-lg gradient-soft grid place-items-center text-primary">
                    <Icon className="size-4" />
                  </div>
                  <p className="flex-1 text-sm font-medium truncate">{f.name}</p>
                  {f.starred && <Star className="size-3.5 fill-warning text-warning" />}
                  <p className="text-xs text-muted-foreground w-20">{f.size}</p>
                  <p className="text-xs text-muted-foreground w-20">{f.time}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
