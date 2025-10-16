 // --- RESIZABLE PANELS LOGIC SAME AS BEFORE ---
    const dividers = document.querySelectorAll(".divider");
    const contentArea = document.querySelector(".content-area");
    let isResizing = false, dividerType = null;

    const startResize = (e, divider) => {
      isResizing = true;
      divider.classList.add("active");
      document.body.style.cursor = getComputedStyle(divider).cursor;
      dividerType = divider.id;
      e.preventDefault();
    };

    const stopResize = () => {
      isResizing = false;
      document.body.style.cursor = "default";
      dividers.forEach(d => d.classList.remove("active"));
    };

    const performResize = (clientX, clientY) => {
      if (!isResizing) return;
      const rect = contentArea.getBoundingClientRect();

      if (window.innerWidth > 992) {
        if (dividerType === "divider1") {
          const left1 = document.getElementById("left1");
          const newWidth = clientX - rect.left;
          if (newWidth > 150 && newWidth < rect.width - 500)
            left1.style.flex = `0 0 ${newWidth}px`;
        } else if (dividerType === "divider2") {
          const divider1Rect = document.getElementById("divider1").getBoundingClientRect();
          const left2 = document.getElementById("left2");
          const newWidth = clientX - divider1Rect.right;
          if (newWidth > 150 && newWidth < rect.width - 300)
            left2.style.flex = `0 0 ${newWidth}px`;
        }
      }
    };

    dividers.forEach(div => div.addEventListener("mousedown", e => startResize(e, div)));
    window.addEventListener("mousemove", e => performResize(e.clientX, e.clientY));
    window.addEventListener("mouseup", stopResize);
