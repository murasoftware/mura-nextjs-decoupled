function Youtube(props) {
  const { instanceid, videoid } = props;
  return (
    <div class="youtubeWrapper" id={`player-${instanceid}`}>
      <iframe
        width="1920"
        height="1080"
        src={`//www.youtube.com/embed/${videoid}?rel=0&autoplay=1&vq=hd1080&controls=0`}
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default Youtube


// '<div class="youtubeWrapper" id="player-AC55B11D-0B4C-4A17-B196BEAB4FEBDCC4">\n' +
//       '                    <iframe width="1920" height="1080" src="//www.youtube.com/embed/Q7KLdET1lBM?rel=0&autoplay=1&vq=hd1080&controls=0" frameborder="0" allowfullscreen></iframe>\n' +
//       '                </div>\n' +
//       '                <script>\n' +
//       '                    Mura(function(m) {\n' +
//       '                        m.loader()\n' +
//       '                            .loadjs(\n' +
//       "                                Mura.rootpath + '/core/modules/v1/videos/js/video_module.js',\n" +
//       '                                function() {\n' +
//       "                                    $('#videoModal_AC55B11D\\x2D0B4C\\x2D4A17\\x2DB196BEAB4FEBDCC4').on('show.bs.modal', function () {\n" +
//       "                                        if ($('#player-AC55B11D\\x2D0B4C\\x2D4A17\\x2DB196BEAB4FEBDCC4').is(':empty')){\n" +
//       `                                            $('#player-AC55B11D\\x2D0B4C\\x2D4A17\\x2DB196BEAB4FEBDCC4').html('<iframe width="1920" height="1080" src="//www.youtube.com/embed/Q7KLdET1lBM?rel=0&autoplay=1&vq=hd1080&controls=0" frameborder="0" allowfullscreen></iframe>');\n` +
//       '                                        }\n' +
//       '                                    });\n' +
//       "                                    $('#videoModal_AC55B11D\\x2D0B4C\\x2D4A17\\x2DB196BEAB4FEBDCC4').on('hidden.bs.modal', function () {\n" +
//       "                                        $('#player-AC55B11D\\x2D0B4C\\x2D4A17\\x2DB196BEAB4FEBDCC4').html('');\n" +
//       '                                    });\n' +
//       '                                }\n' +
//       '                            );\n' +
//       '                    });\n' +
//       '                </script>\n' +
//       '            \n' +
//       '        \n' +
//       '    <script>\n' +
//       '        Mura(function(m) {\n' +
//       '        m.loader()\n' +
//       "            .loadcss(Mura.rootpath + '/core/modules/v1/video/css/video_module.css')\n" +
//       "            .loadjs('https://kit.fontawesome.com/55f08b2674.js')//fontawesome 5.x, can be removed if site already uses FontAwesome\n" +
//       '        });\n' +
//       '    </script>'
