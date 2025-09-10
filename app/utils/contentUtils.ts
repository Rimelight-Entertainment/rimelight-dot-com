import type { InlineNode, Mark, MarkType, TextNode } from "~/types/blocks";

/**
 * Represents the structured content of the editor, composed of TextNodes and InlineNodes.
 */
type Content = Array<TextNode | InlineNode>;

export const applyCharacterLimit = (
  content: Array<TextNode | InlineNode>,
  limit?: number, // This is correct
): { limitedContent: Array<TextNode | InlineNode>; newLength: number } => {
  let charCount = 0;
  const limitedContent: Array<TextNode | InlineNode> = [];

  for (const node of content) {
    const nodeLength = node.type === "text" ? node.text.length : 1;

    // Check if a limit is defined AND if adding the current node would exceed it
    const willExceedLimit =
      limit !== undefined && charCount + nodeLength > limit;

    if (!willExceedLimit) {
      // If there's no limit, or if we won't exceed it
      limitedContent.push(node);
      charCount += nodeLength;
    } else if (node.type === "text") {
      // If it's a text node and would exceed the limit, trim it
      // 'limit' is guaranteed to be a number here due to 'willExceedLimit' check
      const remaining = limit! - charCount; // Use non-null assertion (!) as 'limit' is confirmed to be a number
      if (remaining > 0) {
        limitedContent.push({
          ...node,
          text: node.text.substring(0, remaining),
        });
        charCount += remaining;
      }
      break; // Limit reached, no more content can be added
    } else {
      // If it's a non-text (inline) node and would exceed the limit, break
      break;
    }
  }
  return { limitedContent, newLength: charCount };
};

export const stringToTextNodeArray = (text: string): TextNode[] => {
  return [{ type: "text", text: text || "" }];
};

/**
 * Compares two arrays of marks for deep equality.
 * Marks are sorted by type to ensure consistent comparison order.
 */
export const areMarksEqual = (
  marks1: Mark[] | undefined = [],
  marks2: Mark[] | undefined = [],
): boolean => {
  const normalizedMarks1 = marks1 || [];
  const normalizedMarks2 = marks2 || [];

  if (normalizedMarks1.length !== normalizedMarks2.length) {
    return false;
  }

  // Sort marks to ensure consistent order for comparison
  // A canonical order for mark types (e.g., alphabetical) helps here
  const markOrder = ["mention", "link", "bold", "italic", "underline", "code"];
  const sortMarks = (a: Mark, b: Mark) =>
    markOrder.indexOf(a.type) - markOrder.indexOf(b.type);

  const sortedMarks1 = [...normalizedMarks1].sort(sortMarks);
  const sortedMarks2 = [...normalizedMarks2].sort(sortMarks);

  for (let i = 0; i < sortedMarks1.length; i++) {
    const m1 = sortedMarks1[i];
    const m2 = sortedMarks2[i];

    if (m1.type !== m2.type) return false;

    // Deep compare attrs if they exist.
    // For small, simple attribute objects, JSON. stringify might be acceptable here,
    // but for larger/complex attrs, a recursive deep comparison function would be more robust.
    // For now, given typical mark attrs, JSON. stringify is probably fine here
    // as it's only for the attrs of a single mark, not an array of marks.
    if (JSON.stringify(m1.attrs || {}) !== JSON.stringify(m2.attrs || {})) {
      return false;
    }
  }
  return true;
};

/**
 * Escapes HTML special characters in a string.
 */
