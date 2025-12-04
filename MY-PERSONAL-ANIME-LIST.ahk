
Playspeed:=2 

NumpadAdd::
Loop, 1
{

SetTitleMatchMode, 2
CoordMode, Mouse, Window

Send, {Blind}{Ctrl Down}c{Ctrl Up}

  Sleep, % 200 //playspeed

MouseClick, L, 222, 1029

  Sleep, % 500 //playspeed

Send, {Blind}{Ctrl Down}{NumpadHome}{Ctrl Up}

  Sleep, % 200 //playspeed

Send, {Blind}{Down}{Down}{Down}{Down}{Right}{Right}{Right}{Right}

  Sleep, % 200 //playspeed

Send, {Blind}{Enter}{Ctrl Down}v{Ctrl Up}{Enter}

  Sleep, % 300 //playspeed

MouseClick, L, 644, 432

  Sleep, 100  //PlaySpeed 

}