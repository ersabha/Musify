    function fancyTimeFormat(time)
    {   
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = time % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }



    function toggleSong() {
        var song = document.querySelector('audio');
        if(song.paused == true) {
        console.log('Playing');
        $('.play-icon').removeClass('fa-play').addClass('fa-pause');
        song.play();
        }
        else {
        console.log('Pausing');
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        song.pause();
        }
        } 

        function updateCurrentTime() {
            var song = document.querySelector('audio');
            var currentTime = Math.floor(song.currentTime);
            currentTime = fancyTimeFormat(currentTime);
            var duration = Math.floor(song.duration);
            duration = fancyTimeFormat(duration)
            $('.time-elapsed').text(currentTime);
            $('.song-duration').text(duration);
        }



        function addSongNameClickEvent(songName,position) {
            var id = '#song' + position;
                $(id).click(function() {
                var audio = document.querySelector('audio');
                var currentSong = audio.src;
                if(currentSong.search(songName) != -1)
                    {
                    toggleSong();
                    }
                else {
                    audio.src = songName;
                    toggleSong();
                }
                });
                }

     

        window.onload = function() {
          
            updateCurrentTime(); 
            setInterval(function() {
            updateCurrentTime();
            },1000);

            var songList = ['Tera Zikr','Teri Meri Dosti', 'Tu Dua Hai', 'Mere Nishaan', 'Jeena Jeena', 'Saari ki Saari' ]; 
      

            var artistList = ['Darshan Raval','Darshan Raval','Darshan Raval','Darshan Raval','Darshan Raval','Darshan Raval' ];
             
            var albumList = ['DR-Album','DR-Album','DR-Album','DR-Album','DR-Album','DR-Album' ]; 

            var durationList = ['4:08','2:54','3:27','4:10','3:02','2:59' ]; 


                 for(var i =0; i < songList.length;i++) {
                        var name = '#song' + (i+1);
                        var song = $(name);
                        song.find('.song-name').text(songList[i]);
                        song.find('.song-artist').text(artistList[i]);
                        song.find('.song-album').text(albumList[i]); // Added
                        song.find('.song-length').text(durationList[i]); // Added
                    }



            var fileNames = ['song1.mp3','song2.mp3','song3.mp3','song4.mp3','song5.mp3', 'song6.mp3'];   
                
            for (var i = 0; i < fileNames.length ; i++) {
                addSongNameClickEvent(fileNames[i],i+1)
            } 

            }
        

    $('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 2) {
            var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
        } else {
            $('#name-input').addClass('error');
        }
    });

    $('.play-icon').on('click', function() {
    toggleSong();
    });

    $('body').on('keypress',function(event) {
    if (event.keyCode == 32)
    {
    toggleSong();
    }
    });
        