import React, { useEffect, useMemo, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { useColorMode, useThemeConfig } from "@docusaurus/theme-common";
import mermaid from "mermaid";

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
  const [svg, setSvg] = useState("");
  const [error, setError] = useState(null);

  const mermaidConfig = useMemo(
    () => getMermaidConfig(themeConfig, colorMode),
    [themeConfig, colorMode],
  );

  useEffect(() => {
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
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default function Mermaid(props) {
  return <BrowserOnly>{() => <MermaidDiagram {...props} />}</BrowserOnly>;
}
