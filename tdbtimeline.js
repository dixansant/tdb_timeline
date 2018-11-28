(function ( $ ) {

    $.fn.tdbtimeline = function( options ) {

        var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var dW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        var settings = $.extend({
            linecolor : '#004165'
         }, options );

        // reorganizar la data segun la fecha
        settings.data = function(w){
            r=[];
            c=0;
            for(t in w){
                c++;
                dt= new Date (w[t].datetime)
                tm = dt.getTime();
                w[t].time = tm;
                for(i in r)
                    if (tm < r[i].time) {
                        r.splice(i, 0, w[t]);
                        break;
                    }
                if (r.length!=c) r.push(w[t]);
            }


            return r;
        } (settings.data )

        // asignarle porcientos
        settings.data = function(w){
            first = w[0].time;
            last = w[w.length-1].time;
            dif = last-first+585000000;

            for(t in w)
                w[t].percent = 5 + parseInt((w[t].time - first) / dif * 10000)/100

            return w;
        } (settings.data )

        console.log(settings.data)

        return this.each(function() {

            $(this).html(`
                <div class="mainline">
                <svg height="5" width="100%">
                    <line x1="0" y1="0" x2="100%" y2="0" style="stroke:${settings.linecolor};stroke-width:5;" />
                    Sorry, your browser does not support inline SVG.
                </svg></div>`);

            for(t in settings.data){
                addPoint.call(this,t,settings.data[t])
            }



        });

        function addPoint(t,w){

            dt = new Date(w.time);
            day = dt.getDate();
            mon = mL[dt.getMonth()];

            dWeek=dW[dt.getDay()];

            cls=((t%2)==0)?'eventup':'eventdown';

            clsaut=((t%2)==0)?'eventAuthor':'event2Author';
            clstim=((t%2)==0)?'time':'time2';
            $(this).append(`<div class="tdbEvent ${cls}" style="left:${w.percent}%; ">
                <div class="bubble">
                    <div class="eventTime">
                        <div class="DayDigit">${day}</div>
                        <div class="Day">
                            ${dWeek}
                            <div class="MonthYear">${mon} 2016</div>
                        </div>
                    </div>
                    <div class="eventTitle">Profile Created</div>
                </div>
                <div class="${clsaut}">by Youri Nelson</div>
                <svg height="20" width="20">
                    <circle cx="10" cy="11" r="5" fill="#004165"/>
                </svg>
                <div class="${clstim}">9 : 27 AM</div>
        
            </div>`);
        }

    };

}( jQuery ));