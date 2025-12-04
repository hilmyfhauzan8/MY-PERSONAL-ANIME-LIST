
Playspeed:=2 

; Zoom: 125%

NumpadAdd::
Loop, 1
{

SetTitleMatchMode, 2
CoordMode, Mouse, Window

Send, {Blind}{Ctrl Down}c{Ctrl Up}

  Sleep, % 200 //playspeed

MouseClick, L, 281, 1011

  Sleep, % 500 //playspeed

Send, {Blind}{Ctrl Down}{NumpadHome}{Ctrl Up}

  Sleep, % 200 //playspeed

Send, {Blind}{Down}{Down}{Down}{Down}

    Sleep, % 200 //playspeed

Send, {Blind}{Right}{Right}{Right}{Right}

    Sleep, % 200 //playspeed

Send, {Blind}{Enter}

  Sleep, % 500 //playspeed

Send, {Blind}{Ctrl Down}v{Ctrl Up}

    Sleep, % 500 //playspeed

Send, {Blind}{Enter}

  Sleep, % 300 //playspeed

MouseClick, L, 800, 520

  Sleep, 100  //PlaySpeed 

}