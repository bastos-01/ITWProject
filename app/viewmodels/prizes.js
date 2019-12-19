define(['knockout'], function (ko) {
    var vm = function () {
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var self = this;
        var baseUri = 'http://192.168.160.40/nobel/api/PremioNobels';
        self.className = 'Nobel prizes';
        self.description = 'This page aims to demonstrate the use of the Nobel web API for prizes and the interconnection with other entities.<br>Called method(s): <ul><li>' + baseUri + '</li></ul>';
        self.error = ko.observable();
        self.prizes = ko.observableArray([]);
        //--- Internal functions
        function ajaxHelper(uri, method, data) {
            self.error(''); // Clear error message
            return $.ajax({
                type: method,
                url: uri,
                dataType: 'json',
                contentType: 'application/json',
                data: data ? JSON.stringify(data) : null,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Call[" + uri + "] Fail...");
                    self.error(errorThrown);
                }
            })
        }
        //--- Externel functions (accessible outside)
        getPrizes = function () {
            console.log('CALL: PremioNobels...')
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.prizes(data);
                $("#tags").val("");
                 if ($("#tags").hasClass("hidden")) {$("#tags").removeClass("hidden");}
        
                if ($("#SS").hasClass("hidden")) {$("#SS").removeClass("hidden");}
                 if(a==1){
                    $('#premioAnterior').attr('disabled', true);
                }
                if(a==6){
                    $('#premioSeguinte').attr('disabled', true);
                }
                if(a!=1 && a != 6){
                    $('#premioAnterior').removeAttr('disabled');
                    $('#premioSeguinte').removeAttr('disabled');
                }
            });
        };
        
       
        var a = 1;
       
        premioSeg = function () {
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.prizes(data);
                var x = $('#filtroCategoria option:selected').val();
                var dat = $('#spin').val();
                if(a>=1 && a<=5){
                a = a + 1;
                if(dat == "" && x == ""){
                    baseUri = 'http://192.168.160.40/nobel/api/PremioNobels?page=' + a;
                }
                if(dat == "" && x != ""){
                baseUri = 'http://192.168.160.40/nobel/api/PremioNobels?page=' + a + '&category=' + x;  
                console.log(baseUri);
                 } 
                 if(x == "" && dat != ""){
                baseUri = 'http://192.168.160.40/nobel/api/PremioNobels?page=' + a + '&year=' + dat;
                 }
                 if(x != "" && dat != ""){
                baseUri = 'http://192.168.160.40/nobel/api/PremioNobels?page=' + a + '&category=' + x + '&year=' + dat;
                 } 
                console.log(baseUri);
                getPrizes();
                $('#numeroPagPremio').html(a + "/6");
                    }
            });

        }
        premioAnt = function () {
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.prizes(data);
                var x = $('#filtroCategoria option:selected').val();
                var dat = $('#spin').val();
                if(a>=2 && a<=6){
                a = a - 1;
                if(dat == "" && x == ""){
                    baseUri = 'http://192.168.160.40/nobel/api/PremioNobels?page=' + a;
                }
                if(dat == "" && x != ""){
                baseUri = 'http://192.168.160.40/nobel/api/PremioNobels?page=' + a + '&category=' + x;  
                console.log(baseUri);
                 } 
                 if(x == "" && dat != ""){
                baseUri = 'http://192.168.160.40/nobel/api/PremioNobels?page=' + a + '&year=' + dat;
                 }
                 if(x != "" && dat != ""){
                baseUri = 'http://192.168.160.40/nobel/api/PremioNobels?page=' + a + '&category=' + x + '&year=' + dat;
                 }
                console.log(baseUri);
                getPrizes();
                $('#numeroPagPremio').html(a + "/6");
                    }
            });

        }
          filtroCat = function(){
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.prizes(data);
                var dat = $('#spin').val();
                var x = $('#filtroCategoria option:selected').val();
                if((dat < 1901 || dat > 2016) && dat != 0){
                    $('#modalErro').modal('show');
                    dat = "";
                    $('#spin').val("");
                }
                if(dat == "" && x == ""){
                    baseUri = 'http://192.168.160.40/nobel/api/PremioNobels?page=' + a;
                }
                if(dat == "" && x != ""){
                baseUri = 'http://192.168.160.40/nobel/api/PremioNobels?page=' + a + '&category=' + x;  
                console.log(baseUri);
                 } 
                 if(x == "" && dat != ""){
                baseUri = 'http://192.168.160.40/nobel/api/PremioNobels?page=' + a + '&year=' + dat;
                 }
                 if(x != "" && dat != ""){
                baseUri = 'http://192.168.160.40/nobel/api/PremioNobels?page=' + a + '&category=' + x + '&year=' + dat;
                 }
                getPrizes();
                 });
            }
        
        //---- initial call
        getPrizes();
    };
    return vm;
});
