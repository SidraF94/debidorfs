import React, { useEffect, useRef, useState } from "react";

const heroNameSrc = `${import.meta.env.BASE_URL}debora-dorfschmidt%20(1).svg`;

function createMediaItems(prefix, count, label, type = "image") {
  const extension = type === "video" ? "mp4" : "png";

  return Array.from({ length: count }, (_, index) => ({
    type,
    src: `${import.meta.env.BASE_URL}${prefix}${index + 1}.${extension}`,
    label: `${label} ${String(index + 1).padStart(2, "0")}`,
    alt: `${label} ${index + 1}`,
  }));
}

const skills = [
  {
    id: "redes-sociales",
    number: "01",
    title: "Redes sociales",
    description: "Contenido visual · Comunicación digital",
    media: createMediaItems("rrss", 5, "Pieza para redes"),
  },
  {
    id: "animacion",
    number: "02",
    title: "Animación",
    description: "Motion graphics · Animación 2D",
    media: createMediaItems("anim", 3, "Animación", "video"),
  },
  {
    id: "editorial-packaging",
    number: "03",
    title: "Diseño editorial y packaging",
    description: "Publicaciones · Diseño de envases",
    media: createMediaItems("editpack", 4, "Diseño editorial y packaging"),
  },
  {
    id: "fotografia-producto",
    number: "04",
    title: "Fotografía de producto",
    description: "Fotografía · Dirección de arte",
    media: createMediaItems("prod", 4, "Fotografía de producto"),
  },
  {
    id: "fotografia-retrato",
    number: "05",
    title: "Fotografía de retrato",
    description: "Retrato · Fotografía",
    media: createMediaItems("retra", 6, "Fotografía de retrato"),
  },
  {
    id: "branding",
    number: "06",
    title: "Branding",
    description: "Identidad visual · Sistema de marca",
    media: createMediaItems("bran", 13, "Aplicación de identidad"),
  },
  {
    id: "senaletica",
    number: "07",
    title: "Diseño de señalética",
    description: "Sistemas de orientación · Identidad espacial",
    media: createMediaItems("sen", 5, "Diseño de señalética"),
  },
];

function MediaTile({ item, index }) {
  const [failed, setFailed] = useState(false);
  const hasSource = item.src && !failed;

  return (
    <figure className="media-tile">
      {hasSource && item.type === "video" ? (
        <video
          controls
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          src={item.src}
          aria-label={item.label}
          onError={() => setFailed(true)}
        />
      ) : hasSource ? (
        <img
          src={item.src}
          alt={item.alt || item.label}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className={`media-placeholder media-placeholder--${item.type}`}
          role="img"
          aria-label={`${item.label}: no se pudo cargar el archivo`}
        >
          <span className="placeholder-index">{String(index + 1).padStart(2, "0")}</span>
          {item.type === "video" && (
            <span className="play-icon" aria-hidden="true">
              ▶
            </span>
          )}
          <span className="placeholder-note">
            ARCHIVO NO DISPONIBLE
          </span>
        </div>
      )}
    </figure>
  );
}

function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      className="project-dialog"
      ref={dialogRef}
      aria-labelledby="dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="dialog-content">
        <header className="dialog-header">
          <div>
            <p className="eyebrow">ÁREA {project.number}</p>
            <h2 id="dialog-title">{project.title}</h2>
            <p className="project-description">{project.description}</p>
          </div>
          <button
            className="close-button"
            type="button"
            onClick={onClose}
            aria-label="Cerrar área"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>
        <div className="media-grid">
          {project.media.map((item, index) => (
            <MediaTile key={`${project.id}-${index}`} item={item} index={index} />
          ))}
        </div>
        <p className="gallery-note">
          Una selección de imágenes y videos de esta área.
        </p>
      </div>
    </dialog>
  );
}

export default function App() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <main>
      <div className="page-shell">
        <header className="topbar">
          <a className="top-contact" href="#contacto">
            Contacto <span aria-hidden="true">↗</span>
          </a>
        </header>

        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <h1 className="visually-hidden" id="hero-title">
            Portfolio de diseño de Débora Dorfschmidt
          </h1>
          <div
            className="name-frame"
            aria-hidden="true"
            style={{ "--hero-name-mask": `url("${heroNameSrc}")` }}
          >
            <img
              className="hero-name"
              src={heroNameSrc}
              alt=""
            />
            <span className="name-metallic" />
          </div>
          <div className="hero-bottom">
            <a className="scroll-link" href="#trabajos">
              EXPLORAR TRABAJOS <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section className="work-section" id="trabajos" aria-labelledby="work-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">LO QUE HAGO</p>
              <h2 id="work-title">Áreas de trabajo</h2>
            </div>
            <p className="section-aside">Explorá cada área y sus proyectos.</p>
          </div>
          <div className="project-list">
            {skills.map((project) => (
              <button
                className={`project-card project-card--${project.id}`}
                key={project.id}
                type="button"
                onClick={() => setActiveProject(project)}
                aria-haspopup="dialog"
              >
                <span className="project-number">{project.number}</span>
                <span className="project-card-title">{project.title}</span>
                <span className="project-card-description">
                  {project.description}
                </span>
                <span className="project-open" aria-hidden="true">
                  ↗
                </span>
              </button>
            ))}
          </div>
        </section>

        <footer className="contact-section" id="contacto">
          <div>
            <p className="eyebrow">¿TENÉS UN PROYECTO EN MENTE?</p>
            <h2>Hablemos.</h2>
          </div>
          <address className="contact-links">
            <a href="mailto:dorfschmidt.debora08@gmail.com">
              dorfschmidt.debora08@gmail.com
            </a>
            <a href="tel:+595985934169">+595 985 934169</a>
          </address>
        </footer>
      </div>
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </main>
  );
}
