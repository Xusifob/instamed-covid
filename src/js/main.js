$(document).ready(function () {

    let $form = $('form');

    $('a[href="#start"]').on('click',function () {

        let attr = $(this).attr('href');

        $(attr).fadeIn(200);

    });

    $('#restart').on('click',function () {
        $('#intro').fadeIn(200);
        $('#result').fadeOut(200);
        console.log('kiwi');
    });

    $form.on('submit',function () {

        let score = calculateScore();

        $('#start').fadeOut(200);

        let result;

        if(score <= 1 ) {
            result = 'Poursuivez la surveillance en remplissant ce questionnaire le matin et le soir';
        } else if (score <= 4) {
            result = 'Prenez contact avec votre médecin traitant ou avec le médecin de garde si votre médecin n’est pas disponible. En cas de doute, appelez le 15.'
        } else {
            result = 'Veuillez appelez le 15';
        }

        $('#result strong').html(result);
        $('#result').fadeIn(200);
        $('#intro').fadeOut(200);

        return false;

    });

    $form.find('input,select,textarea').on('change',function () {

        let score = calculateScore();

        console.log(score);

    });


    /**
     *
     * @return {number}
     */
    function calculateScore() {

        var $score = 0;

        let $tmp = parseFloat($form.find('#temperature').val());
        let $age = parseInt($form.find('#age').val());


        if($age > 70) {
            $score++;
        } else {
            if($form.find('input[name="antecedents[]"]:checked').length) {
                $score++;
            }
        }

        if($tmp > 38) {
            if($form.find('#intrarectal').is(':checked')) {
                $score++;
            } else {
                if($tmp > 38.5) {
                    $score++;
                }
            }
        }

        $form.find('input[type="radio"]:checked').each(function () {
            $score += parseInt($(this).val());
        });


        return $score;
    }

});