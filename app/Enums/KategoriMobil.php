<?php

namespace App\Enums;

enum KategoriMobil: string
{
    // 4 Kategori Mobil Paling Dominan di Indonesia
    case MPV = 'mpv';                    // Paling dominan: Avanza, Xenia, Mobilio, Ertiga
    case SUV = 'suv';                    // Sangat populer: Fortuner, Terios, Rush, HR-V, CR-V
    case Hatchback = 'hatchback';        // LCGC segment: Agya, Ayla, Brio, Swift
    case Sedan = 'sedan';                // Masih populer: Vios, City, Baleno
    
    case Other = 'other';                // Pickup, Crossover, Coupe, dll
}