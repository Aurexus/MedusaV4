 // --- IMAGE VIEWER + PAGINATED THUMBNAILS ---
    // const imageList = Array.from({ length: 30 }, (_, i) =>
    //   `https://placehold.co/1200x800/${Math.floor(Math.random()*999999).toString(16)}/fff?text=Image+${i+1}`
    // );

     const imageList = [
      "https://placehold.co/1200x800/4b4cff/fff?text=Image+1",
      "https://placehold.co/1200x800/ff3366/fff?text=Image+2",
      "https://placehold.co/1200x800/00cc88/fff?text=Image+3",
      "https://placehold.co/1200x800/ffaa00/fff?text=Image+4",
      "https://placehold.co/1200x800/6600ff/fff?text=Image+5",
      "https://placehold.co/1200x800/ff6600/fff?text=Image+6",
      "https://placehold.co/1200x800/0099ff/fff?text=Image+7",
      "https://placehold.co/1200x800/44aa44/fff?text=Image+8",
      "https://placehold.co/1200x800/cc33cc/fff?text=Image+9",
      "https://placehold.co/1200x800/999999/fff?text=Image+10",
      "https://placehold.co/1200x800/4b4cff/fff?text=Image+11",
      "https://placehold.co/1200x800/ff3366/fff?text=Image+2",
      "https://placehold.co/1200x800/00cc88/fff?text=Image+3",
      "https://placehold.co/1200x800/ffaa00/fff?text=Image+4",
      "https://placehold.co/1200x800/6600ff/fff?text=Image+5",
      "https://placehold.co/1200x800/ff6600/fff?text=Image+6",
      "https://placehold.co/1200x800/0099ff/fff?text=Image+7",
      "https://placehold.co/1200x800/44aa44/fff?text=Image+8",
      "https://placehold.co/1200x800/cc33cc/fff?text=Image+9",
      "https://placehold.co/1200x800/999999/fff?text=Image+10",
      "https://placehold.co/1200x800/4b4cff/fff?text=Image+21",
      "https://placehold.co/1200x800/ff3366/fff?text=Image+2",
      "https://placehold.co/1200x800/00cc88/fff?text=Image+3",
      "https://placehold.co/1200x800/ffaa00/fff?text=Image+4",
      "https://placehold.co/1200x800/6600ff/fff?text=Image+5",
      "https://placehold.co/1200x800/ff6600/fff?text=Image+6",
      "https://placehold.co/1200x800/0099ff/fff?text=Image+7",
      "https://placehold.co/1200x800/44aa44/fff?text=Image+8",
      "https://placehold.co/1200x800/cc33cc/fff?text=Image+9",
      "https://placehold.co/1200x800/999999/fff?text=Image+10",
      "https://placehold.co/1200x800/4b4cff/fff?text=Image+1",
      "https://placehold.co/1200x800/ff3366/fff?text=Image+2",
      "https://placehold.co/1200x800/00cc88/fff?text=Image+3",
      "https://placehold.co/1200x800/ffaa00/fff?text=Image+4",
      "https://placehold.co/1200x800/6600ff/fff?text=Image+5",
      "https://placehold.co/1200x800/ff6600/fff?text=Image+6",
      "https://placehold.co/1200x800/0099ff/fff?text=Image+7",
      "https://placehold.co/1200x800/44aa44/fff?text=Image+8",
      "https://placehold.co/1200x800/cc33cc/fff?text=Image+9",
      "https://placehold.co/1200x800/999999/fff?text=Image+10"
    ];

    const gallery = document.getElementById("thumbnailGallery");
    const btnPrev = document.querySelector(".thumb-prev");
    const btnNext = document.querySelector(".thumb-next");
    let currentIndex = 0;
    let currentPage = 0;
    const imagesPerPage = 10;

    const renderThumbnails = () => {
      gallery.innerHTML = "";
      const startIndex = currentPage * imagesPerPage;
      const endIndex = Math.min(startIndex + imagesPerPage, imageList.length);
      const visibleImages = imageList.slice(startIndex, endIndex);

      visibleImages.forEach((src, idx) => {
        const img = document.createElement("img");
        img.src = src;
        const globalIndex = startIndex + idx;
        if (globalIndex === currentIndex) img.classList.add("active");
        img.addEventListener("click", () => loadImage(src, img));
        gallery.appendChild(img);
      });

      btnPrev.disabled = currentPage === 0;
      btnNext.disabled = endIndex >= imageList.length;
    };

    btnPrev.addEventListener("click", () => {
      if (currentPage > 0) currentPage--;
      renderThumbnails();
    });

    btnNext.addEventListener("click", () => {
      if ((currentPage + 1) * imagesPerPage < imageList.length) currentPage++;
      renderThumbnails();
    });

    const initViewer = (imgSrc) => {
      $("#your_div_image_container").html("");
      $("#your_div_image_container").verySimpleImageViewer({
        imageSource: imgSrc,
        frame: ["100%", "100%"],
        maxZoom: "900%",
        zoomFactor: "10%",
        saveZoomPos: true,
        mouse: true,
        keyboard: true,
        toolbar: true
      });

      const refLines = document.createElement("div");
      refLines.classList.add("reference-lines");
      document.getElementById("your_div_image_container").appendChild(refLines);

      const prevBtn = document.createElement("div");
      prevBtn.classList.add("vsiv-nav-btn", "vsiv-prev");
      prevBtn.innerHTML = "&#10094;";
      prevBtn.onclick = () => navigateImage(-1);

      const nextBtn = document.createElement("div");
      nextBtn.classList.add("vsiv-nav-btn", "vsiv-next");
      nextBtn.innerHTML = "&#10095;";
      nextBtn.onclick = () => navigateImage(1);

      document.getElementById("your_div_image_container").append(prevBtn, nextBtn);

      setTimeout(() => {
        const $toolbar = $(".jsvsiv_toolbar");
        if ($toolbar.length) {
          $toolbar.addClass("detached-toolbar");
          $("body").append($toolbar);
        }
      }, 400);
    };

    const navigateImage = (dir) => {
      currentIndex = (currentIndex + dir + imageList.length) % imageList.length;
      initViewer(imageList[currentIndex]);
      const newPage = Math.floor(currentIndex / imagesPerPage);
      if (newPage !== currentPage) {
        currentPage = newPage;
        renderThumbnails();
      } else {
        renderThumbnails();
      }
    };

    const loadImage = (src, clickedThumb) => {
      document.querySelectorAll(".thumbnail-gallery img").forEach(i => i.classList.remove("active"));
      clickedThumb.classList.add("active");
      currentIndex = imageList.indexOf(src);
      initViewer(src);
    };

    initViewer(imageList[0]);
    renderThumbnails();

    // Folder & Image selection highlight
    $(".folder-item").on("click", function() {
      $(".folder-item").removeClass("active-folder");
      $(this).addClass("active-folder");
    });

    $(".image-item").on("click", function() {
      $(".image-item").removeClass("active-image");
      $(this).addClass("active-image");
    });