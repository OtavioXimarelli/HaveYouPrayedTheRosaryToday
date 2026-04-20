// Feature flags for the Rosary app
export const FEATURE_FLAGS = {
  // Cursor glow effect that follows the mouse
  CURSOR_GLOW_ENABLED: process.env.NEXT_PUBLIC_CURSOR_GLOW_ENABLED !== 'false',
  
  // Magic Bento hover effects on dashboard cards
  MAGIC_BENTO_ENABLED: process.env.NEXT_PUBLIC_MAGIC_BENTO_ENABLED !== 'false',
  
  // Theme persistence across sessions
  THEME_PERSISTENCE_ENABLED: process.env.NEXT_PUBLIC_THEME_PERSISTENCE_ENABLED !== 'false',
} as const;
