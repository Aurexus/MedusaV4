// (function(){
//   const style = document.createElement('style');
//   style.textContent = `
//     mark.hl {
//       background-color: yellow;
//       color: inherit;
//     }
//     .editable-content {
//       white-space: pre-wrap;
//       outline: none;
//     }
//   `;
//   document.head.appendChild(style);
// })();

// // --- Main logic ---
// document.addEventListener('DOMContentLoaded', () => {
//   const commentBox = document.getElementById('commentBox');
//   const ids = ['textBrut', 'notice'];
//   let highlightedSelections = []; // { field, text }

//   // helper
//   function escapeRegExp(string) {
//     return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//   }

//   // attach handlers
//   ids.forEach(id => {
//     const el = document.getElementById(id);
//     if (!el) return;
//     el.addEventListener('mouseup', () => handleTextSelection(id));
//     el.addEventListener('keyup', (e) => {
//       if (e.key === 'Enter') handleTextSelection(id);
//     });
//   });

//   // --- Main handler ---
//   function handleTextSelection(fieldId) {
//     const selection = window.getSelection();
//     const selectedText = selection.toString().trim();
//     if (!selectedText) return;

//     const fieldEl = document.getElementById(fieldId);
//     if (!fieldEl) return;

//     const range = selection.getRangeAt(0);
//     let container = range.commonAncestorContainer;
//     if (container.nodeType === 3) container = container.parentNode;

//     // ✅ If selection is inside existing highlight, check if it’s the full highlight → remove
//     const insideMark = container.closest && container.closest('mark.hl');
//     if (insideMark) {
//       const fullText = insideMark.textContent.trim();
//       if (selectedText === fullText) {
//         removeHighlight(fieldId, fullText);
//         highlightedSelections = highlightedSelections.filter(
//           h => !(h.field === fieldId && h.text === fullText)
//         );
//         updateCommentBox();
//       }
//       selection.removeAllRanges();
//       return;
//     }

//     // ✅ Ignore partial selections overlapping highlights
//     const overlap = Array.from(fieldEl.querySelectorAll('mark.hl')).some(mark => {
//       const markText = mark.textContent;
//       return markText.includes(selectedText) || selectedText.includes(markText);
//     });
//     if (overlap) {
//       selection.removeAllRanges();
//       return;
//     }

//     // Check if already added (duplicate)
//     const already = highlightedSelections.find(
//       h => h.field === fieldId && h.text === selectedText
//     );
//     if (already) {
//       // Remove both highlight + comment entry
//       removeHighlight(fieldId, selectedText);
//       highlightedSelections = highlightedSelections.filter(
//         h => !(h.field === fieldId && h.text === selectedText)
//       );
//       updateCommentBox();
//       selection.removeAllRanges();
//       return;
//     }

//     // --- Add new highlight ---
//     if (fieldEl.tagName.toLowerCase() === 'textarea') {
//       const text = fieldEl.value;
//       const re = new RegExp(escapeRegExp(selectedText));
//       if (!re.test(text)) {
//         selection.removeAllRanges();
//         return;
//       }
//       const newHTML = text.replace(re, `<mark class="hl">${selectedText}</mark>`);
//       fieldEl.outerHTML = `<div id="${fieldId}" class="editable-content" contenteditable="true" style="border:1px solid #ccc;border-radius:6px;padding:10px;">${newHTML}</div>`;
//       const newDiv = document.getElementById(fieldId);
//       newDiv.addEventListener('mouseup', () => handleTextSelection(fieldId));
//       newDiv.addEventListener('keyup', (e) => {
//         if (e.key === 'Enter') handleTextSelection(fieldId);
//       });
//     } else {
//       try {
//         const mark = document.createElement('mark');
//         mark.className = 'hl';
//         mark.textContent = selectedText;
//         range.deleteContents();
//         range.insertNode(mark);
//         selection.collapseToEnd();
//       } catch (err) {
//         const html = fieldEl.innerHTML;
//         const re = new RegExp(escapeRegExp(selectedText));
//         fieldEl.innerHTML = html.replace(re, `<mark class="hl">${selectedText}</mark>`);
//       }
//     }

//     // record the highlight
//     highlightedSelections.push({ field: fieldId, text: selectedText });

//     // ✅ remove duplicates
//     highlightedSelections = highlightedSelections.filter(
//       (v, i, arr) =>
//         arr.findIndex(a => a.field === v.field && a.text === v.text) === i
//     );

//     updateCommentBox();
//     selection.removeAllRanges();
//   }

//   // --- Remove highlight ---
//   function removeHighlight(fieldId, selectedText) {
//     const el = document.getElementById(fieldId);
//     if (!el) return;
//     const marks = Array.from(el.querySelectorAll('mark.hl'));
//     for (let m of marks) {
//       if (m.textContent.trim() === selectedText.trim()) {
//         const txt = document.createTextNode(m.textContent);
//         m.parentNode.replaceChild(txt, m);
//         break;
//       }
//     }
//   }

