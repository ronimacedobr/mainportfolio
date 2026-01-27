(() => {
  const getValue = (source, path) => {
    if (!source || !path) {
      return null;
    }

    return path.split(".").reduce((acc, key) => {
      if (acc == null) {
        return null;
      }
      const index = Number.parseInt(key, 10);
      if (!Number.isNaN(index) && String(index) === key) {
        return acc[index];
      }
      return acc[key];
    }, source);
  };

  const applyText = (project) => {
    document.querySelectorAll("[data-project-text]").forEach((el) => {
      const path = el.getAttribute("data-project-text");
      const value = getValue(project, path);
      if (typeof value === "string") {
        el.textContent = value;
      }
    });
  };

  const applySrc = (project) => {
    document.querySelectorAll("[data-project-src]").forEach((el) => {
      const path = el.getAttribute("data-project-src");
      const value = getValue(project, path);
      if (typeof value === "string") {
        el.setAttribute("src", value);
      }

      const typePath = el.getAttribute("data-project-type");
      const typeValue = getValue(project, typePath);
      if (typeof typeValue === "string") {
        el.setAttribute("type", typeValue);
      }
    });
  };

  const applyAlt = (project) => {
    document.querySelectorAll("[data-project-alt]").forEach((el) => {
      const path = el.getAttribute("data-project-alt");
      const value = getValue(project, path);
      if (typeof value === "string") {
        el.setAttribute("alt", value);
      }
    });
  };

  const applyHref = (project) => {
    document.querySelectorAll("[data-project-href]").forEach((el) => {
      const path = el.getAttribute("data-project-href");
      const value = getValue(project, path);
      if (typeof value === "string") {
        el.setAttribute("href", value);
      }
    });
  };

  const loadProject = async () => {
    const projectId = document.body.getAttribute("data-project-id");
    if (!projectId) {
      return;
    }

    try {
      const response = await fetch("data/projects.json");
      if (!response.ok) {
        return;
      }

      const data = await response.json();
      const project = (data.projects || []).find((item) => item.id === projectId);
      if (!project) {
        return;
      }

      applyText(project);
      applySrc(project);
      applyAlt(project);
      applyHref(project);
    } catch (error) {
      console.warn("Project data failed to load", error);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadProject);
  } else {
    loadProject();
  }
})();
