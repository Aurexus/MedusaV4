// Initialize DataTable
    $(document).ready(function() {
      $('#myTable').DataTable({
         orderClasses: false,
        pageLength: 15,
        lengthMenu: [15, 50, 100, 250],
        stripeClasses: [], // remove striping
        language: {
          search: "Rechercher:",
          lengthMenu: "Afficher _MENU_ entrées",
          info: "Affichage _START_ à _END_ sur _TOTAL_ entrées",
          paginate: {
            first: "Premier",
            last: "Dernier",
            next: "Suivant",
            previous: "Précédent"
          }
        }
      });
    });