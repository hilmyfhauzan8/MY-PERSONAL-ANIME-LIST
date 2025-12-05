; Zoom chrome = 125%

Playspeed:=2 

NumpadAdd::
Loop, 1
{

SetTitleMatchMode, 2
CoordMode, Mouse, Window

  Sleep, % 200 //playspeed

Send, {Blind}{Ctrl Down}c{Ctrl Up}

  Sleep, % 200 //playspeed

MouseClick, L, 360, 1016

  Sleep, % 800 //playspeed

Send, {Blind}{Ctrl Down}{NumpadHome}{Ctrl Up}

  Sleep, % 500 //playspeed

Send, {Blind}{Down}{Down}{Down}{Down}

  Sleep, % 250 //playspeed

Send, {Blind}{Right}{Right}{Right}{Right}

  Sleep, % 250 //playspeed

Send, {Blind}{Enter}{Ctrl Down}v{Ctrl Up}

  Sleep, % 200 //playspeed

Send, {Blind}{Enter}

MouseClick, L, 800, 510

  Sleep, 100  //PlaySpeed 

}


NumpadSub::
Loop, 1
{

SetTitleMatchMode, 2
CoordMode, Mouse, Window

  Sleep, % 200 //playspeed

Send, {Blind}{Shift Down}{Right}{Right}{Right}{Right} ; Anime Title Japanese - Image

  Sleep, % 200 //playspeed

Send, {Blind}{Right}{Right}{Right}{Right} ; Type - Premiered

  Sleep, % 200 //playspeed

Send, {Blind}{Right}{Right}{Right}{Right}{Right} ; Release Date Begin - Duration

  Sleep, % 200 //playspeed

Send, {Blind}{Right}{Right}{Right}{Right}{Right} ; Genres - Score

  Sleep, % 200 //playspeed

Send, {Blind}{Right}{Right}{Right}{Right} ; Watch Status - Legal/Illegal

  Sleep, % 200 //playspeed

Send, {Blind}{Right}{Right}{Right}{Right}{Shift Up} ; Platform - Ending Song

  Sleep, % 200 //playspeed

Send, {Blind}{Del}

  Sleep, % 100 //playspeed

}