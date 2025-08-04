<?php

namespace App\Enums;

enum Kategori: string
{
    case Bebek = 'bebek';
    case Matic = 'matic';
    case Sport = 'sport';
    case Trail = 'trail';
  
   
    case Other = 'other';

    public function getLabel(): string
    {
        return match($this) {
            self::Bebek => 'Bebek',
            self::Matic => 'Matic/Scooter',
            self::Sport => 'Sport',
            self::Trail => 'Trail',
       
           
            self::Other => 'Lainnya',
        };
    }

    public static function getOptions(): array
    {
        return array_map(
            fn(self $kategori) => [
                'value' => $kategori->value,
                'label' => $kategori->getLabel()
            ],
            self::cases()
        );
    }
}