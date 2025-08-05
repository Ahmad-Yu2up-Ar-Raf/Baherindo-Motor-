<?php

namespace App\Enums;

enum MobilMerek: string
{
    // 4 Merek Mobil Paling Dominan di Indonesia + Other
    case Toyota = 'toyota';      // Market leader
    case Daihatsu = 'daihatsu';  // Populer untuk LCGC
    case Honda = 'honda';        // Premium Japanese brand
    case Suzuki = 'suzuki';      // Value for money
    
    case Other = 'other';
}