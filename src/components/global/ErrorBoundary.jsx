import React from "react";

/* Barrière d'erreur : isole un sous-arbre pour qu'un crash (ex. BotWidget, la
   fenêtre OS…) NE fasse PAS tomber toute la page. Par défaut, un widget qui
   plante disparaît silencieusement (fallback = null) ; on peut passer un
   `fallback` custom pour le contenu principal. Les error boundaries DOIVENT
   être des composants classe. */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log uniquement (pas de service tiers) — visible en dev/console.
    try { console.error(`[ErrorBoundary${this.props.name ? ` ${this.props.name}` : ""}]`, error, info?.componentStack); } catch {}
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}
