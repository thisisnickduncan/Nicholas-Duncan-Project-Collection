export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  window.localStorage.setItem(STORAGE_KEY, theme);
}

/**
 * Inlined into a blocking <script> in app/layout.tsx so the correct theme
 * class is set before first paint — avoids a flash of the wrong theme that
 * a useEffect-based approach can't prevent.
 */
export const noFlashThemeScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`;
