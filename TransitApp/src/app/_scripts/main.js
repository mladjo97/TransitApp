/*
 * Author: Mladen Milosevic
 * Date: 30.05.20019
 * Project: Public City Transit application for Web 2 
 */

$(document).ready(function() {
    // init datetime picker
    $('input[name="birthday"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 1901,
        maxYear: parseInt(moment().format('YYYY'),10),
        locale: {
            format: 'DD/MM/YYYY'
        }
      }, function(start, end, label) {
         // da datum bude lepsi
         var dt = new Date(Date.parse(start));
         let options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
         let formattedStart = dt.toLocaleString("en-GB", options);
         console.log(formattedStart);
      });
});

function getDate() {
    var dt = new Date(Date.parse( $('input[name="birthday"]').data('daterangepicker').startDate));
    let options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    let formattedStart = dt.toLocaleString("en-GB", options);
    return formattedStart;
}

function setDate(date){
    // init datetime picker
    $('input[name="birthday"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        startDate: date,
        minYear: 1901,
        maxYear: parseInt(moment().format('YYYY'),10),
        locale: {
            format: 'DD/MM/YYYY'
        }
      }, function(start, end, label) {
         // da datum bude lepsi
         var dt = new Date(Date.parse(start));
         let options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
         let formattedStart = dt.toLocaleString("en-GB", options);
         console.log(formattedStart);
      });
}
