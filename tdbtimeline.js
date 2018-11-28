(function ( $ ) {

    $.fn.tdbtimeline = function( options ) {


        var settings = $.extend({
            linecolor : '#004165'
         }, options );


        return this.each(function() {

            $(this).html(`
                <svg height="5" width="100%">
                    <line x1="0" y1="0" x2="100%" y2="0" style="stroke:${settings.linecolor};stroke-width:5;" />
                    Sorry, your browser does not support inline SVG.
                </svg>`);
        });

    };

}( jQuery ));