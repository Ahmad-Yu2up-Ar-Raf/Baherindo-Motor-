<?php

namespace App\Enums;

enum Status: string
{
    case Tersedia = 'tersedia';
    case Terjual = 'terjual';
    case TidakTersedia = 'tidaktersedia';
}