const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const contentToHtml = (
  content: Array<TextNode | InlineNode>,
): string => {
  if (!Array.isArray(content) || content.length === 0) {
    return "";
  }

  const htmlParts: string[] = [];

  const order: MarkType[] = [
    "mention",
    "link",
    "bold",
    "italic",
    "underline",
    "code",
  ];
  const sortMarks = (a: Mark, b: Mark) =>
    order.indexOf(a.type) - order.indexOf(b.type);

  for (const node of content) {
    if (node.type === "text") {
      // Ensure node.text is always a string, coercing if necessary
      let textToRender = escapeHtml(String(node.text || ""));
      let openTags = "";
      let closeTags = "";

      const sortedMarks = node.marks ? [...node.marks].sort(sortMarks) : [];

      for (const mark of sortedMarks) {
        switch (mark.type) {
          case "bold":
            openTags += "<strong>";
            closeTags = `</strong>${closeTags}`;
            break;
          case "italic":
            openTags += "<em>";
            closeTags = `</em>${closeTags}`;
            break;
          case "underline":
            openTags += "<u>";
            closeTags = `</u>${closeTags}`;
            break;
          case "code":
            openTags += "<code>";
            closeTags = `</code>${closeTags}`;
            break;
          case "link": {
            // Explicitly coerce URL attribute to string, default to empty string
            const url = String(mark.attrs?.url || "");
            if (url) {
              // Only apply a link if URL is not an empty string
              const encodedUrl = encodeURI(url);
              openTags += `<a href="${encodedUrl}" target="_blank" rel="noopener noreferrer" class="text-rimelight-secondary-500 underline">`;
              closeTags = `</a>${closeTags}`;
            }
            break;
          }
          case "mention": {
            // Explicitly coerce mention attributes to strings, default to empty string
            const entryId = String(mark.attrs?.entryId || "");
            const entrySlug = String(mark.attrs?.entrySlug || "");
            const entryTitle = String(mark.attrs?.entryTitle || "");

            // Only apply mention if all required attributes are not empty strings
            if (entryId && entrySlug && entryTitle) {
              textToRender = escapeHtml(entryTitle); // Use escaped entryTitle for the display text
              openTags += `<a href="/${encodeURI(entrySlug)}" class="text-rimelight-primary-100 py-1 px-2 rounded bg-rimelight-primary-500" data-entry-id="${entryId}" data-entry-slug="${entrySlug}" data-entry-title="${escapeHtml(entryTitle)}">`;
              closeTags = `</a>${closeTags}`;
            }
            break;
          }
          default:
            break;
        }
      }
      htmlParts.push(`${openTags}${textToRender}${closeTags}`);
    } else if (node.type === "image") {
      // Explicitly coerce src and alt attributes to strings, default to empty string
      const src = String(node.attrs?.src || "");
      const alt = String(node.attrs?.alt || "");
      if (src) {
        // Only render image if src is not an empty string
        htmlParts.push(
          `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" />`,
        );
      }
    }
  }
  return htmlParts.join("");
};

