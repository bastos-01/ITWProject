define(['knockout'], function (ko) {
    var vm = function () {
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var self = this;
        var baseUri = 'http://192.168.160.40/nobel/api/LaureadoIndividuos';
        self.className = 'Laureates';
        self.description = 'This page aims to demonstrate the use of the Nobel web API for laureates and the interconnection with other entities.<br>Called method(s): <ul><li>' + baseUri + '</li></ul>';
        self.error = ko.observable();
        self.laureates = ko.observableArray([]);
        
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
        var a = 1;
        var sexo = "";
        var x = $('#sortby option:selected').val();
        var y = $('#ordem option:selected').val();
        getLaureates = function () {
            console.log('CALL: LaureadoIndividuos...')
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.laureates(data);
                $("#tags").val("");
                if ($("#tags").hasClass("hidden")) {$("#tags").removeClass("hidden");}
        
                if ($("#SS").hasClass("hidden")) {$("#SS").removeClass("hidden");}

                if(a==1){
                    $('#lauAnterior').attr('disabled', true);
                }
                if(a==9){
                    $('#lauSeguinte').attr('disabled', true);
                }
                if(a!=1 && a != 9){
                    $('#lauAnterior').removeAttr('disabled');
                    $('#lauSeguinte').removeAttr('disabled');
                }
            });
        };

        lauSeg = function () {
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.laureates(data);
                 var x = $('#sortby option:selected').val();
                var y = $('#ordem option:selected').val();
                if(document.getElementById("male").checked == true){
                    sexo = "m";
                }
                if(document.getElementById("female").checked == true){
                    sexo = "f";
                }
                if (document.getElementById("male").checked == false && document.getElementById("female").checked == false) {
                    sexo = "";
                }
                if(a>=1 && a<=8){
                a = a + 1;
                baseUri = 'http://192.168.160.40/nobel/api/LaureadoIndividuos?&page=' + a + '&gender=' + sexo + '&SortBy=' + x + '&Order=' + y;
                console.log(baseUri);
                getLaureates();
                $('#numeroPagLau').html(a + "/9");
                
                
              

           
                    }
            });

        }
        lauAnt = function () {
            ajaxHelper(baseUri, 'GET').done(function (data) {
                self.laureates(data);
                 var x = $('#sortby option:selected').val();
                var y = $('#ordem option:selected').val();
                if(document.getElementById("male").checked == true){
                    sexo = "m";
                }
                if(document.getElementById("female").checked == true){
                    sexo = "f";
                }
                 if (document.getElementById("male").checked == false && document.getElementById("female").checked == false) {
                    sexo = "";
                }
                if(a>=2 && a<=9){
                a = a - 1;
                baseUri = 'http://192.168.160.40/nobel/api/LaureadoIndividuos?&page=' + a + '&gender=' + sexo + '&SortBy=' + x + '&Order=' + y;
                console.log(baseUri);
                getLaureates();
                $('#numeroPagLau').html(a + "/9");
             
                    }
            });

        }
        veriMale = function(){
            var x = $('#sortby option:selected').val();
            var y = $('#ordem option:selected').val();
            if(document.getElementById("male").checked == true){ 
                document.getElementById("female").checked = false;
                var sexo = "m";
                baseUri = 'http://192.168.160.40/nobel/api/LaureadoIndividuos?&page=' + a + '&gender=' + sexo + '&SortBy=' + x + '&Order=' + y;
                console.log(baseUri);
            }
            if(document.getElementById("female").checked == false && document.getElementById("male").checked == false){
                var sexo = "";
            baseUri = 'http://192.168.160.40/nobel/api/LaureadoIndividuos?&page=' + a + '&SortBy=' + x + '&Order=' + y;
            console.log(baseUri);
        }
            getLaureates();


        }
        veriFemale = function(){
            var x = $('#sortby option:selected').val();
            var y = $('#ordem option:selected').val();
        if(document.getElementById("female").checked == true){ 
            document.getElementById("male").checked = false;
            var sexo = "f";
            baseUri = 'http://192.168.160.40/nobel/api/LaureadoIndividuos?&page=' + a + '&gender=' + sexo + '&SortBy=' + x + '&Order=' + y;
        }
        if(document.getElementById("female").checked == false && document.getElementById("male").checked == false){
            var sexo = "";
            baseUri = 'http://192.168.160.40/nobel/api/LaureadoIndividuos?&page=' + a + '&SortBy=' + x + '&Order=' + y;
            console.log(baseUri);
        }
        getLaureates();
       }
       sort = function(){
                var x = $('#sortby option:selected').val();
                var y = $('#ordem option:selected').val();
                baseUri = 'http://192.168.160.40/nobel/api/LaureadoIndividuos?' + '&gender=' + sexo + '&SortBy=' + x + '&Order=' + y + '&page=' + a ;
                console.log(baseUri);
                getLaureates();
                 
            } 
     
        

        //---- initial call

        getLaureates();
        console.log('laureates');
        console.log(self.laureates());
    };
    return vm;
});
