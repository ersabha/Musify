 var songs = [{
                    'name': 'Tera Zikr',
                    'artist': 'Darshan Raval',
                    'album': 'DR-Album',
                    'duration': '4:08',
                    'fileName': 'song1.mp3',
                    'image': 'song1.jpg'
                },

                {
                    'name': 'Teri Meri Dosti',
                    'artist': 'Darshan Raval',
                    'album': 'DR-Album',
                    'duration': '2:54',
                    'fileName': 'song2.mp3',
                    'image': 'song2.jpg'
                },
                {
                    'name': 'Tu Dua Hai',
                    'artist': 'Darshan Raval',
                    'album': 'DR-Album',
                    'duration': '3:27',
                    'fileName': 'song3.mp3',
                    'image': 'song3.jpg'
                },
                {
                    'name': 'Mere Nishaan',
                    'artist': 'Darshan Raval',
                    'album': 'DR-Album',
                    'duration': '4:10',
                    'fileName': 'song4.mp3',
                    'image': 'song4.jpg'
                },

                {
                    'name': 'Jeena Jeena',
                    'artist': 'Darshan Raval',
                    'album': 'DR-Album',
                    'duration': '3:02',
                    'fileName': 'song5.mp3',
                    'image': 'song5.jpg'
                },

                {
                    'name': 'Saari ki Saari',
                    'artist': 'Darshan Raval',
                    'album': 'DR-Album',
                    'duration': '2:59',
                    'fileName': 'song6.mp3',
                    'image': 'song6.jpg'
                }]


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




        function changeCurrentSongDetails(songObj) {
                    $('.current-song-image').attr('src','img/' + songObj.image)
                    $('.current-song-name').text(songObj.name)
                    $('.current-song-album').text(songObj.album)
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



        function addSongNameClickEvent(songObj,position) {
            var songName = songObj.fileName;
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
                        changeCurrentSongDetails(songObj);
                    }
                });
                }           
     

        window.onload = function() {

                   $('#songs').DataTable({
                     paging: false
                     });

                   changeCurrentSongDetails(songs[0]);
                    updateCurrentTime(); 
                    setInterval(function() {
                    updateCurrentTime();
                    },1000);
 

                 for(var i =0; i <= songs.length;i++) {
                        var obj = songs[i];
                        var name = '#song' + (i+1);
                        var song = $(name);
                        song.find('.song-name').text(obj.name);
                        song.find('.song-artist').text(obj.artist);
                        song.find('.song-album').text(obj.album);
                        song.find('.song-length').text(obj.duration);
                        addSongNameClickEvent(obj,i+1);
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
        