import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import App from "./App.jsx";
import { NAV, GROUP_IDS, ALL_IDS, parseHash } from "./nav.js";

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

  it("liste les catégories", () => {
    render(<App />);
    for (const name of ["Frontend", "Backend", "DevOps", "Documentation & méthode", "IA & agents"]) {
      expect(screen.getByRole("button", { name: new RegExp(name, "i") })).toBeInTheDocument();
    }
  });

  it("une entrée de navigation par groupe (= page), catégories dépliées", async () => {
    const user = userEvent.setup();
    render(<App />);
    await expandAllCategories(user);
    // 1 bouton Accueil + 1 bouton par groupe
    expect(navButtons().length).toBe(GROUP_IDS.length + 1);
  });

  it("plie / déplie une catégorie et montre ses groupes", async () => {
    const user = userEvent.setup();
    render(<App />);
    const devops = screen.getByRole("button", { name: /^DevOps/i });
    expect(devops).toHaveAttribute("aria-expanded", "false");
    await user.click(devops);
    expect(devops).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: /^Docker/ })).toBeInTheDocument();
  });
});

describe("App — navigation SPA", () => {
  it("ouvre la page d'un groupe et pose son hash au clic", async () => {
    const user = userEvent.setup();
    render(<App />);
    await expandAllCategories(user);
    const main = document.querySelector("main");

    await user.click(screen.getByRole("button", { name: /^Docker/ }));
    expect(
      await within(main).findByRole("heading", { level: 1, name: "Docker" })
    ).toBeInTheDocument();
    expect(window.location.hash).toBe("#docker");
  });

  it("un sous-élément est une ancre de la page de groupe", async () => {
    const user = userEvent.setup();
    render(<App />);
    await expandAllCategories(user);
    const main = document.querySelector("main");

    await user.click(screen.getByRole("button", { name: /^Docker/ }));
    // le sous-élément n'apparaît qu'une fois la page du groupe active
    const anchor = await screen.findByRole("button", { name: "Le Dockerfile" });
    await user.click(anchor);

    expect(window.location.hash).toBe("#docker/docker-dockerfile");
    expect(document.getElementById("docker-dockerfile")).toBeInTheDocument();
    expect(
      await within(main).findByRole("heading", { level: 2, name: "Le Dockerfile" })
    ).toBeInTheDocument();
  });

  it("ouvre la bonne page depuis un lien profond hérité (#section)", async () => {
    window.location.hash = "#uml-class-diagram";
    render(<App />);
    const main = document.querySelector("main");
    expect(
      await within(main).findByRole("heading", { level: 1, name: /Modélisation UML/ })
    ).toBeInTheDocument();
    expect(
      await within(main).findByRole("heading", { name: /Diagramme de classes/ })
    ).toBeInTheDocument();
    await waitFor(() =>
      expect(window.location.hash).toBe("#modelisation-uml/uml-class-diagram")
    );
  });

  it("rend chaque page de groupe sans planter", async () => {
    const user = userEvent.setup();
    render(<App />);
    await expandAllCategories(user);
    const main = document.querySelector("main");

    for (const btn of navButtons()) {
      if (btn.classList.contains("nav__home")) continue;
      const label = btn.textContent;
      await user.click(btn);
      const h2s = await within(main).findAllByRole("heading", { level: 2 });
      expect(h2s.length, `pas de section visible sur « ${label} »`).toBeGreaterThan(0);
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
    expect(results.querySelectorAll(".nav__result").length).toBeGreaterThanOrEqual(2);
  });

  it("un résultat de recherche ouvre la page, scrolle vers la section et vide le champ", async () => {
    const user = userEvent.setup();
    render(<App />);
    const input = screen.getByRole("searchbox", { name: /rechercher/i });
    await user.click(input);
    await user.type(input, "dockerfile");

    const results = await screen.findByLabelText("Résultats de recherche");
    await user.click(await within(results).findByText("Le Dockerfile"));

    const main = document.querySelector("main");
    expect(
      await within(main).findByRole("heading", { level: 2, name: "Le Dockerfile" })
    ).toBeInTheDocument();
    expect(window.location.hash).toBe("#docker/docker-dockerfile");
    expect(input).toHaveValue("");
  });
});

describe("nav.js", () => {
  it("chaque section a un id unique et un composant résolu", () => {
    expect(new Set(ALL_IDS).size).toBe(ALL_IDS.length);
    for (const cat of NAV) {
      for (const group of cat.groups) {
        for (const item of group.items) {
          expect(item.Component, item.id).toBeTruthy();
        }
      }
    }
  });

  it("chaque groupe a un id d'ancre unique", () => {
    expect(new Set(GROUP_IDS).size).toBe(GROUP_IDS.length);
    for (const cat of NAV) {
      for (const group of cat.groups) {
        expect(typeof group.id, group.group).toBe("string");
        expect(group.id.length).toBeGreaterThan(0);
      }
    }
  });

  it("parseHash résout les 3 formes d'URL", () => {
    expect(parseHash("")).toEqual({ groupId: "home", itemId: null });
    expect(parseHash("#docker")).toEqual({ groupId: "docker", itemId: null });
    expect(parseHash("#docker/docker-dockerfile")).toEqual({
      groupId: "docker",
      itemId: "docker-dockerfile",
    });
    // lien profond hérité : l'item seul renvoie vers sa page de groupe
    expect(parseHash("#docker-dockerfile")).toEqual({
      groupId: "docker",
      itemId: "docker-dockerfile",
    });
  });
});
