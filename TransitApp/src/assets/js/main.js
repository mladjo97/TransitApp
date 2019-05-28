/*
 * Author: Mladen Milosevic
 * Date: 28.05.2019
 * Project: Public Transit Application
 * Course: Web Development 2 - Programming in Smart Grid systems 
 */

$(document).ready(function() {
    
    // hide input warning for datepicker
    $('#dob-input-warning').hide();

    // initialize datepicker
    $('[data-toggle="datepicker"]').datepicker(
        {
            endDate: new Date(),
            format: 'dd/mm/yyyy',
            startView: 2,
            weekStart: 1
        }
    );

    $('#dob').focusout(function () {
        $('#dob').val($('[data-toggle="datepicker"]').datepicker('getDate', true));

        if($('#dob').val()) {
            $('#dob-input-warning').hide();
        } else {
            $('#dob-input-warning').show();
        }
    });

    $('#registerButton').click(function() {
        $('#dob').val($('[data-toggle="datepicker"]').datepicker('getDate', true));

    });

});
