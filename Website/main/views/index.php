<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>MissouriRail</title>
        <meta name="description" content="Get your train ticket with MissouriRail, one of the world best rail operators here in Columbia, Missouri. As we always says always on schedule-ish.">
        <meta name="keywords" content="MissouriRail,Missouri,Rail,CS3380,University of Missouri,Computer Science 3380">
        <meta name="author" content="Thunpisit Amnuaikiatloet">
        <style>
            @font-face {
                font-family: SF-Heavy;
                src: url(assets/fonts/SF-UI-Text-Heavy.otf) format("opentype");
            }
            @font-face {
                font-family: SF-Bold;
                src: url(assets/fonts/SF-UI-Text-Bold.otf) format("opentype");
            }
            @font-face {
                font-family: SF-Medium;
                src: url(assets/fonts/SF-UI-Text-Medium.otf) format("opentype");
            }
            @font-face {
                font-family: SF-Regular;
                src: url(assets/fonts/SF-UI-Text-Regular.otf) format("opentype");
            }
            @font-face {
                font-family: SF-Light;
                src: url(assets/fonts/SF-UI-Text-Light.otf) format("opentype");
            }
            @font-face {
                font-family: SF-Ultrathin;
                src: url(assets/fonts/SF-UI-Text-Ultrathin.otf) format("opentype");
            }
            * {
                margin: 0px;
                font-family: SF-Regular;
            }
            p {
                font-size: 12px;
                color: gray;
            }
            f {
                font-size: 12px;
                color: black;
            }
            .wrapper {
                text-align: center;
            }
            .wrapper-header {
                padding-top: 20px;
                padding-left: 20px;
                padding-bottom: 20px;
                padding-right: 20px;
                height: 50px;
                
                overflow: hidden;
            }
            .wrapper-hero {
                background-color: aliceblue;
                height: 500px;
                background-image: url(assets/images/logo.svg)
            }
            .wrapper-footer {
                padding-top: 10px;
                padding-bottom: 20px;
            }
            .logo {
                height: 50px;
            }
            .wrapper-logo {
                float: left;
                padding-bottom: 20px;
            }
            .wrapper-menu {
                padding-top: 10px;
                float: right;
            }
            .wrapper-menu-button {
                padding-top: 10px;
                float: right;
            }
            .link-menu {
                font-size: 14px;
                padding-left: 5px;
                padding-right: 5px;
                color: black;
                text-decoration: none;
            }
            .link-menu:link {
                color: black;
                text-decoration: none;
            }
            .link-menu:active {
                color: black;
                text-decoration: none;
            }
            .link-menu:hover {
                color: black;
                text-decoration: underline;
            }
            .button-blank {
                font-size: 14px;
                text-align: center;
                
                border: 2px solid #3B5998;
                border-radius: 10px 10px 10px 10px;
                background-color: white;
                color: #3B5998;
                
                width: 120px;
                padding: 9px 0px 9px 0px;
                display: inline-block;
                
                -webkit-transition-duration: 0.3s;
                transition-duration: 0.3s;
                -webkit-transition-property: color, background-color;
                =transition-property: color, background-color;
            }
            .button-blank:hover {
                color: white;
                background-color: #3B5998;
                border: 2px solid #3B5998;
            }
            .button-solid {
                font-size: 14px;
                text-align: center;
                
                border: 2px solid #3B5998;
                border-radius: 10px 10px 10px 10px;
                background-color: #3B5998;
                color: white;
                
                width: 120px;
                padding: 9px 0px 9px 0px;
                display: inline-block;
                
                -webkit-transition-duration: 0.3s;
                transition-duration: 0.3s;
                -webkit-transition-property: color, background-color;
                =transition-property: color, background-color;
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <header class="wrapper-header">
                <div class="wrapper-logo">
                    <img class="logo" alt="logo" src="assets/images/logo.svg">
                </div>
                <div class="wrapper-menu">
                    <a class="link-menu" href="#">About</a>
                    <a class="link-menu" href="#">Our Fleets</a>
                    <a class="link-menu" href="#">Schedules</a>
                    <a class="link-menu" href="#">Contacts</a>
                    <button class="button-blank">Signup</button>
                    <button class="button-solid">Login</button>
                </div>
            </header>
            <section class="wrapper-hero">
                
            </section>
        </div>    
    </body>
</html>