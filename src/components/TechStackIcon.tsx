export type TechStackIconKey =
  | "react"
  | "nextjs"
  | "typescript"
  | "javascript"
  | "scss"
  | "html5"
  | "supabase"
  | "postgresql"
  | "openai"
  | "deno"
  | "github"
  | "figma"
  | "unity"
  | "unreal"
  | "cpp"
  | "csharp";

interface TechStackIconProps {
  name: TechStackIconKey;
  size?: number;
}

/**
 * 
 * @param param0 
 * @returns 
 */
export function TechStackIcon({ name, size = 15 }: TechStackIconProps) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
  };

  switch (name) {
    case "react":
      return (
        <svg
          {...commonProps}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4.2"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="4.2"
            transform="rotate(120 12 12)"
          />
        </svg>
      );

    case "nextjs":
      return (
        <svg {...commonProps}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.82 0 3.53-.49 5-1.34L9.2 9.8V16H7.7V8h1.5l7.95 11.1A9.96 9.96 0 0 0 22 12c0-5.52-4.48-10-10-10zm4.3 11.4-1.5-2.1V8h1.5v5.4z" />
        </svg>
      );

    case "typescript":
      return (
        <svg {...commonProps}>
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M6.5 10.5H12v1.6H10.1V18H8.3v-5.9H6.5v-1.6zm10.8 1.3c-.6-.4-1.3-.6-2-.6-.9 0-1.4.4-1.4.9 0 .6.6.8 1.6 1.2 1.5.5 2.4 1.2 2.4 2.5 0 1.6-1.3 2.5-3.2 2.5-1.1 0-2.1-.3-2.8-.8l.7-1.4c.6.4 1.4.7 2.1.7.9 0 1.4-.4 1.4-.9 0-.6-.5-.9-1.6-1.3-1.5-.5-2.3-1.2-2.3-2.4 0-1.5 1.2-2.5 3.1-2.5 1 0 1.9.2 2.6.6l-.6 1.4z" />
        </svg>
      );

    case "javascript":
      return (
        <svg {...commonProps}>
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M10.5 15.2c0 1.8-1 2.8-2.7 2.8-1.1 0-2-.5-2.4-1.3l1.4-.9c.2.4.5.7 1 .7.6 0 .9-.3.9-1.1V10h1.8v5.2zm7.2.4c0 1.5-1.2 2.4-3.1 2.4-1.2 0-2.2-.4-2.8-1.1l1.2-1.2c.5.5 1 .8 1.7.8.7 0 1.2-.3 1.2-.8 0-.5-.4-.7-1.4-1.1-1.4-.5-2.2-1.1-2.2-2.3 0-1.4 1.1-2.4 2.9-2.4 1 0 1.9.3 2.5.8l-1 1.2c-.5-.4-1-.6-1.5-.6-.7 0-1.1.3-1.1.7 0 .5.4.7 1.4 1.1 1.4.5 2.2 1.1 2.2 2.5z" />
        </svg>
      );

    case "scss":
      return (
        <svg {...commonProps}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.1 14.3c-1.5 0-2.7-.5-3.4-1.3l1.2-1.2c.6.6 1.3.9 2.2.9.9 0 1.4-.4 1.4-.9 0-.6-.5-.8-1.7-1.2-1.6-.5-2.5-1.2-2.5-2.5 0-1.5 1.3-2.5 3.1-2.5 1.2 0 2.2.4 2.9 1l-1.1 1.2c-.5-.4-1.1-.7-1.8-.7-.8 0-1.3.3-1.3.8 0 .5.5.8 1.7 1.2 1.6.5 2.5 1.2 2.5 2.6 0 1.5-1.3 2.6-3.2 2.6z" />
        </svg>
      );

    case "html5":
      return (
        <svg {...commonProps}>
          <path d="M4 3h16l-1.5 16.2L12 21l-6.5-1.8L4 3zm12.3 5.2H7.7l.2 2.3h8.2l-.6 6.2-3.5 1-3.5-1-.2-2.5h2.1l.1 1.2 1.5.4 1.5-.4.2-2.5H7.5L7 6.1h9.5l-.2 2.1z" />
        </svg>
      );

    case "supabase":
      return (
        <svg {...commonProps}>
          <path d="M13.5 2L4.2 13.8h7.3L10.5 22l9.3-11.8h-7.3L13.5 2z" />
        </svg>
      );

    case "postgresql":
      return (
        <svg
          {...commonProps}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
          <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
        </svg>
      );

    case "openai":
      return (
        <svg
          {...commonProps}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      );

    case "deno":
      return (
        <svg {...commonProps}>
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49l-.34-4.49c-1.5-.8-2.5-2.3-2.5-4 0-2.5 2-4.5 4.5-4.5h3.5c1.1 0 2 .9 2 2v1.5h-2.5V15H16v6.16c3.45-1.53 6-4.96 6-9.16 0-5.52-4.48-10-10-10zm1.5 7.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
      );

    case "github":
      return (
        <svg {...commonProps}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      );

    case "figma":
      return (
        <svg
          {...commonProps}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M8.5 3h3.5v6H8.5a3 3 0 010-6zM12 3h3.5a3 3 0 010 6H12V3zM12 9h3.5a3 3 0 010 6H12V9zM8.5 9H12v6H8.5a3 3 0 010-6zM8.5 15H12v3a3 3 0 11-3.5-3z" />
        </svg>
      );

    case "unity":
      return (
        <svg {...commonProps}>
          <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm0 2.3l6.2 3.6-2.4 1.4-3.8-2.2-3.8 2.2-2.4-1.4L12 4.3zm-6.5 5.4l2.4 1.4v4.4l-2.4 1.4V9.7zm6.5 10l-6.2-3.6 2.4-1.4 3.8 2.2 3.8-2.2 2.4 1.4L12 19.7zm6.5-2.8l-2.4-1.4v-4.4l2.4-1.4v7.2z" />
        </svg>
      );

    case "unreal":
      return (
        <svg {...commonProps}>
          <circle
            cx="12"
            cy="12"
            r="9.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="M9 8v5.5c0 1.4.9 2.3 2.2 2.3.8 0 1.5-.4 1.8-1V8h1.8v7.5h-1.6l-.2-.9c-.6.7-1.4 1.1-2.4 1.1-2 0-3.4-1.4-3.4-3.6V8H9z" />
        </svg>
      );

    case "cpp":
    case "csharp":
      return (
        <svg
          {...commonProps}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" />
          <path d="M11.5 9.5a3 3 0 100 5M15 10.5v3M13.5 12h3" />
        </svg>
      );

    default:
      return null;
  }
}