//   // --- Update comment box ---
//   function updateCommentBox() {
//     commentBox.value = highlightedSelections
//       .map(h => `${h.field}: ${h.text}`)
//       .join('\n');
//   }
// });






// --- Inject CSS for highlight style ---
(function(){
  const style = document.createElement('style');
  style.textContent = `
    mark.hl {
      background-color: yellow;
      color: inherit;
    }
    .editable-content {
      white-space: pre-wrap;
      outline: none;
    }
  `;
  document.head.appendChild(style);
})();

// --- Main logic ---
document.addEventListener('DOMContentLoaded', () => {
  const commentBox = document.getElementById('commentBox');
  const ids = ['textBrut', 'notice'];
  let highlightedSelections = []; // { field, text }

  // helper
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // attach handlers
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('mouseup', () => handleTextSelection(id));
    el.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') handleTextSelection(id);
    });
  });

  // --- Main handler ---
  function handleTextSelection(fieldId) {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (!selectedText) return;

    const fieldEl = document.getElementById(fieldId);
    if (!fieldEl) return;

    const range = selection.getRangeAt(0);
    let container = range.commonAncestorContainer;
    if (container.nodeType === 3) container = container.parentNode;

    // ✅ If selection is inside existing highlight, check if it’s the full highlight → remove
    const insideMark = container.closest && container.closest('mark.hl');
    if (insideMark) {
      const fullText = insideMark.textContent.trim();
      if (selectedText === fullText) {
        removeHighlight(fieldId, fullText);
        highlightedSelections = highlightedSelections.filter(
          h => !(h.field === fieldId && h.text === fullText)
        );
        updateCommentBox();
      }
      selection.removeAllRanges();
      return;
    }

    // ✅ Ignore partial selections overlapping highlights
    const overlap = Array.from(fieldEl.querySelectorAll('mark.hl')).some(mark => {
      const markText = mark.textContent;
      return markText.includes(selectedText) || selectedText.includes(markText);
    });
    if (overlap) {
      selection.removeAllRanges();
      return;
    }

    // Check if already added (duplicate)
    const already = highlightedSelections.find(
      h => h.field === fieldId && h.text === selectedText
    );
    if (already) {
      // Remove both highlight + comment entry
      removeHighlight(fieldId, selectedText);
      highlightedSelections = highlightedSelections.filter(
        h => !(h.field === fieldId && h.text === selectedText)
      );
      updateCommentBox();
      selection.removeAllRanges();
      return;
    }

    // --- Add new highlight ---
    if (fieldEl.tagName.toLowerCase() === 'textarea') {
      const text = fieldEl.value;
      const re = new RegExp(escapeRegExp(selectedText));
      if (!re.test(text)) {
        selection.removeAllRanges();
        return;
      }
      const newHTML = text.replace(re, `<mark class="hl">${selectedText}</mark>`);
      fieldEl.outerHTML = `<div id="${fieldId}" class="editable-content" contenteditable="true" style="border:1px solid #ccc;border-radius:6px;padding:10px;">${newHTML}</div>`;
      const newDiv = document.getElementById(fieldId);
      newDiv.addEventListener('mouseup', () => handleTextSelection(fieldId));
      newDiv.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleTextSelection(fieldId);
      });
    } else {
      try {
        const mark = document.createElement('mark');
        mark.className = 'hl';
        mark.textContent = selectedText;
        range.deleteContents();
        range.insertNode(mark);
        selection.collapseToEnd();
      } catch (err) {
        const html = fieldEl.innerHTML;
        const re = new RegExp(escapeRegExp(selectedText));
        fieldEl.innerHTML = html.replace(re, `<mark class="hl">${selectedText}</mark>`);
      }
    }

    // record the highlight
    highlightedSelections.push({ field: fieldId, text: selectedText });

    // ✅ remove duplicates
    highlightedSelections = highlightedSelections.filter(
      (v, i, arr) =>
        arr.findIndex(a => a.field === v.field && a.text === v.text) === i
    );

    updateCommentBox();
    selection.removeAllRanges();
  }

  // --- Remove highlight ---
  function removeHighlight(fieldId, selectedText) {
    const el = document.getElementById(fieldId);
    if (!el) return;
    const marks = Array.from(el.querySelectorAll('mark.hl'));
    for (let m of marks) {
      if (m.textContent.trim() === selectedText.trim()) {
        const txt = document.createTextNode(m.textContent);
        m.parentNode.replaceChild(txt, m);
        break;
      }
    }
  }

  // --- ✅ Update comment box (with horizontal line separators) ---
  function updateCommentBox() {
    if (highlightedSelections.length === 0) {
      commentBox.value = "";
      return;
    }

    const formatted = highlightedSelections
      .map(h => `${h.field}: ${h.text}`)
      .join('\n------------------------------\n');

    commentBox.value = formatted + '\n------------------------------';
  }
});
