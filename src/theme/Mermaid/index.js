import BrowserOnly from "@docusaurus/BrowserOnly";
import { useColorMode, useThemeConfig } from "@docusaurus/theme-common";
import mermaid from "mermaid";
import React from "react";

import styles from "./styles.module.css";

const MermaidContainerClassName = "docusaurus-mermaid-container";

function getMermaidConfig(themeConfig, colorMode) {
  const mermaidThemeConfig = themeConfig.mermaid ?? {};
  const configuredTheme = mermaidThemeConfig.theme ?? {};

  return {
    startOnLoad: false,
    ...(mermaidThemeConfig.options ?? {}),
    theme:
      configuredTheme[colorMode] ?? (colorMode === "dark" ? "dark" : "default"),
  };
}

function MermaidDiagram({ value }) {
  const { colorMode } = useColorMode();
  const themeConfig = useThemeConfig();
  const [svg, setSvg] = React.useState("");
  const [error, setError] = React.useState(null);

  const mermaidConfig = React.useMemo(
    () => getMermaidConfig(themeConfig, colorMode),
    [themeConfig, colorMode],
  );

  React.useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      setSvg("");
      setError(null);
      mermaid.mermaidAPI.initialize(mermaidConfig);

      const mermaidId = `mermaid-svg-${Math.round(Math.random() * 10000000)}`;
      const rendered = await mermaid.render(mermaidId, value);
      const renderedSvg =
        typeof rendered === "string" ? rendered : rendered.svg;

      if (!cancelled) {
        setSvg(renderedSvg);
      }
    }

    renderDiagram().catch((renderError) => {
      if (!cancelled) {
        setError(renderError);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [value, mermaidConfig]);

  if (error) {
    return (
      <pre className={styles.error}>
        <code>{error.message}</code>
      </pre>
    );
  }

  return (
    <div
      className={`${MermaidContainerClassName} ${styles.container}`}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Mermaid renders SVG markup that needs to be mounted into the page.
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default function Mermaid(props) {
  return <BrowserOnly>{() => <MermaidDiagram {...props} />}</BrowserOnly>;
}