export const htmlToContent = (html: string): Array<TextNode | InlineNode> => {
  const content: Array<TextNode | InlineNode> = [];
  if (!html) {
    return [{ type: "text", text: "" }];
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const body = doc.body;

  const getMarks = (element: HTMLElement): Mark[] => {
    const marks: Mark[] = [];
    if (element.tagName === "STRONG" || element.tagName === "B") {
      marks.push({ type: "bold" });
    }
    if (element.tagName === "EM" || element.tagName === "I") {
      marks.push({ type: "italic" });
    }
    if (element.tagName === "U") {
      marks.push({ type: "underline" });
    }
    if (element.tagName === "CODE") {
      marks.push({ type: "code" });
    }
    if (element.tagName === "A") {
      const url = element.getAttribute("href");
      const entryId = element.getAttribute("data-entry-id");
      const entrySlug = element.getAttribute("data-entry-slug");
      const entryTitle = element.getAttribute("data-entry-title");

      if (entryId && entrySlug && entryTitle) {
        const mentionMark: Mark = {
          type: "mention",
          attrs: { entryId, entrySlug, entryTitle },
        };
        marks.push(mentionMark);
      } else if (url) {
        const linkMark: Mark = { type: "link", attrs: { url } };
        marks.push(linkMark);
      }
    }
    return marks;
  };

  const traverseNodes = (node: Node, parentMarks: Mark[] = []) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      if (text.length > 0) {
        const mergedMarks = [...parentMarks];
        content.push({ type: "text", text, marks: mergedMarks });
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      const currentElementMarks = getMarks(element);
      const marksForChildren = [...parentMarks, ...currentElementMarks];

      if (element.tagName === "BR") {
        // Handle <br> tags by inserting a newline character as a text node
        content.push({ type: "text", text: "\n", marks: marksForChildren });
      } else if (element.tagName === "IMG") {
        const src = element.getAttribute("src");
        const alt = element.getAttribute("alt") || "";
        if (src) {
          content.push({ type: "image", attrs: { src, alt: alt || "" } });
        }
      } else {
        for (const child of element.childNodes) {
          traverseNodes(child, marksForChildren);
        }
      }
    }
  };

  for (const child of body.childNodes) {
    traverseNodes(child, []);
  }

  if (content.length === 0) {
    return [{ type: "text", text: "" }];
  }

  const mergedContent: Array<TextNode | InlineNode> = [];
  for (let i = 0; i < content.length; i++) {
    const currentNode = content[i];
    if (currentNode.type === "text" && mergedContent.length > 0) {
      const lastMergedNode = mergedContent[mergedContent.length - 1];
      if (
        lastMergedNode.type === "text" &&
        areMarksEqual(currentNode.marks, lastMergedNode.marks)
      ) {
        lastMergedNode.text += currentNode.text;
        continue;
      }
    }
    mergedContent.push(currentNode);
  }

  return mergedContent;
};

/**
 * A utility class to manage and manipulate rich text content represented as an array of TextNode and InlineNode objects.
 * This class provides methods for applying marks, inserting content, and managing selections
 * in an immutable fashion, always returning a new content array.
 */
export class RichTextContentEditor {
  private readonly content: Content;
  private readonly supportedMarks: MarkType[];

  constructor(initialContent: Content, supportedMarks: MarkType[]) {
    this.content = initialContent;
    this.supportedMarks = supportedMarks;
  }

  /**
   * Applies or toggles a mark to a specified range within the content.
   * For 'link' and 'mention' marks, existing marks of the same type are replaced.
   *
   * @param markType The type of mark to apply (e.g., 'strong', 'em', 'link', 'mention').
   * @param attrs Optional attributes for the mark (e.g., { url: '...' for 'link').
   * @param selectionStart The global start offset of the selection.
   * @param selectionEnd The global end offset of the selection.
   * @returns A new Content array with the mark applied.
   */
  public applyMark(
    markType: MarkType,
    attrs: Record<string, unknown> | undefined,
    selectionStart: number,
    selectionEnd: number,
  ): Content {
    if (!this.supportedMarks.includes(markType)) {
      return this.content;
    }

    if (
      selectionStart === selectionEnd &&
      markType !== "link" &&
      markType !== "mention"
    ) {
      // If no text is selected for non-link/mention marks, return content unchanged.
      return this.content;
    }

    const newContent: Content = [];
    let currentTextProcessed = 0;

    for (const node of this.content) {
      if (node.type === "text") {
        const nodeTextLength = node.text.length;
        const nodeGlobalStart = currentTextProcessed;
        const nodeGlobalEnd = currentTextProcessed + nodeTextLength;

        const overlapStart = Math.max(nodeGlobalStart, selectionStart);
        const overlapEnd = Math.min(nodeGlobalEnd, selectionEnd);

        if (overlapStart < overlapEnd) {
          // Text before the overlap
          if (overlapStart > nodeGlobalStart) {
            newContent.push({
              type: "text",
              text: node.text.substring(0, overlapStart - nodeGlobalStart),
              marks: node.marks ? [...node.marks] : [],
            });
          }

          // Text within the overlap
          const textInOverlap = node.text.substring(
            overlapStart - nodeGlobalStart,
            overlapEnd - nodeGlobalStart,
          );
          let updatedMarks: Mark[] = node.marks ? [...node.marks] : [];

          if (markType === "link" || markType === "mention") {
            // For links/mentions, remove existing links/mentions and add the new one if attrs exist
            updatedMarks = updatedMarks.filter(
              (m) => m.type !== "link" && m.type !== "mention",
            );
            if (attrs?.url || attrs?.entryId) {
              updatedMarks.push({ type: markType, attrs: attrs });
            }
          } else {
            // For other marks, toggle them
            const existingMarkIndex = updatedMarks.findIndex(
              (m) => m.type === markType,
            );
            if (existingMarkIndex !== -1) {
              updatedMarks.splice(existingMarkIndex, 1); // Remove existing mark
            } else {
              updatedMarks.push({ type: markType }); // Add new mark
            }
          }
          newContent.push({
            type: "text",
            text: textInOverlap,
            marks: updatedMarks,
          });

          // Text after the overlap
          if (overlapEnd < nodeGlobalEnd) {
            newContent.push({
              type: "text",
              text: node.text.substring(overlapEnd - nodeGlobalStart),
              marks: node.marks ? [...node.marks] : [],
            });
          }
        } else {
          // No overlap, push the node as is
          newContent.push(node);
        }
        currentTextProcessed += nodeTextLength;
      } else {
        // InlineNode (e.g., Image, Mention if treated as separate node rather than mark)
        // For now, InlineNodes are passed through as they don't have a text to mark.
        newContent.push(node);
        // Assuming InlineNode takes up 1 character for global offset calculation
        currentTextProcessed += 1;
      }
    }
    return newContent;
  }

