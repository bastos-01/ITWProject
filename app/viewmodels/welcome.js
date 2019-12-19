define(['durandal/app'], function (app) {
    var ctor = function () {
        this.displayName = 'Nobel Prizes';
        $("#tags").val("");
        if (!$("#tags").hasClass("hidden")) {$("#tags").addClass("hidden");}
        
        if (!$("#SS").hasClass("hidden")) {$("#SS").addClass("hidden");}
        
        this.features = [
            'List of the Laureates',
            'Details about each Nobel winner',
            'List of all the Nobel prizes'
        ];
    };

    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //This pattern is also recognized by Durandal so that it can create instances on demand.
    //If you wish to create a singleton, you should export an object instead of a function.
    //See the "flickr" module for an example of object export.

    return ctor;
});