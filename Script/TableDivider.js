const divider = document.querySelector(".divider");
    const leftPanel = document.querySelector(".left-panel");
    const main = document.querySelector("main");

    let isResizing = false;

    divider.addEventListener("mousedown", () => {
      isResizing = true;
      document.body.style.cursor = "col-resize";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isResizing) return;
      const mainRect = main.getBoundingClientRect();
      let newWidth = ((e.clientX - mainRect.left) / mainRect.width) * 100;
      if (newWidth < 10) newWidth = 10;
      if (newWidth > 50) newWidth = 50;
      leftPanel.style.width = `${newWidth}%`;
    });

    document.addEventListener("mouseup", () => {
      isResizing = false;
      document.body.style.cursor = "default";
    });