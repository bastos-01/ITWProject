define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        search: function() {
            

              
            $("#tags").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                    $("#tabletaLau tr").filter(function() {
                            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                             });
                    $("#tableprizes tr").filter(function() {
                            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                    

    });
  
               
})
              
  
               


              
        },
        activate: function () {
            router.map([
                { route: '', title:'Home', moduleId: 'viewmodels/welcome', nav: true },
                { route: 'laureates', moduleId: 'viewmodels/laureates', nav: true },
                { route: 'prizes', moduleId: 'viewmodels/prizes', nav: true },
                { route: 'laureadoDetalhes/:id', moduleId: 'viewmodels/laureadoDetalhes', nav: false },
                { route: 'premioDetalhes/:id', moduleId: 'viewmodels/premioDetalhes', nav: false },
                
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };

});
  