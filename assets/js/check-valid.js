
(function () {
  const pages = [
    'artist.html',
    'artist-detail.html',
    'projects.html',
    'post-project.html',
    'project-detail.html'
  ];

  const current = location.pathname.split('/').pop().split('?')[0];
  const loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));

  if (pages.includes(current) && !loggedUser) {
    location.replace("index.html");
  }

})();