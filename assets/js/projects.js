function syncPairedColumns() {
  const isDesktop = window.innerWidth > 1024;
  const columns = document.querySelectorAll('.grid-column');

  if (!isDesktop) {
    columns.forEach(col => {
      Array.from(col.children).forEach(card => {
        card.style.height = '';
      });
    });
    return;
  }

  if (columns.length < 4) return;

  const pairs = [
    [0, 3],
    [1, 2]
  ];

  pairs.forEach(([a, b]) => {
    const colA = columns[a].children;
    const colB = columns[b].children;

    const rows = Math.min(colA.length, colB.length);

    for (let i = 0; i < rows; i++) {
      colA[i].style.height = 'auto';
      colB[i].style.height = 'auto';
    }

    for (let i = 0; i < rows; i++) {
      const maxHeight = Math.max(
        colA[i].offsetHeight,
        colB[i].offsetHeight
      );

      colA[i].style.height = maxHeight + 'px';
      colB[i].style.height = maxHeight + 'px';
    }
  });
}

window.addEventListener('load', syncPairedColumns);
window.addEventListener('resize', syncPairedColumns);
