import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import App from "./App.jsx";
import { NAV, ALL_IDS } from "./nav.js";

beforeEach(() => {
  window.location.hash = "";
});

async function expandAllCategories(user) {
  for (const toggle of document.querySelectorAll(".nav__cat-toggle")) {
    if (toggle.getAttribute("aria-expanded") !== "true") {
      await user.click(toggle);
    }
  }
}

function navButtons() {
  return Array.from(document.querySelectorAll(".nav__btn"));
}

describe("App — structure", () => {
  it("affiche la marque, sans vue d'ensemble", async () => {
    render(<App />);
    expect(screen.getByText("Holberton")).toBeInTheDocument();
    expect(screen.queryByText("Vue d'ensemble")).not.toBeInTheDocument();
    expect(screen.queryByText("Récap de la semaine")).not.toBeInTheDocument();
  });

  it("ouvre la page d'accueil par défaut, avec le lien du dépôt", async () => {
    render(<App />);
    const main = document.querySelector("main");
    expect(
      await within(main).findByRole("heading", { name: /Holberton — Spécialisation Full Stack/i })
    ).toBeInTheDocument();
    const link = within(main).getByRole("link", {
      name: /tomvieilledent\/holberton-spe-fullstack/,
    });
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/tomvieilledent/holberton-spe-fullstack"
    );
    expect(screen.getByRole("button", { name: /^Accueil/ })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("liste les 5 catégories", () => {
    render(<App />);
    for (const name of ["Frontend", "Backend", "DevOps", "Documentation & méthode", "IA & agents"]) {
      expect(screen.getByRole("button", { name: new RegExp(name, "i") })).toBeInTheDocument();
    }
  });

  it("une entrée de navigation par section, catégories dépliées", async () => {
    const user = userEvent.setup();
    render(<App />);
    await expandAllCategories(user);
    expect(navButtons().length).toBe(ALL_IDS.length);
  });

  it("plie / déplie une catégorie", async () => {
    const user = userEvent.setup();
    render(<App />);
    const devops = screen.getByRole("button", { name: /^DevOps/i });
    expect(devops).toHaveAttribute("aria-expanded", "false");
    await user.click(devops);
    expect(devops).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "Le Dockerfile" })).toBeInTheDocument();
  });
});

describe("App — navigation SPA", () => {
  it("change la section et le hash au clic", async () => {
    const user = userEvent.setup();
    render(<App />);
    await expandAllCategories(user);
    const main = document.querySelector("main");

    await user.click(screen.getByRole("button", { name: "Le Dockerfile" }));
    expect(
      await within(main).findByRole("heading", { name: /Dockerfile/ })
    ).toBeInTheDocument();
    expect(window.location.hash).toBe("#docker-dockerfile");
  });

  it("ouvre une section depuis le hash de l'URL (et déplie sa catégorie)", async () => {
    window.location.hash = "#uml-class-diagram";
    render(<App />);
    const main = document.querySelector("main");
    expect(
      await within(main).findByRole("heading", { name: /Diagramme de classes/ })
    ).toBeInTheDocument();
  });

  it("rend chaque section sans planter", async () => {
    const user = userEvent.setup();
    render(<App />);
    await expandAllCategories(user);
    const main = document.querySelector("main");

    for (const btn of navButtons()) {
      const label = btn.textContent;
      await user.click(btn);
      const h2 = await within(main).findByRole("heading", { level: 2 });
      expect(h2, `pas de titre visible après « ${label} »`).toBeInTheDocument();
    }
  });
});

describe("App — recherche", () => {
  it("« uml » propose les sections qui en parlent", async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByRole("searchbox", { name: /rechercher/i });

    await user.click(input);
    await user.type(input, "uml");

    const results = await screen.findByLabelText("Résultats de recherche");
    await waitFor(() => {
      expect(within(results).getByText("Diagramme de classes")).toBeInTheDocument();
    });
    // au moins deux sections mentionnent UML
    expect(results.querySelectorAll(".nav__result").length).toBeGreaterThanOrEqual(2);
  });

  it("un résultat de recherche ouvre la section et vide le champ", async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByRole("searchbox", { name: /rechercher/i });
    await user.click(input);
    await user.type(input, "dockerfile");

    const results = await screen.findByLabelText("Résultats de recherche");
    await user.click(await within(results).findByText("Le Dockerfile"));

    const main = document.querySelector("main");
    expect(
      await within(main).findByRole("heading", { name: /Dockerfile/ })
    ).toBeInTheDocument();
    expect(input).toHaveValue("");
  });
});

describe("nav.js", () => {
  it("chaque section a un id unique et un composant résolu", () => {
    const ids = ALL_IDS;
    expect(new Set(ids).size).toBe(ids.length);
    for (const cat of NAV) {
      for (const group of cat.groups) {
        for (const item of group.items) {
          expect(item.Component, item.id).toBeTruthy();
        }
      }
    }
  });
});