  /**
   * Inserts new content into the existing content at a specified range.
   * Existing content within the range will be replaced.
   *
   * @param contentToInsert An array of TextNode | InlineNode to insert.
   * @param selectionStart The global start offset where content should be inserted/replaced.
   * @param selectionEnd The global end offset where content should be inserted/replaced.
   * @returns A new Content array with the new content inserted.
   */
  public insertContent(
    contentToInsert: Content,
    selectionStart: number,
    selectionEnd: number,
  ): Content {
    const newContent: Content = [];
    let charCount = 0;
    let inserted = false;

    for (const node of this.content) {
      if (node.type === "text") {
        const nodeLength = node.text.length;
        const nodeStart = charCount;
        const nodeEnd = charCount + nodeLength;

        // If the current text node overlaps with the selection range to be replaced
        const overlapStart = Math.max(nodeStart, selectionStart);
        const overlapEnd = Math.min(nodeEnd, selectionEnd);

        if (overlapStart < overlapEnd) {
          // Content before the overlap
          const textBefore = node.text.substring(0, overlapStart - nodeStart);
          if (textBefore.length > 0) {
            newContent.push({ ...node, text: textBefore });
          }

          // Insert pasted content if this is the first overlapping node
          if (
            !inserted &&
            selectionStart >= nodeStart &&
            selectionStart < nodeEnd
          ) {
            newContent.push(...contentToInsert);
            inserted = true;
          }

          // Content after the overlap
          const textAfter = node.text.substring(overlapEnd - nodeStart);
          if (textAfter.length > 0) {
            newContent.push({ ...node, text: textAfter });
          }
        } else {
          // No overlap, check if insertion point is before this node
          if (!inserted && selectionStart <= nodeStart) {
            newContent.push(...contentToInsert);
            inserted = true;
          }
          newContent.push(node); // Push original node if no overlap
        }
        charCount += nodeLength;
      } else {
        // Handle InlineNode
        if (!inserted && selectionStart === charCount) {
          newContent.push(...contentToInsert);
          inserted = true;
        }
        newContent.push(node);
        charCount += 1; // Inline nodes typically count as 1 character for caret position
      }
    }

    // If content was not inserted (e.g., selectionStart is at the very end or content was empty)
    if (!inserted) {
      newContent.push(...contentToInsert);
    }

    return newContent;
  }
}
