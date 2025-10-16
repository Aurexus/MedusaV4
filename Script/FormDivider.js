const divider = document.getElementById("divider2");
  const contentArea = document.querySelector(".content-area");
  const leftPanel = document.getElementById("left2");
  let isResizing = false;

  divider.addEventListener("mousedown", (e) => {
    isResizing = true;
    divider.classList.add("active");
    document.body.style.cursor = "col-resize";
    e.preventDefault();
  });

  window.addEventListener("mousemove", (e) => {
    if (!isResizing) return;
    const rect = contentArea.getBoundingClientRect();
    const newWidth = e.clientX - rect.left;
    // limit resizing within safe range
    if (newWidth > 180 && newWidth < rect.width - 400) {
      leftPanel.style.flex = `0 0 ${newWidth}px`;
    }
  });

  window.addEventListener("mouseup", () => {
    isResizing = false;
    divider.classList.remove("active");
    document.body.style.cursor = "default";
  });