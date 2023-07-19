let time = '';
let miliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let nr = 0;
let start = false;

let music = true;
const clickA = new Audio('./sounds/click.wav')
const wooshA = new Audio('./sounds/woosh.wav')
const clockA = new Audio('./sounds/clock.wav')

$('.start').click(function() 
{ 
    if(music == true) wooshA.play();
    if($('.start').html() == "stop")
    {
        start = false;
        $(this).css('border-color', 'lightcoral').html('wznów');
        $('.measurement').html('resetuj');
    }
    else if($('.start').html() == "wznów")
    {
        start = true;
        $(this).css('border-color', 'rgb(167, 45, 45)').html('stop');
        $('.measurement').html('pomiar');
        counter(miliseconds);
    }
    else 
    {
        start = true;
        $(this).css('border-color', 'rgb(167, 45, 45)').html('stop')
        $('.measurement').fadeTo(100, 1).css('pointer-events', 'auto');
        counter(miliseconds);
    }
});

const counter = ms =>
{
    if (start == true) 
    {
        ms++;

        if (music == true) clockA.play();

        if (ms == 99) 
        {
            seconds++;
            ms = 0;
        }

        if (seconds == 59) 
        {
            minutes++;
            seconds = 0;
        }

        if (minutes == 59) 
        {
            hours++;
            minutes = 0;
        }

        if (hours == 59) 
        {
            ms = 0;
            seconds = 0;
            minutes = 0;
            hours = 0;
        }

        time =
            (hours < 10 ? '0' + hours : hours) + ':' +
            (minutes < 10 ? '0' + minutes : minutes) + ':' +
            (seconds < 10 ? '0' + seconds : seconds) + ':' +
            (ms < 10 ? '0' + ms : ms);

        miliseconds = ms;
        $('.watch').html(time);

        setTimeout(() => counter(ms), 10);
    }
}

$('.measurement').click(function()
{
    if(music == true ) clickA.play();

    if(start == true)
        $('.list').append(`<p>${++nr}. ${$('.watch').html()}</p>`);
    else
    {
        miliseconds = 0;
        seconds = 0;
        minutes = 0;
        hours = 0;
        nr = 0;

        $('.watch').html('00:00:00:00');
        $('.start').html('start').css('border-color','rgb(115, 218, 178)');
        $(this).html('pomiar').fadeTo(100, 0.5).css('pointer-events', 'none');
        $('.list').html('');
        start = false;
    }
})

$('header i[class*="fa-volume"]').click(function() 
{ 
    $(this).toggleClass('fa-volume-xmark').toggleClass('fa-volume-high');

    if(music == true) music = false;
    else music = true;
});

$('header i[class*="fa-toggle"]').click(function() 
{ 
    $(this).toggleClass('fa-toggle-off').toggleClass('fa-toggle-on');
    $('body').toggleClass('day');
});