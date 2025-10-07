import { runHighlighterWithAstro } from "@astrojs/prism/dist/highlighter";
import { unescapeHTML } from "astro/runtime/server/index.js";
import { Markdoc } from "../config.js";
function prism() {
  return {
    nodes: {
      fence: {
        attributes: Markdoc.nodes.fence.attributes,
        transform({ attributes: { language, content } }) {
          const { html, classLanguage } = runHighlighterWithAstro(language, content);
          return unescapeHTML(
            `<pre class="${classLanguage}"><code class="${classLanguage}">${html}</code></pre>`
          );
        }
      }
    }
  };
}
export {
  prism as default
};
